import { productType } from "./product.model";
import { Store } from "./Store.model";

export interface Order {
    totalPrice : number , 
    accepted : boolean , 
    product : productType , 
    quantity : number , 
    store : Store  
}
