
import {Component, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc,  Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { setDoc } from '@firebase/firestore';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})

@Injectable({ providedIn: "any" })

export class RegComponent {

  public regForm!: FormGroup;
  public error: boolean = false;
  public passRepeat!:string;
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.initForm()

  }

  initForm() {
    this.regForm = this.fb.group({
      fName: [null, [Validators.required, Validators.pattern(/^[А-Яа-яёЁЇїІіЄєҐґ]*$/)]],
      sName: [null, [Validators.required, Validators.pattern(/^[А-Яа-яёЁЇїІіЄєҐґ]*$/)]],
      phone: [null, [Validators.required, Validators.minLength(16)]],
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]*$/)]]
    })
  }

  Log(){
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }

  createAccount(){
    const {email, pass, fName, sName, phone} = this.regForm.value

    this.emailSignUp(email, pass)
  }

  async emailSignUp(mail: string, password: string): Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth, mail, password)
    const {email, pass, fName, sName, phone} = this.regForm.value
    const user = {
      email: email,
      pass: pass,
      fName: fName,
      sName: sName,
      phone: phone,
      role: 'USER',
      orders: []
    }
    setDoc(doc(this.afs, 'users', credential.user.uid), user)
  }

  public passNotPased = false

  passwords(){
    const {email, pass, fName, sName, phone} = this.regForm.value
    if(pass != this.passRepeat){
      this.passNotPased = true
    }else{
      this.passNotPased = false
    }
  }

}
