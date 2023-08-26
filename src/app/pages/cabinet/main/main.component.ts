import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdate } from 'src/app/shared/interfaces/auth/auth.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  public currentUser!: IUpdate;
  public form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private data: AuthService
  ){}

  ngOnInit(): void {
    this.getPerson()
    
    this.initForm()
  }

  initForm(){
    this.form = this.fb.group({
      name: [this.currentUser.fName , [Validators.required]],
      sName: [this.currentUser.sName , [Validators.required]],
      email: [this.currentUser.email, [Validators.required, Validators.email]]
    })
  }

  getPerson(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    console.log(this.currentUser)
  }

  editData(){
    this.currentUser.fName = this.form.value.name
    this.currentUser.sName = this.form.value.sName
    this.currentUser.email = this.form.value.email
    this.data.change(this.currentUser, this.currentUser.id).subscribe(data => {console.log(data)})
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))    
  }
}
