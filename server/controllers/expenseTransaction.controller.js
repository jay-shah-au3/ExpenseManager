const ExpenseTransaction = require('../models/ExpenseTransaction');
const ObjectId = require('mongoose').Types.ObjectId;
const query1 = require('../queries/query1');
const query2 = require('../queries/query2');
const query4 = require('../queries/query4');
const getMonthYear = require('../utils/getMonthYear');

module.exports = {
    async addExpenseTransaction(req, res) {
        try{
            const id = req.payload.userId;
            const obj = {...req.body};
            obj["userId"] = id;
            const newTransaction = new ExpenseTransaction(obj);
            const saveTransaction = await newTransaction.save();
            res.json({msg:"Transaction Saved!"})
        }
        catch(error){
            res.status(500).json({error:"Transaction could not be added"});            
        }
    },

    async getExpenseTransactionById(req, res){
        const id = req.payload.userId;
        try{
            const result = await ExpenseTransaction.findOne({
                _id : new ObjectId(req.params.id),
                userId : id
            });
            res.json({transaction:result});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },

    async getAllExpenseTransaction(req, res) {
        try{
            const id = req.payload.userId;
            const match = {userId: new ObjectId(id)};                     
            const newResult = await Promise.all([query1(match,ExpenseTransaction), query2(match, ExpenseTransaction)]);
            let allExpenseTransactions = [];
            let allTotalExpense = 0;
            if(newResult[0]!==undefined && newResult[0].length){
                allExpenseTransactions = newResult[0];
                allTotalExpense = newResult[1][0].finalAmount;    
            }
            res.json({allExpenseTransactions, allTotalExpense})
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },

    async getExpenseTransaction(req, res) {
        try{
            const id = req.payload.userId;
            const { month, year } = getMonthYear(req.params.type);
            const match = {userId: new ObjectId(id), month, year};          
            const newResult = await Promise.all([query1(match,ExpenseTransaction), query2(match, ExpenseTransaction)]);
            let expenseTransactions = [];
            let totalExpense = 0;
            if(newResult[0]!==undefined && newResult[0].length){
                expenseTransactions = newResult[0];
                totalExpense = newResult[1][0].finalAmount;    
            }
            res.json({expenseTransactions, totalExpense})
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },
    
    async getCustomDateExpenseTransaction(req,res){
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

            const newResult = await Promise.all([query1(match, ExpenseTransaction), query2(match, ExpenseTransaction)]);
            let expenseTransactions = [];
            let totalExpense = 0;
            if(newResult[0]!==undefined && newResult[0].length){
                expenseTransactions = newResult[0];
                totalExpense = newResult[1][0].finalAmount;    
            }
            res.json({expenseTransactions, totalExpense});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    
    },

    async getAllExpenseTransactionReport(req, res) {
        try{
            const id = req.payload.userId;
            const newResult = await ExpenseTransaction.find({userId: new ObjectId(id)}).sort({date:-1}).exec();
            res.json({allExpenseTransactions : newResult})
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },

    async getExpenseTransactionCategory(req, res){
        try{
            const id = req.payload.userId;
            const { month, year } = getMonthYear(req.params.type);
            const match = { userId : new ObjectId(id), month, year};
            const response = await (query4(match, ExpenseTransaction));
            res.json({categoryExpenseTransactions:response});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction by category!"});
        }
    },

    async getAllExpenseTransactionCategory(req, res){
        try{
            const id = req.payload.userId;
            const match = { userId : new ObjectId(id)};
            const response = await (query4(match, ExpenseTransaction));
            res.json({allCategoryExpenseTransactions:response});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction by category!"});
        }
    },

    async getExpenseTransactionCategoryCustomDate(req, res){
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
            const response = await (query4(match, ExpenseTransaction));
            res.json({categoryExpenseTransactions:response});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction by category!"});
        }
    },

    async updateExpenseTransaction(req, res){
        try {
            const t_id = req.params.id;        
            const {category, date, day, month, year, description, amount} = req.body
            const updatedTransaction = await ExpenseTransaction.findByIdAndUpdate(
                t_id,
                {
                    category,date,day,month,year,description,amount
                },
                {new : true, useFindAndModify: false }
            );
            res.json({msg:"Transaction Updated"});
        }
        catch(error){
            res.status(500).json({error:"Transaction could not be updated"});
        }
    },
    
    async deleteExpenseTransaction(req, res){
        try {
            const t_id = req.params.id;        
            const deletedTransaction = await ExpenseTransaction.findByIdAndRemove(t_id, { useFindAndModify: false });
            res.json({msg:"Transaction Deleted"});
        }
        catch(error){
            res.status(500).json({error:"Transaction could not be deleted"});
        }
    }
}