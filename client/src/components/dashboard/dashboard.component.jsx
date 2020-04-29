import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { walletBalance } from '../../redux/transaction/transaction.actions';
import { getResults } from '../../config/api';
import NavTabs from './nav-tab.component';
// import PieChart from '../chart/pie-chart.component';
import PieChart from '../chart/pie-chart.component';
import { TransactionButton, DashBoardContainer, ButtonContainer, ChartContainer, RowContainer, ColumnContainer } from './dashboard.styles.js';

class Dashboard extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            showCustomDate : false,
            date: [new Date(), new Date()],            
            allExpenseTransactions : [],
            allIncomeTransactions : [],
            allTotalExpense:null,
            allTotalIncome:null,
            allCombinedTransactions:[],
            current_month_expenseTransactions : [],
            current_month_incomeTransactions : [],
            current_month_allTransactions : [],
            current_month_totalExpense:null,
            current_month_totalIncome:null,
            past_month_expenseTransactions : [],
            past_month_incomeTransactions : [],
            past_month_allTransactions : [],
            past_month_totalExpense:null,
            past_month_totalIncome:null,
            expenseTransactions : [],
            totalExpense:null,
            incomeTransactions: [],
            totalIncome: null,
            allTransactions : [],
            current_month_categoryExpenseTransactions:[],
            current_month_categoryIncomeTransactions:[],
            past_month_categoryExpenseTransactions:[],
            past_month_categoryIncomeTransactions:[],
            categoryExpenseTransactions:[],
            categoryIncomeTransactions:[],
            allCategoryExpenseTransactions:[],
            allCategoryIncomeTransactions:[]
        }
    }
    async componentDidMount(){
        const response = await Promise.all([
            getResults('transaction/expense/current'), 
            getResults('transaction/income/current'),
            getResults('transaction/combine/current'),
            getResults('transaction/expense/category/current'),
            getResults('transaction/income/category/current'),
            getResults('transaction/expense/all'), 
            getResults('transaction/income/all'),
            getResults('transaction/combine/all'),
            getResults('transaction/expense/category/all'),
            getResults('transaction/income/category/all'),
        ]);

        const {expenseTransactions, totalExpense} = response[0];
        const {incomeTransactions, totalIncome} = response[1];
        const { allTransactions }  = response[2];
        const { categoryExpenseTransactions }  = response[3];
        const { categoryIncomeTransactions }  = response[4];
        const {allExpenseTransactions, allTotalExpense} = response[5];
        const {allIncomeTransactions, allTotalIncome} = response[6];
        const {allCombinedTransactions} = response[7];
        const { allCategoryExpenseTransactions } = response[8];
        const { allCategoryIncomeTransactions } = response[9];
        this.props.updateWallet(allTotalIncome - allTotalExpense);
        this.setState({showCustomDate:false, expenseTransactions, totalExpense,  incomeTransactions, totalIncome, allTransactions,
            current_month_expenseTransactions : expenseTransactions,
            current_month_totalExpense : totalExpense,
            current_month_incomeTransactions : incomeTransactions,
            current_month_totalIncome : totalIncome,
            current_month_allTransactions : allTransactions,
            current_month_categoryExpenseTransactions:categoryExpenseTransactions,
            current_month_categoryIncomeTransactions:categoryIncomeTransactions,
            categoryExpenseTransactions, categoryIncomeTransactions,
            allExpenseTransactions, allTotalExpense,
            allIncomeTransactions, allTotalIncome ,allCombinedTransactions,
            allCategoryExpenseTransactions, allCategoryIncomeTransactions
        });
    }

    handleSelectionChange = async (e) => {   
        const {value} = e.target;
        if(value==='this_month'){
            const {current_month_expenseTransactions, current_month_totalExpense, current_month_incomeTransactions,
                current_month_totalIncome, current_month_allTransactions, current_month_categoryExpenseTransactions,
                current_month_categoryIncomeTransactions
            } = this.state;
            this.setState({showCustomDate:false, expenseTransactions: current_month_expenseTransactions, totalExpense : current_month_totalExpense, 
                incomeTransactions : current_month_incomeTransactions, totalIncome : current_month_totalIncome,
                allTransactions : current_month_allTransactions, 
                categoryExpenseTransactions: current_month_categoryExpenseTransactions,
                categoryIncomeTransactions : current_month_categoryIncomeTransactions
            });
        }
        else if(value === 'past_month'){
            if(this.state.past_month_totalExpense===null){
                const response = await Promise.all([
                    getResults('transaction/expense/past'), 
                    getResults('transaction/income/past'),
                    getResults('transaction/combine/past'),
                    getResults('transaction/expense/category/past'),
                    getResults('transaction/income/category/past')        
                ]);
                const {expenseTransactions, totalExpense} = response[0];
                const {incomeTransactions, totalIncome} = response[1];
                const { allTransactions }  = response[2];
                const { categoryExpenseTransactions }  = response[3];
                const { categoryIncomeTransactions }  = response[4];        
                this.setState({showCustomDate:false, expenseTransactions, totalExpense,  incomeTransactions, totalIncome, allTransactions,
                    past_month_expenseTransactions : expenseTransactions,
                    past_month_totalExpense : totalExpense,
                    past_month_incomeTransactions : incomeTransactions,
                    past_month_totalIncome : totalIncome,
                    past_month_allTransactions : allTransactions,
                    past_month_categoryExpenseTransactions:categoryExpenseTransactions,
                    past_month_categoryIncomeTransactions:categoryIncomeTransactions,        
                    categoryExpenseTransactions,
                    categoryIncomeTransactions
                });        
            }
            else{
                const {past_month_expenseTransactions, past_month_totalExpense, past_month_incomeTransactions,
                    past_month_totalIncome, past_month_allTransactions, 
                    past_month_categoryExpenseTransactions, past_month_categoryIncomeTransactions
                } = this.state;
                this.setState({expenseTransactions: past_month_expenseTransactions, totalExpense : past_month_totalExpense, 
                    incomeTransactions : past_month_incomeTransactions, totalIncome : past_month_totalIncome,
                    allTransactions : past_month_allTransactions,
                    categoryIncomeTransactions: past_month_categoryIncomeTransactions, 
                    categoryExpenseTransactions : past_month_categoryExpenseTransactions
                });
            }
        }
        else if(value==='all_years'){
            const { allExpenseTransactions, allTotalExpense, allIncomeTransactions, allTotalIncome,
                allCombinedTransactions, allCategoryExpenseTransactions, allCategoryIncomeTransactions                
            } = this.state;
            this.setState({showCustomDate:false,
                expenseTransactions : allExpenseTransactions,
                totalExpense : allTotalExpense,
                incomeTransactions : allIncomeTransactions,
                totalIncome : allTotalIncome,
                allTransactions : allCombinedTransactions,
                categoryExpenseTransactions : allCategoryExpenseTransactions,
                categoryIncomeTransactions : allCategoryIncomeTransactions
            });
        }    
        else if(value==='custom_date'){
            this.setState({showCustomDate:true})
        }
    }

    onDateChange = async (date) => {
        const response =  await Promise.all([
            getResults('transaction/expense/custom/'+date[0]+'/'+date[1]),
            getResults('transaction/income/custom/'+date[0]+'/'+date[1]),
            getResults('transaction/combine/custom/'+date[0]+'/'+date[1]),
            getResults('transaction/expense/category/custom/'+date[0]+'/'+date[1]),
            getResults('transaction/income/category/custom/'+date[0]+'/'+date[1])
        ]);
        const {expenseTransactions, totalExpense} = response[0];
        const {incomeTransactions, totalIncome} = response[1];
        const { allTransactions }  = response[2];
        const { categoryExpenseTransactions }  = response[3];
        const { categoryIncomeTransactions }  = response[4];
        this.setState({date: [date[0],date[1]], expenseTransactions, totalExpense, incomeTransactions,
            totalIncome, allTransactions, categoryIncomeTransactions, categoryExpenseTransactions
        });
    };

    onHandleClick = (e) => {
        const id = e.currentTarget.id        
        const category = e.currentTarget.dataset.category;
        this.props.history.push(`transaction/edit/${category}/${id}`);
    }

    render() { 
        const { expenseTransactions, totalExpense, incomeTransactions, totalIncome, allTransactions, 
        showCustomDate, categoryExpenseTransactions, categoryIncomeTransactions,date } = this.state;        
        return(
            <DashBoardContainer>
                <RowContainer className="row">
                    <ButtonContainer className="col-xs-12 col-sm-12 col-md-2">
                        <TransactionButton onClick={()=>this.props.history.push('/transaction')}>Add Transaction</TransactionButton>
                    </ButtonContainer>
                </RowContainer>
                <RowContainer className="row" style={{marginTop:"-30px"}}>
                    <ColumnContainer className="col-xs-12 col-sm-7 col-md-8" >
                        <NavTabs allTransactions={allTransactions} expenseTransactions={expenseTransactions} incomeTransactions={incomeTransactions} 
                            showCustomDate = {showCustomDate}
                            handleDateChange = {this.onDateChange}
                            dateValue = {date}
                            onHandleClick={(e)=>this.onHandleClick(e)}                    
                            handleSelectionChange={(e) => this.handleSelectionChange(e)}
                            totalExpense = {totalExpense}
                            totalIncome = {totalIncome}
                        />
                    </ColumnContainer>
                    <ColumnContainer className="col-xs-12 col-sm-5 col-md-4">
                        <ChartContainer>
                            {   totalIncome || totalExpense ?
                                <PieChart total={totalIncome + totalExpense} name="Transactions" transactions={
                                    [ {_id:'Income',totalAmount:totalIncome}, {_id:'Expense', totalAmount:totalExpense}]}/> 
                                    : null
                            }   
                            {   categoryExpenseTransactions && categoryExpenseTransactions.length > 0 ?
                                <PieChart total={totalExpense} name="Expense Transactions" transactions={categoryExpenseTransactions}/> 
                                : null
                            }   
                            {   categoryIncomeTransactions && categoryIncomeTransactions.length > 0 ?
                                <PieChart total={totalIncome} name="Income Transactions" transactions={categoryIncomeTransactions}/>
                                : null
                            }  
                        </ChartContainer>
                    </ColumnContainer>
                </RowContainer>
            </DashBoardContainer>
        )
    }
}

export const mapDispatchToProps = (dispatch) => ({
    updateWallet : (balance) => dispatch(walletBalance(balance))
})


export default withRouter(connect(null,mapDispatchToProps)(Dashboard));