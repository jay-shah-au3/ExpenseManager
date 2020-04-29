import React from 'react';
import { getResults } from '../../config/api';
import ExcelFileSheet from './excel-file.component';
import { ReportContainer, ReportRowContainer } from './report.styles.js';
import excel from '../../assets/excel.png';
// import pdf from '../../assets/pdf.png';

class Report extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allExpenseTransactions : [],
            allIncomeTransactions : [],
            allTransactions : [],
        }
    }
    async componentDidMount(){
        const response = await Promise.all([
            getResults('transaction/expense/report/all'), 
            getResults('transaction/income/report/all'),    
        ]);
        const { allExpenseTransactions } = response[0];
        const { allIncomeTransactions } = response[1];
        const allTransactions = allExpenseTransactions.concat(allIncomeTransactions);
        allTransactions.sort((t1,t2) => {
            return new Date(t2.date) - new Date(t1.date);
        });
        this.setState({allExpenseTransactions, allIncomeTransactions, allTransactions})        
    }

    render(){
        const { allExpenseTransactions, allIncomeTransactions, allTransactions } = this.state;
        return(
            <ReportContainer>
                <ReportRowContainer>
                    {   allTransactions && allTransactions.length>0 ?
                        <ExcelFileSheet filename="Transactions" image = {excel} displayname="Transactions.xlsx" 
                            data={allTransactions} sheetname="Transactions"/>
                        :null
                    }
                    {   allExpenseTransactions && allExpenseTransactions.length>0 ?
                        <ExcelFileSheet filename="Expense_Transactions" image = {excel} displayname = "Expense_Transactions.xlsx"
                            data={allExpenseTransactions} sheetname="Expense Transactions"/>
                        :null
                    }
                    {   allIncomeTransactions && allIncomeTransactions.length>0 ?
                        <ExcelFileSheet filename="Income_Transactions" image = {excel} displayname="Income_Transactions.xlsx" 
                            data={allIncomeTransactions} sheetname="Income Transactions"/>
                        :null
                    }
                    {
                        allTransactions && allTransactions.length > 0 ? null 
                        : <h3> No Transactions done as of now!</h3>                        
                    }
                </ReportRowContainer>
            </ReportContainer>
        )
    }
}

export default Report;
