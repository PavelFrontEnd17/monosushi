import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdate } from 'src/app/shared/interfaces/auth/auth.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit{
  public passForm!: FormGroup;
  public curUser!: IUpdate;
  public errorMessage!: string;
  public error: boolean = false
  public body = document.querySelector('html')
  constructor(
    private fb: FormBuilder,
    private data: AuthService
  ){}

  ngOnInit(): void {
    this.initForm()
    this.currentUser()  
  }

  currentUser(){
    this.curUser = JSON.parse(localStorage.getItem('currentUser') as string)
  }

  initForm(){
    this.passForm = this.fb.group({
      oldPass: [null, [Validators.required]],
      newPass: [null, [Validators.required]],
      newPassRepeat: [null, [Validators.required]]
    })
  }

  changePass(){
    this.currentUser()  
    this.body!.classList.add('overflow')

    if( this.passForm.value.oldPass && this.passForm.value.oldPass == this.curUser.pass){
      if( this.passForm.value.newPass && this.passForm.value.newPass == this.passForm.value.newPassRepeat){
        this.curUser.pass = this.passForm.value.newPassRepeat
        this.data.change(this.curUser, this.curUser.id).subscribe(data => {console.log(data)})
        this.passForm.reset()
        localStorage.setItem('currentUser', JSON.stringify( this.curUser))
      }else{
        this.errorMessage = 'Нові паролі не співпадають'
        this.error = true
      }
    }else{
      console.log(JSON.parse(localStorage.getItem('currentUser') as string).pass)

      this.errorMessage = 'Невірний старий пароль'
      this.error = true
    }
  }

  close(){
    this.errorMessage = ''
    this.error = false
    this.body!.classList.remove('overflow')

  }
}
