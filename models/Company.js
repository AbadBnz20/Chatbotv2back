const {Schema,model}=require('mongoose');
const CompanySchema= Schema({
   InformationGeneral:String
});

module.exports=model('Company',CompanySchema);