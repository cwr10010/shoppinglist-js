import { NgModule } from '@angular/core';
import {
  MdGridListModule,
  MdButtonModule,
  MdFormFieldModule,
  MdInputModule,
  MdCardModule,
  MdMenuModule,
  MdIconModule,
  MdChipsModule,
  MdAutocompleteModule,
  MdOptionModule,
  MdListModule
} from '@angular/material';

@NgModule({
  imports: [
  MdGridListModule,
  MdButtonModule,
  MdFormFieldModule,
  MdInputModule,
  MdCardModule,
  MdMenuModule,
  MdIconModule,
  MdChipsModule,
  MdAutocompleteModule,
  MdOptionModule,
  MdListModule
  ],
  exports: [
  MdGridListModule,
  MdButtonModule,
  MdFormFieldModule,
  MdInputModule,
  MdCardModule,
  MdMenuModule,
  MdIconModule,
  MdChipsModule,
  MdAutocompleteModule,
  MdOptionModule,
  MdListModule
  ],
})
export class CustomMaterialModule { }
