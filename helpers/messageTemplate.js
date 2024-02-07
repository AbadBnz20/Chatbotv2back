const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const messageTemplate = async ()=>{
   
   await  client.messages
      .create({
         contentSid: 'HX7bf0568f2bfdba4f6685c1d704c6ee88',
         from: 'MGe7ba6f956c5fe6f018ba0edd7c6a1645',
         contentVariables: JSON.stringify({
           1: 'Abad'
         }),
         to: 'whatsapp:+59178230108'
       })
      .then(message => console.log(message.sid));
}
module.exports={
    messageTemplate
}