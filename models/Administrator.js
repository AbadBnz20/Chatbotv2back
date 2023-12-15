const {Schema,model}=require('mongoose');
const UserSchema= Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String,
    },
    Password:{
        type:String,
    },
    Phone:{
        type:String
    },
    Image:{
        type:String,
        
    },
    Rol:{
        type:String,
        default: 'AGENT_USER',
        emun: ['AGENT_USER', 'ADMIN_USER']
    },
    Gender:{
        type:String,
        default:null
    },
    State:{
        type: String,
        default: 'PENDING',
        emun: ['PENDING', 'VERIFIED','BANNED']
    },

});

module.exports=model('Administrador',UserSchema);