const mongoose = require('mongoose');

module.exports = {
    dbConnection(DB_URI){
        mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology : true })
        .then(() =>  console.log('connection succesful'))
        .catch((err) => console.error(err));
    }
}