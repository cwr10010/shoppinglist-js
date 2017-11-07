import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatListModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatListModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSlideToggleModule
  ],
  exports: [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatListModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSlideToggleModule
  ],
})
export class CustomMaterialModule { }
