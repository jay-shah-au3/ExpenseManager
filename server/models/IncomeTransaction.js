const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeTransactionSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    type:{
        type : String,
        default:"income"
    },
    category : String,
    date : Date,
    day : Number,
    month : Number,
    year : Number,
    description : String,
    amount : Number
});

const incomeTransaction = mongoose.model('IncomeTransaction', incomeTransactionSchema);
module.exports = incomeTransaction;