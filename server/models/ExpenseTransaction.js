const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseTransactionSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    type:{
        type : String,
        default:"expense"
    },
    category : String,
    date : Date,
    day : Number,
    month : Number,
    year : Number,
    description : String,
    amount : Number
});

const ExpenseTransaction = mongoose.model('ExpenseTransaction', expenseTransactionSchema);
module.exports = ExpenseTransaction;