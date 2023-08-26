import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { setDoc } from '@firebase/firestore';
import { async, Subscription } from 'rxjs';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ROLE } from 'src/app/shared/constansts/auth.constnts';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable, SimpleChanges } from '@angular/core';
import { RegComponent } from './reg/reg.component';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Injectable ({ providedIn: 'root' })

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})


export class AuthComponent implements OnInit, OnDestroy {

  public authForm!: FormGroup;
  public regForm!: FormGroup;
  public error: boolean = false;
  public loginSub!: Subscription;
  public logIs: boolean = true;
  public regIs: boolean = false;
  public passRepeat!:string;
  constructor(
    private header: HeaderComponent,
    private fb: FormBuilder,
    private accountService: AuthService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.initForm()

  }


  ngOnDestroy(): void {

  }

  initForm() {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]]
    })
  }
  close() {
    this.header.dialog.closeAll()
  }
  login() {
    const { email, pass } = this.authForm.value
    this.log(email, pass).then(() => {
      this.error = false
      this.close()
    }).catch(e => {
      this.error = true
      this.router.navigate([''])
      console.log(e)
    })
  }
  async log(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password)
    console.log(credential.user.uid);
    this.loginSub = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currUser = { ...user, uid: credential.user.uid }
      localStorage.setItem('currentUser', JSON.stringify(currUser))
      this.accountService.isUserLogin$.next(true)
      this.close()
      this.loginSub.unsubscribe()
    }, (e) => {
      console.log(e)
    })
  }

//register

  Reg(){

    this.dialog.open(RegComponent, {
      panelClass: 'reg-dialog'
    })

  }

}
