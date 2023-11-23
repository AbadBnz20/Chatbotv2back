const Land = require('../models/Land');
 const TrainbotData= async ()=>{
    try {
        // obtener datos de MongoBD
        const [lands] = await Promise.all([
            Land.find().limit(2).skip(13)

        ]);
        // console.log(lands)
        let obj=[]
         lands.map(item=>{
            const subitem={
                id:item._id.toString(),
                content:`Precio Cliente: ${item.Precio_cliente},Superficie M2: ${item.Superficie_m2}, Precio m2: ${item.Precio_m2}, Ubicacion: ${item.Ubicacion}, Barrio/Zona: ${item.Barrio_Zona}, Papeles: ${item.Papeles}, Departamento: ${item.Departamento}, Imagen del terreno: ${item.Imagen_terreno}, Servicios Basicos: ${item.Servicos_basicos}, Condicion: ${item.Condition}`,
                // object:{
                //       Precio_cliente: item.Precio_cliente,
                //       Superficie_m2: item.Superficie_m2,
                //       Precio_m2: item.Precio_m2,
                //       Ubicacion: item.Ubicacion,
                //       Barrio_Zona: item.Barrio_Zona,
                //       Papeles: item.Papeles,
                //       Departamento: item.Departamento,
                //       Imagen_terreno: item.Imagen_terreno,
                //       Servicos_basicos: item.Servicos_basicos,
                //       Condition: item.Condition,
                // }
            }
           obj.push(subitem);
         })
       
            

        return obj
    } catch (error) {
        console.log(error)
    }

 }

 module.exports={
    TrainbotData
 }