import {NgModule} from '@angular/core';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from "@angular/forms";

const material = [
    MatDialogModule
]

@NgModule({
    declarations:[],
    imports:[
        ...material
    ],
    exports: [
        ...material
    ]
})

export class SharedModule { }
