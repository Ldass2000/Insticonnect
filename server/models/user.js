const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    birth:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    // batchyear:{
    //     type:Number,
    //     required:true
    // },
    hometown:{
        type:String,
        required:true
    },
    school:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"no photo"
    }
})

mongoose.model("User",userschema)