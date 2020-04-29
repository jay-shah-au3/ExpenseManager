const query3 = (match, lookupName, trans) => {
    return trans.aggregate([
        {
            $match : match
        },            
        {                
            $lookup: {
                from: lookupName,
                pipeline: [
                    { 
                        $match: match
                    }],
                as:lookupName
            } 
        },
        {
            $group: {
                _id: null,
                table_1: {
                    $push : "$$ROOT"
                },
                table_2: {
                    $first: "$"+lookupName
                }
            }
        },
        {
            $project: {
                transactions: {
                    $setUnion: ["$table_1", "$table_2"]
                }
            }
        },
        {
            $unwind: "$transactions"
        },
        {
            $replaceRoot: {
                newRoot: "$transactions"
            }
        },       
        {
            $group:{
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
                totalIncome : {
                    $sum: {
                        $cond: [
                            {
                                $eq : ["$type","income"],
                            },
                            "$amount",
                            0
                        ]
                    }
                },
                totalExpense : {
                    $sum: {
                        $cond: [
                            {
                                $eq : ["$type","expense"],
                            },
                            "$amount",
                            0
                        ]
                    }
                },
            }
        }, 
        {           
            $addFields : {
                totalAmount : {
                    $subtract : ["$totalIncome", "$totalExpense"]
                }
            }
        },
        {
            $sort : {
                "transactions.date" :-1
            }
        }
    ]).exec();
}
module.exports = query3;