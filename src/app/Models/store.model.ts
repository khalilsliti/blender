import { productType } from "./product.model";
export class Store {
         _id : string ; 
         address :  {
                    city : string , 
                    governorate : string , 
                    municipality : string , 
                    postalCode : number , 
                    street : string 
                    }
          categories : [] ; 
          createdAt : string ;  
          imgPath : string ;  
          keywords : [] ; 
          name : string ; 
          owner : string[] ;   /* for the moment */
          products : productType[] 
}
