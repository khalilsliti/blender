
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
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
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { StoreItemComponent } from './components/store-item/store-item.component';
import { ProductInfomationComponent } from './components/product-infomation/product-infomation.component';
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
    NavbarComponent,
    FooterComponent,
    ProductItemComponent,
    StoreItemComponent,
    ProductInfomationComponent,
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
    BrowserModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    HttpClientModule  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
