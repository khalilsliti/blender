import { Store } from "./Store.model";

export interface productType {
    _id : string , 
    unitPrice : number , 
    store : Store , /**/ 
    quantity : number , 
    orders : string , /**/
    label : string , 
    keywords : string[] , 
    imgPath : string , 
    detail : string , 
    createdAt : string , 
    categories: []  , 
    unit: string 
}