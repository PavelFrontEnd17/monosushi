import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/caategories/categories.service';
import { IProductResponse, IProductRequest } from 'src/app/shared/interfaces/product/products.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/categories.interfaces';
import { ProductsService } from 'src/app/shared/services/products/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public productList!: IProductResponse[];
  public categoryesList!: ICategoryResponse[];

  public productForm!: FormGroup;

  public editStatus = false;

  public editId!: number;

  public IsUploded = false;

  public updatePercent!: number;

  constructor(
    private fb: FormBuilder,
    private categoryesData: CategoriesService,
    public data : ProductsService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initProductForm()
    this.getCategories()
    this.getProducts()
  }
  
  initProductForm(): void{
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      weight: [null, Validators.required],
      cost: [null, Validators.required],
      category: [null, Validators.required],
      imgPath: [null, Validators.required],
      count: [1]
    })
  }

  getCategories() {
    this.categoryesData.getCategories().subscribe(data => { this.categoryesList = data })
  }

  selectCategory(category: ICategoryResponse){
    console.log(category)
    this.productForm.patchValue({
      category: category
    })
  }

  getProducts() {
    this.data.get().subscribe(data => { this.productList = data })

  }

  addProduct(): void {
    if(this.editStatus){
      this.data.update(this.productForm.value, this.editId ).subscribe(() => {
        this.getProducts()
        this.productForm.reset()
        this.productForm.patchValue({
          count: 1
        })
        this.editStatus = false
        this.IsUploded = false
      })
    }else {
      this.data.create(this.productForm.value).subscribe(() => {
        this.getProducts()
        this.productForm.reset()
        this.productForm.patchValue({
          count: 1
        })
        this.editStatus = false
        this.IsUploded = false

      })
    }
  }
  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      weight: product.weight,
      cost: product.cost,
      category: product.category,
      imgPath: product.imgPath,
      count: 1
    })
    this.editStatus = true
    this.editId = product.id
  }

  deleteProduct(product: IProductResponse): void {
    if (confirm('Are you shure?')) {
      this.data.delete(product.id).subscribe(data => {
        console.log(data)
        this.getProducts()
      })
    }
  }

  upload(event: any): void{
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
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
      this.productForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string{
    return this.productForm.get(control)?.value
}
}