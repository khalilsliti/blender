import { Store } from "./Store.model";
export class productType {
    _id : string ; 
    unitPrice : number ; 
    store : Store ; /**/ 
    quantity : number ; 
    orders : string ; /**/
    label : string ;
    keywords : string[] ; 
    imgPath : string ; 
    detail : string ;
    createdAt : string ; 
    categories: []  ;
    unit: string 
}