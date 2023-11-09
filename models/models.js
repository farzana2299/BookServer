const mongoose=require('mongoose')
//admin 
const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    psw:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:13,
        trim:true
    }
})

const admin=new mongoose.model('admin',adminSchema)

//customer
const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    psw:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:13
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
})


const customer=new mongoose.model('customer',customerSchema)


//book
const bookSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
        
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
       
    },
    pYear:{
        type:String,
        required:true,
        trim:true
    }
})

const book=new mongoose.model('book',bookSchema)
module.exports={admin,customer,book}