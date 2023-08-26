import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/caategories/categories.service';
import { ICategoryRequire, ICategoryResponse } from 'src/app/shared/interfaces/category/categories.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit{
  public categoryList!: ICategoryResponse[];

  public categoryForm!: FormGroup;

  public editStatus = false;

  public editId!: number;

  public IsUploded = false;

  public updatePercent!: number;

  constructor(
    private fb: FormBuilder,
    private data: CategoriesService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initCategoryForm()
    this.getCategories()
  }
  
  initCategoryForm(): void{
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imgPath: [null, Validators.required]
    })
  }

  getCategories() {
    this.data.getCategories().subscribe(data => { this.categoryList = data })
  }

  addCategory(): void {
    if(this.editStatus){
      this.data.update(this.categoryForm.value, this.editId ).subscribe(() => {
        this.getCategories()
        this.categoryForm.reset()
        this.editStatus = false
        this.IsUploded = false
      })
    }else {
      this.data.create(this.categoryForm.value).subscribe(() => {
        this.getCategories()
        this.categoryForm.reset()
        this.editStatus = false
        this.IsUploded = false

      })
    }
  }
  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imgPath: category.imgPath
    })
    this.editStatus = true
    this.editId = category.id
  }

  deleteCategory(category: ICategoryResponse): void {
    if (confirm('Are you shure?')) {
      this.data.delete(category.id).subscribe(data => {
        console.log(data)
        this.getCategories()
      })
    }
  }

  upload(event: any): void{
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
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

  deleteImage(): void{
    const task = ref(this.storage, this.valueByControl('imagePath'))
    deleteObject(task).then(()=>{
      console.log('File deleted')
      this.IsUploded = false
      this.updatePercent = 0
      this.categoryForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string{
    return this.categoryForm.get(control)?.value
  }
}
