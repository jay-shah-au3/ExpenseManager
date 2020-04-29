const IncomeTransaction = require('../models/IncomeTransaction');
const ObjectId = require('mongoose').Types.ObjectId;
const query1 = require('../queries/query1');
const query2 = require('../queries/query2');
const query4 = require('../queries/query4');
const getMonthYear = require('../utils/getMonthYear');

module.exports = {
    async addIncomeTransaction(req, res) {
        try{
            const id = req.payload.userId;
            const obj = {...req.body};
            obj["userId"] = id;
            const newTransaction = new IncomeTransaction(obj);
            const saveTransaction = await newTransaction.save();
            res.json({msg:"Transaction Saved!"})
        }
        catch(error){
            res.status(500).json({error:"Transaction could not be added"});
        }
    },

    async getIncomeTransactionById(req, res){
        const id = req.payload.userId;
        try{
            const result = await IncomeTransaction.findOne({
                _id : new ObjectId(req.params.id),
                userId : id
            });
            res.json({transaction:result});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },

    async getAllIncomeTransaction(req, res) {
        try{        
            const id = req.payload.userId;
            const match = {userId: new ObjectId(id)};          
            const newResult = await Promise.all([query1(match,IncomeTransaction), query2(match, IncomeTransaction)]);
            let allIncomeTransactions = [];
            let allTotalIncome = 0;
            if(newResult[0]!==undefined && newResult[0].length){
                allIncomeTransactions = newResult[0];
                allTotalIncome = newResult[1][0].finalAmount;    
            }
            res.json({allIncomeTransactions, allTotalIncome});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },

    async getIncomeTransaction(req, res) {
        try{        
            const id = req.payload.userId;
            const { month, year } = getMonthYear(req.params.type);
            const match = {userId: new ObjectId(id), month, year};          
            const newResult = await Promise.all([query1(match,IncomeTransaction), query2(match, IncomeTransaction)]);
            let incomeTransactions = [];
            let totalIncome = 0;
            if(newResult[0]!==undefined && newResult[0].length){
                incomeTransactions = newResult[0];
                totalIncome = newResult[1][0].finalAmount;    
            }
            res.json({incomeTransactions, totalIncome});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },

    async getCustomDateIncomeTransaction(req,res){
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

            const newResult = await Promise.all([query1(match, IncomeTransaction), query2(match, IncomeTransaction)]);
            let incomeTransactions = [];
            let totalIncome = 0;
            if(newResult[0]!==undefined && newResult[0].length){
                incomeTransactions = newResult[0];
                totalIncome = newResult[1][0].finalAmount;    
            }
            res.json({incomeTransactions, totalIncome});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },

    async getAllIncomeTransactionReport(req, res) {
        try{        
            const id = req.payload.userId;
            const newResult = await IncomeTransaction.find({userId: new ObjectId(id)}).sort({date:-1}).exec();
            res.json({allIncomeTransactions : newResult});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction!"});
        }
    },

    async getIncomeTransactionCategory(req, res){
        try {
            const id = req.payload.userId;
            const { month, year } = getMonthYear(req.params.type);
            const match = { userId : new ObjectId(id), month, year};
            const response = await (query4(match, IncomeTransaction));
            res.json({categoryIncomeTransactions:response});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction by category!"});
        }
    },

    async getAllIncomeTransactionCategory(req, res){
        try {
            const id = req.payload.userId;
            const match = { userId : new ObjectId(id)};
            const response = await (query4(match, IncomeTransaction));
            res.json({allCategoryIncomeTransactions:response});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction by category!"});
        }
    },

    async getIncomeTransactionCategoryCustomDate(req, res){
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

            const response = await (query4(match, IncomeTransaction));
            res.json({categoryIncomeTransactions:response});
        }
        catch(error){
            res.status(500).json({error:"Could not fetch transaction by category!"});
        }
    },

    async updateIncomeTransaction(req, res){
        try {
            const t_id = req.params.id;        
            const {category, date, day, month, year, description, amount} = req.body
            const updatedTransaction = await IncomeTransaction.findByIdAndUpdate(
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

    async deleteIncomeTransaction(req, res){
        try {
            const t_id = req.params.id;        
            const deletedTransaction = await IncomeTransaction.findByIdAndRemove(t_id, { useFindAndModify: false });
            res.json({msg:"Transaction Deleted"});
        }
        catch(error){
            res.status(500).json({error:"Transaction could not be deleted"});
        }
    }
}