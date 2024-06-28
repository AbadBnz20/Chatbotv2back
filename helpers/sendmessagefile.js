const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const messageFile = async (numero, url) => {
  await client.messages
    .create({
      mediaUrl: url,
      from: "whatsapp:+59178220469",
      // from: "whatsapp:+14155238886",
      to: numero,
    })
    .then((message) => console.log(message.sid));

};
module.exports = {
  messageFile,
};
