const {Schema,model}=require('mongoose');
const UserSchema= Schema({
    Name:{
        type:String,
    },
    Phone:{
        type:String
    },
   
    MessageID:{
        type:String,
        default:null
    },
    State:{
        type: Boolean,
        default: true,
       
    },
    Register:{
        type:Date,
        default:Date.now,
    }

});

module.exports=model('Usuario',UserSchema);