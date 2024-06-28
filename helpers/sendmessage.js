const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const message= async(texto,numero)=>{
    await client.messages
    .create({
        body:texto,
        from: 'whatsapp:+59178220469',
    //   from: "whatsapp:+14155238886",
        to: numero
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(console.log(error)));

}
module.exports = {
    message
}