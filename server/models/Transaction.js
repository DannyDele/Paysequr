import mongoose from 'mongoose';

const TransactionScheme = new mongoose.Schema({
    userId: String,
    cost: String,
    products: {
        type: [mongoose.Types.ObjectId],
        of: Number,
    },
    category: String,
    rating: Number,
    supply: Number
},
{timestamps: true}
);

const Transaction = mongoose.model("Transaction", TransactionScheme);
export default Transaction;