const {Schema,model}=require('mongoose');
const LandSchema= Schema({
    Precio_cliente:String,
    Superficie_m2:String,
    Precio_m2:String,
    Ubicacion:String,
    Barrio_Zona:String,
    Papeles:String,
    Departamento:String,
    Imagen_terreno:{
         Url:String,
         Public_id:String
    },
    Servicios_basicos:String,
    State:{
        type: Boolean,
        default: true
    },

});

module.exports=model('Terreno',LandSchema);