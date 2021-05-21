
interface Adress {
    governorate : String ,
    city :String ,
    postalCode :String ,
    municipality :String ,
    street :String
}

export class User {
    constructor(
        public firstName :String = "" ,
        public lastName :String = "" ,
        public email : String = "" ,
        public birthDate : Date = new Date("2005-1-1"),
        public address : Adress =  {governorate:"",city:"",postalCode:"",municipality:"",street:""},
        public role : "customer" | "owner" = "owner" ,
        public phone : Number ,
        public username : String = "" ,
        public password : String = "" ,
        public repassword : String = "" ,
        public img? : File , 
        public imgPath? : String 
    ){ }
}