
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Subscription } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { RegComponent } from './reg/reg.component';

@Injectable ({ providedIn: 'root' })

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})


export class AuthComponent implements OnInit {

  public authForm!: FormGroup;
  public error: boolean = false;
  public loginSub!: Subscription;
  public logIs: boolean = true;
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
      this.close()
    }).catch(e => {
      console.log(this.error)
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
      this.error = false
    }, (e) => {
      this.error = true
      console.log(e)
    })
  }

  Reg(){
    this.dialog.open(RegComponent, {
      panelClass: 'reg-dialog'
    })

  }

}
