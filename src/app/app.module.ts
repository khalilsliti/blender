
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule , Router} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninModalComponent } from './components/signin-modal/signin-modal.component';
import { SigninFormComponent } from './components/forms/signin-form/signin-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsListComponent,
    StoresListComponent,
    ContactUsComponent,
    NotFoundComponent,
    SigninModalComponent,
    SigninFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule ,
    RouterModule,
    AppRoutingModule ,
    HttpClientModule  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
