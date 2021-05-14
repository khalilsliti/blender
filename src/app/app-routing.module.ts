import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';


const routes: Routes = [
 {path:"home" , component:HomeComponent} ,
 {path:"products/:pageNumber" , component:ProductsListComponent} ,
 {path:"products" , redirectTo:"products/1", pathMatch:"full"},
 {path:"stores" , component:StoresListComponent} ,
 {path:"contact" , component:ContactUsComponent} ,
 {path:"404" , component:NotFoundComponent} ,
 {path:"" , redirectTo:"/home" , pathMatch:"full"} ,
 {path:"**" , redirectTo:"/404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }