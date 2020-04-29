const Category = require('../models/Category');
const User = require('../models/User');
module.exports = {
    async getCategories(req, res){
        try{        
            const id = req.payload.userId;
            const result = await Promise.all([Category.find({}), User.findById(id)]);
            const defaultExpenseCategories = result[0][0].expense_categories;         
            const defaultIncomeCategories = result[0][0].income_categories;
            const getUserExpenseCategories = result[1].expense_categories;
            const getUserIncomeCategories = result[1].income_categories;
            const expenseCategories = defaultExpenseCategories.concat(getUserExpenseCategories);
            const incomeCategories = defaultIncomeCategories.concat(getUserIncomeCategories);
            if(getUserExpenseCategories.length){
                getUserExpenseCategories.sort( (c1, c2) => c1-c2);
                expenseCategories.sort((item1, item2)=>item1-item2)
            }
            if(getUserIncomeCategories.length){
                getUserIncomeCategories.sort( (c1, c2) => c1-c2);
                incomeCategories.sort((item1, item2)=>item1-item2)
            }
            res.json({expenseCategories ,incomeCategories, getUserExpenseCategories, getUserIncomeCategories, defaultExpenseCategories, defaultIncomeCategories});
        }
        catch(error){
            res.status(500).json({error:"Could Not fetch Categories!"});
        }
    },

    async updateCategory(req, res){
        try{        
            const id = req.payload.userId;
            const {type, category} = req.body;
            let categoryType = "income_categories"; 
            if(type==='expense')
                categoryType = "expense_categories";
            const updatedArray = await User.findByIdAndUpdate(
                id,
                {
                    $push : {
                        [categoryType] : category
                    }
                },
                {new:true}
            ).exec();
            const expense_categories = updatedArray["expense_categories"];
            const income_categories = updatedArray["income_categories"];
            if(type==='expense'){
                expense_categories.sort( (c1, c2) => c1-c2);
            }
            else{
                income_categories.sort( (c1, c2) => c1-c2);
            }            
            res.json({expense_categories, income_categories});
        }
        catch(error){
            res.status(500).json({error:"Could Not Add Category!"});
        }
    },

    async deleteCategory(req, res){
        try{        
            const id = req.payload.userId;
            const {type, category} = req.params;
            let categoryType = "income_categories"; 
            if(type==='expense')
                categoryType = "expense_categories";
            const updatedArray = await User.findByIdAndUpdate(
                id,
                {
                    $pull : {
                        [categoryType] : category
                    }
                },
                {new:true}
            ).exec();
            const expense_categories = updatedArray["expense_categories"];
            const income_categories = updatedArray["income_categories"];
            res.json({expense_categories, income_categories});
        }
        catch(error){
            res.status(500).json({error:"Could Not Delete Category!"});
        }
    },
}