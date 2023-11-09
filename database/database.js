const mongoose=require('mongoose')

mongoose.connect(process.env.baseUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>
{
    console.log("Mongodb connected");
}).catch((err)=>{
    console.log("mongodb connection error");
})