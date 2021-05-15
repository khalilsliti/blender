import { productType } from "./product.model";

export class Product {
    product : productType ; 
  constructor(date : productType  )
  {
    this.product.label= date.label ;
    this.product.store= date.store;
    this.product.quantity= date.quantity;
    this.product.imgPath= date.imgPath;
    this.product.unit = date.unit;
    this.product.unitPrice= date.unitPrice;
    this.product.detail= date.detail;
    this.product.keywords= date.keywords;
    this.product.categories= date.categories;
    
  }
}









