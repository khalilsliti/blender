import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddStoreComponent } from './components/add-store/add-store.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { OwnerDashboardComponent } from './components/dashboards/owner-dashboard/owner-dashboard.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditStoreComponent } from './components/edit-store/edit-store.component';
import { HomeComponent } from './components/home/home.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderComponentComponent } from './components/order-component/order-component.component';
import { ProductInfomationComponent } from './components/product-infomation/product-infomation.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';
import { authGuard } from './services/routeGaurd/routeGuardProfile.service';

const routes: Routes = [
 {path:"home" , component:HomeComponent} ,
 {path:"product-information/:label", component:ProductInfomationComponent}, 
 {path:"products/:pageNumber" , component:ProductsListComponent} ,
 {path:"products" , redirectTo:"products/0", pathMatch:"full"},
 {path:"stores/:pageNumber" , component:StoresListComponent} ,
 {path:"stores" , redirectTo: "stores/0", pathMatch:"full"},
 {path:"contact" , component:ContactUsComponent} ,
 {path:"profile" , component:ProfileComponent,canActivate:[authGuard]} ,
 {path:"customer-dashboard", component:UserDashboardComponent,canActivate:[authGuard]},
 {path:"orders", component:OrderComponentComponent, canActivate:[authGuard]},
 {path:"owner-dashboard", component:OwnerDashboardComponent,canActivate:[authGuard] , 
    children:[
      {path:"", redirectTo:"manage-orders/0" , pathMatch:"full"} , 
      {path:"manage-orders/:pageNumber", component:ManageOrdersComponent , canActivate:[authGuard]}, 
      {path:"add-product", component:AddProductComponent, canActivate:[authGuard]},
      {path:"create-store" , component:AddStoreComponent, canActivate:[authGuard]},  
      {path:"edit-product" , component:EditProductComponent, canActivate:[authGuard]},  
      {path:"edit-store" , component:EditStoreComponent, canActivate:[authGuard]}
    ] 
} ,
 {path:"404" , component:NotFoundComponent} ,
 {path:"" , redirectTo:"/home" , pathMatch:"full"} ,
 {path:"**" , redirectTo:"/404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }