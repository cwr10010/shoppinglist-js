import { NgModule } from '@angular/core';
import { MdButtonModule, MdFormField } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdFormField],
  exports: [MdButtonModule, MdFormField],
})
export class CustomMaterialModule { }
