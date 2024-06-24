const {Schema,model}=require('mongoose');
const MessageSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  }
}, { _id: false });
const HistorySchema= Schema({
    ThreadId:{
        type:String,
    },
    messages: [MessageSchema]
});

module.exports=model('History',HistorySchema);