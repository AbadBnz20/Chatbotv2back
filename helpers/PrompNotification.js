const {ConfigOPenAI} = require('./ConfigOpenIA');

const PrompNotificacion = async (content,type)=>{

    const res = await ConfigOPenAI.call(
        `
        Instrucciones:
        - Se creativo con el mensaje y escribe palabras que varie y que sean diferentes.
        -Separa todas las urls con algo de espacio entre urls y modifícalas como si fuera una lista y elimina el [] y también ().
        Mensaje:
        Generame un mensaje  que espesifique se a publicado un nuevo ${type} como si fuera una noticia importante y llamativa, con estas caracteristicas"${content}" y que si necesita mas informacion contacte a este agente juan peres +591654567`
      );
    //   console.log({ res });
      return res
}


module.exports={
    PrompNotificacion
}