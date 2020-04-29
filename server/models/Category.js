const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    income_categories : {
        type : Array,
        "default" : ["Award", "Gifts", "Interest Money", "Others", "Salary", "Selling"]
    },
    expense_categories : {
        type : Array,
        "default" : ["Bills & Utilities", "Education" , "Entertainment", "Family", "Food & Beverage", "Gifts & Donations", "Health & Fitness", "Insurances", "Investment", "Others", "Shopping", "Transportation", "Travel"]
    }
});

const Category = mongoose.model('Category', categorySchema, 'categories');
module.exports = Category;