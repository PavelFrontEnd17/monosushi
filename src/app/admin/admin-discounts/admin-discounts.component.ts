import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountRequest, IDiscountResponse} from '../../shared/interfaces/discounts/discounts.intefaces'
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';


@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})



export class AdminDiscountsComponent implements OnInit{
  public discounts!: IDiscountResponse[];
  public editStatus = false
  public discountForm!: FormGroup;
  public IsUploded = false
  public updatePercent!: number;
  public editId!: number;
  constructor(
    private fb: FormBuilder,
    private data: DiscountsService,
    private storage: Storage
  ) { }

    ngOnInit(): void {
      this.getDiscounts()
      this.initDiscountForm()
    }

  getDiscounts(){
    this.data.get().subscribe(data =>{ this.discounts = data})
  }

  initDiscountForm(): void{
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imgPath: [null, Validators.required]
    })
  }

  addDiscount(){
    if(this.editStatus){
      this.data.update(this.discountForm.value, this.editId ).subscribe(() => {
        this.getDiscounts()
        this.discountForm.reset()
        this.editStatus = false
    })
    }else{
      this.data.create(this.discountForm.value).subscribe(() => {
        this.getDiscounts()
        this.discountForm.reset()
        this.editStatus = false
      })
    }
  }
  upload(event: any): void{
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imgPath: data
        })
      })
      .catch( err =>{
        console.log(err)
      })
      this.IsUploded = true
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string>{
    const path = `${folder}/${name}`
    let url = '';
    if(file){
      try{
        const storageRef = ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file)
        percentage(task).subscribe(data => {
          this.updatePercent = data.progress

        })
        await task;
        url = await getDownloadURL(storageRef);
        return Promise.resolve(url)

      } catch(e: any){
        console.error(e)
      }
    }
    else{
      console.log('wrong format')
    }
  return Promise.resolve(url)

  }
  valueByControl(control: string): string{
    return this.discountForm.get(control)?.value
  }

  deleteImage(): void{
    const task = ref(this.storage, this.valueByControl('imagePath'))
    deleteObject(task).then(()=>{
      console.log('File deleted')
      this.IsUploded = false
      this.updatePercent = 0
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }
  editDiscount(disc:IDiscountResponse ){
    this.discountForm.patchValue({
      name: disc.name,
      description: disc.description,
      imgPath: disc.imgPath
    })
    this.editStatus = true
    this.editId = disc.id
  }
  deleteDiscount(disc: IDiscountResponse){
    if (confirm('Are you shure?')) {
      this.data.delete(disc.id).subscribe(data => {
        console.log(data)
        this.getDiscounts()
      })
    }
  }
}
