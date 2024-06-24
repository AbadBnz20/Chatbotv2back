const { message } = require("./sendmessage");
const { messageFile } = require("./sendmessagefile");



const FormatSend = async (text,From)=>{
    const regex = /https:\/\/res\.cloudinary\.com\/[^\s)]+/g;
    const firebaseStorageRegex = /https:\/\/firebasestorage\.googleapis\.com\/[^\s)]+/g;
    const matches = text.match(regex);
    console.log(matches);
    if (matches != null) {
        messageFile(From,matches[0],text);
    }else {
        message(text, From);
    }
}


module.exports={
    FormatSend
}