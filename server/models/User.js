const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId : {
        type : String,
        required: true
    },
    email : String,    
    first_name : String,
    last_name : String,
    image_url : String, 
    income_categories : {
        type : Array,
        default:[]
    },
    expense_categories : {
        type : Array,
        default:[]
    }
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;