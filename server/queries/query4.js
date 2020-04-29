const query4 = (match, Transaction) => { 
    return Transaction.aggregate([            
        {
            $match : match
        },            
        {
            $sort : {
                "day" : -1
            }
        },
        {                
            $group: {                    
                _id : "$category",
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
                    },
                },
                totalAmount : {
                    $sum : "$amount" 
                },
            },
        },
        {
            $sort : {
                "transactions.category" : 1
            }
        },
    ]).exec();
}

module.exports = query4