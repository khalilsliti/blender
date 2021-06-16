import { Store } from "./store.model";
export class productType {
    _id : string ; 
    unitPrice : number ; 
    store? : Store ; /**/ 
    quantity : number ; 
    orders : string[] ; /**/
    label : string ;
    img?: File ; 
    keywords : string[] ; 
    imgPath? : string ; 
    detail : string ;
    createdAt : string ; 
    categories: []  ;
    unit: string 
}