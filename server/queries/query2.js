
const query2 = (match, Transaction) => {
    return Transaction.aggregate([
        {
            $match : match
        },
        {
            $group : {
                _id : null,
                finalAmount : {
                    $sum : "$amount"
                }
            }
        }
    ]).exec();
}
module.exports = query2;