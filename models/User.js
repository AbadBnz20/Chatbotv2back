const {Schema,model}=require('mongoose');
const UserSchema= Schema({
    Name:{
        type:String,
    },
    Phone:{
        type:String
    },
    Age:{
        type:String,
        default:null
    },
    Gender:{
        type:String,
        default:null
    },
    MessageID:{
        type:String,
        default:null
    },
    State:{
        type: String,
        default: 'Pending',
        emun: ['Pending', 'Verified']
    },

});

module.exports=model('Usuario',UserSchema);