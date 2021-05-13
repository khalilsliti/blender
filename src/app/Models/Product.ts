export class Product {
    label:String;
    store:String; //for the moment
    quantity:Number;
    imgPath:String;
    unit:String; 
    unitPrice:Number;
    detail :String
    keywords :String;
    createdAt:Date
    categories:Array<String>
    orders: String //for the moment
  constructor(label="",store="",quantity=0,imgPath="",unit="",unitPrice=0,detail="",keywords="",categories=[])
  {
    this.label=label;
    this.store=store;
    this;quantity=quantity;
    this.imgPath=imgPath;
    this.unit=unit;
    this.unitPrice=unitPrice;
    this.detail=detail;
    this.keywords=keywords;
    this.categories=categories;
    
  }
}







