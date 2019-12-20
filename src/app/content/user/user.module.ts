import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import {
  MatAutocompleteModule,
  MatCardModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';




@NgModule({
  declarations: [CreateUserComponent, ViewUserComponent],
  exports: [
    ViewUserComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class UserModule { }
