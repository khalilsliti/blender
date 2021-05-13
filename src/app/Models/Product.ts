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







// label: { 
//     type: String ,
//       required: true ,
//       trim : true ,
//       lowercase : true ,
//        maxLength : 20
//      },

// store /*protected*/ : {
//     type : mongoose.Schema.Types.ObjectId ,
//     required : true ,
//     ref : 'Store'
// }
// ,

// quantity : {
//     type: Number ,
//     required : true ,
//     min : 1 
// } ,

// imgPath /*protected*/ : {
//     type : String ,
//     trim : true 
// } ,

// unit : {
//     type : String ,
//     trim : true ,
//     required : true ,
//     lowercase : true ,
//     enum: ['g', 'l' , 'kg' , 'piece'] ,
//     default : 'piece'
// } ,
// unitPrice : {
//     type : Number ,
//     required : true ,
//     min : 0
// } ,
// detail : {
//     type : String ,
//     required : true ,
//     trim : true ,
//     lowercase : true ,
//     maxLength : 200 
// } ,
// keywords : [String] ,

// createdAt /*protected*/  : {
//     type : Date ,
//     required : true ,
//     default : new Date()
// } ,
// categories : [
//     {
//         type : String ,
//         trim : true ,
//         lowercase : true ,
//         maxLength : 20 
//     }
// ] ,
// orders /*protected*/ : [{
//     type : mongoose.Schema.Types.ObjectId ,
//     ref : 'Order'
// }]

// });
