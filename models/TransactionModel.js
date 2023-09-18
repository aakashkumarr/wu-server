const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    mctn:{type:String,required:true,unique:true},
    date:{type:Date,require:true,default:Date.now},
    direction:{type:String,enum:["send","received"],required:true},
    status:{type:String,enum:['success','pending','failed'],required:true},
    fixedTransaction:{type:Number,required:true},
    recordingCountry:{type:String,required:true},
    payOutCountry:{type:String,required:true},
    sendingSideCurrency:{type:String,required:true},
    sendingSideCurrencyCode:{type:String,required:true},
    sendById:{type:Schema.Types.ObjectId,ref:'User',required:true},

},{timestamps: true})

module.exports = mongoose.model('Transaction',TransactionSchema)