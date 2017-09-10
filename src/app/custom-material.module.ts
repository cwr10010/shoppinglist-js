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
  MdListModule,
  MdExpansionModule
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
  MdListModule,
  MdExpansionModule
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
  MdListModule,
  MdExpansionModule
  ],
})
export class CustomMaterialModule { }
