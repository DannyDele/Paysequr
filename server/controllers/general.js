import User from "../models/User.js";
import Transaction from '../models/Transaction.js'
import OverallStat from "../models/OverallStat.js";


export const getUser = async (req, res) =>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(error){
        res.status(404).json({message: error.message});
    }
};

export const getDashboardStats = async (req, res) => {
    try{
        // HardCoded Values
        const currMonth = "November";
        const currYear = 2021;
        const currDay = "2021-11-15";

        // Recent Transactions
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });

        // Overall Stats
        const overallStat = await OverallStat.find({year: currYear});

        const{
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStat[0];

        const thisMonthStats = overallStat[0].monthlyData.find(({month}) => {
            return month === currMonth;
        });

        const todayStats = overallStat[0].dailyData.find(({date}) => {
            return date === currDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        })

    }catch(error){
        res.status(404).json({message: error.message});
    }
}