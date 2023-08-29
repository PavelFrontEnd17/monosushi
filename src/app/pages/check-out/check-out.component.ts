import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUpdate } from 'src/app/shared/interfaces/auth/auth.interfaces';
import { ICutlery, IProductResponse } from 'src/app/shared/interfaces/product/products.interfaces';

import { arrayUnion, doc, Firestore, updateDoc } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],

})
export class CheckOutComponent {


  public busketCount!: number;
  public sum!: number;
  public busketItems!: IProductResponse[];
  public cutlery: Array<ICutlery> =[]
  public checkOutForm!: FormGroup;
  public total!: number;
  public maskPhone = document.querySelector('#phone')
  public zazdalegit = false;
  public delivery!: string;
  public startComment: boolean = false;
  public user: IUpdate = JSON.parse(localStorage.getItem('currentUser') as string)
  public time = ['12:00-12:15',
  '12:15-12:30',
  '12:30-12:45',
  '12:45-13:00',
  '13:00-13:15',
  '13:15-13:30',
  '13:30-13:45',
  '13:45-14:00',
  '14:00-14:15',
  '14:15-14:30',
  '14:30-14:45',
  '14:45-15:00',
  '15:00-15:15',
  '15:15-15:30',
  '15:30-15:45',
  '15:45-16:00',
  '15:00-16:15',
  '16:15-16:30',
  '16:30-16:45',
  '16:45-17:00',
  '17:00-17:15',
  '17:15-17:30',
  '17:30-17:45',
  '17:45-18:00',
  '18:00-18:15',
  '18:15-18:30',
  '18:30-18:45',
  '18:45-19:00',
  '19:00-19:15',
  '19:15-19:30',
  '19:30-19:45',
  '19:45-20:00',
  '20:00-20:15',
  '20:15-20:30',
  '20:30-20:45',
  '20:45-21:00',
  '21:00-21:15',
  '21:15-21:30',
  '21:30-21:45',
  '21:45-22:00',
  '22:00-22:15',
  '22:15-22:30',
  '22:30-22:45'
 ]


  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private router: Router
  ){}
  ngOnInit(): void {
    this.getInfo()
    this.cutleryFunc()
    this.initForm()
    this.addValidators()
  }
  getInfo() {


    this.busketItems = JSON.parse(localStorage.getItem('basket') as string)
    this.busketCount = JSON.parse(localStorage.getItem('basket') as string)?.length
    this.sum = 0
    for (let i = 0; i < this.busketItems?.length; i++) {
      this.sum += this.busketItems[i]?.cost * this.busketItems[i]?.count
    }
    this.total = this.sum
  }





  initForm(){
    this.checkOutForm = this.fb.group({
      products: [this.busketItems],
      cutlery: [null, [Validators.required]],
      study: [null, [Validators.required]],
      payment: ["cash", [Validators.required]],
      dostavka: ["dostavka", [Validators.required]],
      inAdvance: [null],
      name: [this.user?.fName, [Validators.required, Validators.pattern(/^[А-Яа-яёЁЇїІіЄєҐґ]*$/), Validators.minLength(2)]],
      phone: [null, [Validators.required, Validators.minLength(17)]],
      street: [null],
      buildNum: [null],
      entrance: [null],
      apartNum:[null],
      samoviviz: [null],
      date: [null],
      timeSpan: [null],
      call: [null],
      comment:[null],
      commentCook:[null],
      totalSum: [this.total]
    })
  }

  addValidators(){
    this.checkOutForm.get('street')?.setValidators([Validators.required,
      Validators.pattern(/^[А-Я][а-яёЁЇїІіЄєҐґ]*$/),
      Validators.minLength(4)])
    this.checkOutForm.get('buildNum')?.setValidators([Validators.required,
      Validators.pattern(/^[0-9А-Яа-яёЁЇїІіЄєҐґ]*$/)])
    this.checkOutForm.get('entrance')?.setValidators([Validators.pattern(/^[0-9А-Яа-яёЁЇїІіЄєҐґ]*$/)])
    this.checkOutForm.get('apartNum')?.setValidators([Validators.required,Validators.pattern(/^[0-9А-Яа-яёЁЇїІіЄєҐґ]*$/)])
  }

  deliveryMethod(event: any){
    this.dostavka = this.checkOutForm.value.dostavka
    console.log(this.checkOutForm.value.dostavka)
    if(this.dostavka=='dostavka'){
      this.checkOutForm.get('street')?.setValidators([Validators.required,
        Validators.pattern(/^[А-Я][а-яёЁЇїІіЄєҐґ]*$/),
        Validators.minLength(4)])
      this.checkOutForm.get('buildNum')?.setValidators([Validators.required,
        Validators.pattern(/^[0-9А-Яа-яёЁЇїІіЄєҐґ]*$/)])
      this.checkOutForm.get('entrance')?.setValidators([Validators.pattern(/^[0-9А-Яа-яёЁЇїІіЄєҐґ]*$/)])
      this.checkOutForm.get('apartNum')?.setValidators([Validators.required,Validators.pattern(/^[0-9А-Яа-яёЁЇїІіЄєҐґ]*$/)])
      this.checkOutForm.get('samoviviz')?.clearValidators()
      this.checkOutForm.get('street')?.updateValueAndValidity()
      this.checkOutForm.get('buildNum')?.updateValueAndValidity()
      this.checkOutForm.get('entrance')?.updateValueAndValidity()
      this.checkOutForm.get('apartNum')?.updateValueAndValidity()
      this.checkOutForm.get('samoviviz')?.updateValueAndValidity()

    }else if(this.dostavka=='samovivoz'){
      this.checkOutForm.get('street')?.clearValidators()
      this.checkOutForm.get('buildNum')?.clearValidators()
      this.checkOutForm.get('entrance')?.clearValidators()
      this.checkOutForm.get('apartNum')?.clearValidators()
      this.checkOutForm.get('street')?.updateValueAndValidity()
      this.checkOutForm.get('buildNum')?.updateValueAndValidity()
      this.checkOutForm.get('entrance')?.updateValueAndValidity()
      this.checkOutForm.get('apartNum')?.updateValueAndValidity()
      this.checkOutForm.get('samoviviz')?.setValidators([Validators.required])
      this.checkOutForm.get('samoviviz')?.updateValueAndValidity()


    }
  }

  changeDelTime(){
    this.zazdalegit = !this.zazdalegit;
    if(this.zazdalegit){
      this.checkOutForm.get('date')?.setValidators([Validators.required])
      this.checkOutForm.get('timeSpan')?.setValidators([Validators.required])
      this.checkOutForm.get('date')?.updateValueAndValidity()
      this.checkOutForm.get('timeSpan')?.updateValueAndValidity()
    }else if(!this.zazdalegit){
      this.checkOutForm.get('date')?.clearValidators()
      this.checkOutForm.get('timeSpan')?.clearValidators()
      this.checkOutForm.get('date')?.updateValueAndValidity()
      this.checkOutForm.get('timeSpan')?.updateValueAndValidity()
    }
  }

  cutleryFunc(){
    this.cutlery = []
    for(let i =1; i<21; i++){
      if(i<=5){
        let cutl: ICutlery = {
          count: i,
          cost: 0
        }
      this.cutlery.push(cutl)
      }else if(i > 5){
        let cutl: ICutlery = {
          count: i,
          cost: (i - 5) * 15
        }
      this.cutlery.push(cutl)
      }
    }
    console.log(this.cutlery)
  }

  addCutleryCost(){
    if(this.checkOutForm.value.cutlery > 5){
      this.total = this.sum + ((this.checkOutForm.value.cutlery - 5) * 15)
    }else{
      this.total = this.sum
    }
  }

  delProduct(product: IProductResponse) {
    const index = this.busketItems.findIndex(prod => prod.id === product.id);
    this.busketItems.splice(index, 1)
    localStorage.setItem('basket', JSON.stringify(this.busketItems));
    console.log(localStorage.getItem('basket'))
    this.getInfo()
    this.getSum()

  }

  getSum(){
    this.sum = 0
    for (let i = 0; i < this.busketItems.length; i++) {
      this.sum += this.busketItems[i]?.cost * this.busketItems[i]?.count
    }
    this.total = this.sum
  }

  Count(product: IProductResponse, value: boolean) {

    if (!value && product.count > 1) {
      product.count--
      this.getSum()
    }
    if (value && product.count < 999) {
      product.count++
      this.getSum()
    }

  }


  // checkDate(event: any){
  //   console.log(new Date())
  //   let date = this.checkOutForm.value.date
  //   let dote = '.'
  //   let splitedDate = date.split(dote)
  //   if(parseInt(splitedDate[1]) == 2 && parseInt(splitedDate[0]) >= 29){
  //     console.log('wrong day 1')
  //
  //   }else if(parseInt(splitedDate[0])>31){
  //     console.log('wrong day 2')
  //   }else if(parseInt(splitedDate[1])>12){
  //     console.log('wrong month')
  //   }
  //
  // }

    public dostavka: string = "dostavka"


  public startComCook = false
  commenting(){this.startComment = !this.startComment}
  cookCommenting(){this.startComCook = !this.startComCook}

  public curUser = JSON.parse(localStorage.getItem('currentUser') as string)
  public loginSub!: Subscription;

  getOrder(){
    this.curUser = JSON.parse(localStorage.getItem('currentUser') as string)
    const  userUid = this.curUser.uid
    const fireUser = doc(this.afs, 'users', userUid)
    const date = new Date()
    this.checkOutForm.patchValue({
      date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    })
    updateDoc(fireUser, {
      'orders': arrayUnion(this.checkOutForm.value)
    })
    this.curUser.orders.push(this.checkOutForm.value)
    localStorage.setItem('currentUser', JSON.stringify(this.curUser))
    console.log(JSON.parse(localStorage.getItem('currentUser') as string))
    const newBusket: Array<any>  = []
    this.busketItems = []
    this.busketCount = 0

    localStorage.setItem('basket', JSON.stringify(newBusket))

    this.router.navigate([''])

  }
}

