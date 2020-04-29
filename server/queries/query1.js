const query1 = (match, Transaction) => { 
       return Transaction.aggregate([            
        {
            $match : match
        },            
        {                
            $group: {                    
                _id : "$day",
                transactions : {
                    $push : {
                        t_id : "$_id",
                        userId : "$userId",
                        type: "$type", 
                        category : "$category",
                        date : "$date",
                        day : "$day",
                        month : "$month",
                        year : "$year",
                        description : "$description",
                        amount : "$amount"                            
                    }                    
                },
                totalAmount : {
                    $sum : "$amount" 
                },
            }
        },   
        {
            $sort : {
                "transactions.date" : -1
            }
        }
    ]).exec();
}

module.exports = query1