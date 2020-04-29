const ExpenseTransaction = require('../models/ExpenseTransaction');
const IncomeTransaction = require('../models/IncomeTransaction');
const ObjectId = require('mongoose').Types.ObjectId;
const getMonthYear = require('../utils/getMonthYear');
const query3 = require('../queries/query3');
module.exports = {
    async getCombinedAllTransactions(req, res) {
        try{
            const id = req.payload.userId;
            const match = { userId : new ObjectId(id)};
            let trans = ExpenseTransaction;
            let lookupName = 'incometransactions';
            const findExpenseTransaction = await trans.find({...match}).limit(1);
            if(findExpenseTransaction === null || findExpenseTransaction.length===0){
                trans = IncomeTransaction;
                lookupName = 'expensetransactions';
            }
            const response = await query3(match, lookupName, trans);
            if(response.length===0){
                const obj = {};            
                obj["transactions"] = [];
                obj["totalIncome"] = 0;
                obj["totalExpense"] = 0;
                obj["totalBalance"] = 0;
                response.push(obj);
            }
            res.json({allCombinedTransactions : response})
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }    
    },

    async getAllTransactions(req, res) {
        try{
            const id = req.payload.userId;
            const { month, year } = getMonthYear(req.params.type);
            const match = { userId : new ObjectId(id), month, year};
            let trans = ExpenseTransaction;
            let lookupName = 'incometransactions';
            const findExpenseTransaction = await trans.find({...match}).limit(1);
            if(findExpenseTransaction === null || findExpenseTransaction.length===0){
                trans = IncomeTransaction;
                lookupName = 'expensetransactions';
            }
            const response = await query3(match, lookupName, trans);

            if(response.length===0){
                const obj = {};            
                obj["transactions"] = [];
                obj["totalIncome"] = 0;
                obj["totalExpense"] = 0;
                obj["totalBalance"] = 0;
                response.push(obj);
            }
            res.json({allTransactions : response})
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }    
    },

    async getCustomDateAllTransactions(req, res) {
        try{
            const id = req.payload.userId;
            const {d1,d2} = req.params;
            const match = {
                userId : new ObjectId(id),
                date:{
                    $gte: new  Date(d1),
                    $lte: new Date(d2)
                }            
            }
            let trans = ExpenseTransaction;
            let lookupName = 'incometransactions';
            const findExpenseTransaction = await trans.find({...match}).limit(1);
            if(findExpenseTransaction === null || findExpenseTransaction.length===0){
                trans = IncomeTransaction;
                lookupName = 'expensetransactions';
            }
            const response = await query3(match, lookupName, trans);

            if(response.length===0){
                const obj = {};            
                obj["transactions"] = [];
                obj["totalIncome"] = 0;
                obj["totalExpense"] = 0;
                obj["totalBalance"] = 0;
                response.push(obj);
            }
            res.json({allTransactions : response})
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    }    
}