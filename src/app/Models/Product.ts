
export class Product {
    label:String;
    store:String; //for the moment
    quantity:Number;
    imgPath:String;
    unit:String; 
    unitPrice:Number;
    detail :String
    keywords :String[];
    createdAt:Date ; 
    categories: String[] ; 
    orders: String //for the moment
  constructor(label: string ,store: string ,quantity : number ,imgPath : string ,unit: string  ,unitPrice : number ,detail : string ,keywords : string[] ,categories: string[]  )
  {
    this.label= label ;
    this.store=store;
    this.quantity=quantity;
    this.imgPath=imgPath;
    this.unit=unit;
    this.unitPrice=unitPrice;
    this.detail=detail;
    this.keywords=keywords;
    this.categories=categories;
    
  }
}









