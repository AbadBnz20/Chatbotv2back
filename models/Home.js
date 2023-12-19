const {Schema,model}=require('mongoose');
const HomeSchema= Schema({
    Precio:String,
    Superficie_m2:String,
    m2_Contruidos:String,
    Ubicacion:String,
    Barrio_Zona:String,
    Papeles:String,
    Departamento:String,
    Imagen_Casa:{
         Url:String,
         Public_id:String
    },
    Descripcion:String,
    Tipo:String,
    State:{
        type: Boolean,
        default: true
    },

});

module.exports=model('Casa',HomeSchema);