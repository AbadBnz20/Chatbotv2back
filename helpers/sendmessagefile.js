const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const messageFile = async (numero, url) => {
  await client.messages
    .create({
      mediaUrl: url,
      from:`whatsapp:${process.env.TWILIO_NUMBER}`,
      to: numero,
    })
    .then((message) => console.log(message.sid));

};
module.exports = {
  messageFile,
};
