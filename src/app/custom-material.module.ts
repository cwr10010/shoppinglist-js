import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdFormFieldModule,
  MdInputModule,
  MdCardModule,
  MdMenuModule,
  MdIconModule,
  MdAutocompleteModule,
  MdOptionModule,
  MdListModule,
  MdExpansionModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
  MdButtonModule,
  MdFormFieldModule,
  MdInputModule,
  MdCardModule,
  MdMenuModule,
  MdIconModule,
  MdAutocompleteModule,
  MdOptionModule,
  MdListModule,
  MdExpansionModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdSlideToggleModule
  ],
  exports: [
  MdButtonModule,
  MdFormFieldModule,
  MdInputModule,
  MdCardModule,
  MdMenuModule,
  MdIconModule,
  MdAutocompleteModule,
  MdOptionModule,
  MdListModule,
  MdExpansionModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdSlideToggleModule
  ],
})
export class CustomMaterialModule { }
