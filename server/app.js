const express= require('express')
const app=  express();
const mongoose=require('mongoose');
const PORT =5000

const {MONGOURI} = require('./keys')

require('./models/user')
// mongoose.model("User")

app.use(express.json())
app.use(require('./routes/auth'));


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yupy!!");
})
mongoose.connection.on('error',(err)=>{
    console.log("Error in connecting ",err);
})
 
const customMiddleware=(req,res,next)=>{
   console.log("My middleware is created !!");
   next()
}

app.use(customMiddleware)

app.get('/',(req,res)=>{
    console.log("home");
    res.send("hello world")
})

app.get('/about',customMiddleware,(req,res)=>{
    console.log("about");
    res.send("hello world")
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT);
})