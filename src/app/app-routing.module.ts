import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductInfomationComponent } from './components/product-infomation/product-infomation.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';


const routes: Routes = [
 {path:"home" , component:HomeComponent} ,
 {path:"product-information/:label", component:ProductInfomationComponent}, 
 {path:"products/:pageNumber" , component:ProductsListComponent} ,
 {path:"products" , redirectTo:"products/0", pathMatch:"full"},
 {path:"stores/:pageNumber" , component:StoresListComponent} ,
 {path:"stores" , redirectTo: "stores/0", pathMatch:"full"},
 {path:"contact" , component:ContactUsComponent} ,
 {path:"profile" , component:ProfileComponent} ,
 {path:"404" , component:NotFoundComponent} ,
 {path:"" , redirectTo:"/home" , pathMatch:"full"} ,
 {path:"**" , redirectTo:"/404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }