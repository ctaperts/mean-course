import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './auth-interceptor';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AngularMaterialModule
  ],
})
export class AuthModule { }
