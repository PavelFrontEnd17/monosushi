  
import { Component, Injectable, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })


@Component({
  selector: 'app-phoning',
  templateUrl: './phoning.component.html',
  styleUrls: ['./phoning.component.scss']
})
export class PhoningComponent{
  public phoning!: FormGroup
  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.phoning = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(/^[А-Яа-яёЁЇїІіЄєҐґ]*$/), Validators.minLength(2)]],
      phone: [null, [Validators.required, Validators.minLength(16)]]
    })
  }

  phoneMe(){
    console.log(this.phoning.value)
  }

}
