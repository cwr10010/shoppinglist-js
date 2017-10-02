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
  MdSidenavModule,
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
  MdSidenavModule,
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
  MdSidenavModule,
  MdSlideToggleModule
  ],
})
export class CustomMaterialModule { }
