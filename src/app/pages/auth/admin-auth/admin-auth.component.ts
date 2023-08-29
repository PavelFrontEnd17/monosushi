import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { signInWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { setDoc } from '@firebase/firestore';
import { async, Subscription } from 'rxjs';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ROLE } from 'src/app/shared/constansts/auth.constnts';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable, SimpleChanges } from '@angular/core';
import { RegComponent } from '../reg/reg.component';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent {
  public authForm!: FormGroup;
  public error: boolean = false;
  public loginSub!: Subscription;
  public logIs: boolean = true;
  constructor(
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


  initForm() {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]]
    })
  }
  login() {
    const { email, pass } = this.authForm.value
    this.log(email, pass).then(() => {
      this.error = false
      console.log('Login done')
    }).catch(e => {
      this.error = true
      console.log(e)
    })
  }
  async log(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password)
    console.log(credential.user.uid);
    this.loginSub = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currUser = { ...user, uid: credential.user.uid }
      localStorage.setItem('currentUser', JSON.stringify(currUser))
      console.log(user['role'])
      this.accountService.isUserLogin$.next(true)
      this.close()
      this.loginSub.unsubscribe()
      console.log(user)
    }, (e) => {
      this.error = true
      console.log(e)
    })
  }
close() {
  this.router.navigate([''])
}
}
