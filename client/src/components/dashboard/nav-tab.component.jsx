import React,{Fragment} from 'react';
import DisplayList from './display-list.component';
import Selection from './select.component';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {
    NavTab, NavTabTitle, NavTabLink, NavTabContent, NavTabList, DatePicker, AmountRowContainer,
    AmountColumnCardContainer, AmountColumnCardContainer1, AmountTitleContainer, AmountContainer, TitleContainer
} from './nav-tab.styles.js';

function NavTabs(props){
    const  {allTransactions, expenseTransactions, incomeTransactions, showCustomDate,         
        handleSelectionChange, onHandleClick, handleDateChange, dateValue, totalExpense, totalIncome
    } = props;
    const balance = totalIncome - totalExpense;
    return(
        <Fragment>
            <NavTab>
                <NavTabTitle className="nav nav-tabs" id="nav-tab" role="tablist">
                    <NavTabLink className="nav-item nav-link active" id="nav-all-tab" data-toggle="tab" href="#nav-all" role="tab" aria-controls="nav-all" aria-selected="true">All</NavTabLink>
                    <NavTabLink className="nav-item nav-link" id="nav-expense-tab" data-toggle="tab" href="#nav-expense" role="tab" aria-controls="nav-expense" aria-selected="false">Expense</NavTabLink>
                    <NavTabLink className="nav-item nav-link" id="nav-income-tab" data-toggle="tab" href="#nav-income" role="tab" aria-controls="nav-income" aria-selected="false">Income</NavTabLink>
                </NavTabTitle>
            </NavTab>
            <NavTabContent className="tab-content" id="nav-tabContent">
                {
                    totalExpense!==null ? 
                    <Fragment>
                        <AmountRowContainer className="row" style={{marginTop:"10px"}}>
                            <AmountColumnCardContainer className="col-sm-12">
                                <AmountTitleContainer data-type="balance" amount={balance}>
                                    <TitleContainer>Balance <span>₹{balance}</span></TitleContainer>
                                </AmountTitleContainer>
                            </AmountColumnCardContainer>
                        </AmountRowContainer>
                        <AmountRowContainer className="row">
                            <AmountColumnCardContainer1 className="col-sm-6">
                                <AmountTitleContainer data-type="income">
                                    <TitleContainer>Income</TitleContainer>
                                    <AmountContainer><span>₹{totalIncome}</span></AmountContainer>
                                </AmountTitleContainer>
                            </AmountColumnCardContainer1>
                            <AmountColumnCardContainer className="col-sm-6">
                                <AmountTitleContainer data-type="expense"> 
                                <TitleContainer>Expense</TitleContainer>
                                <AmountContainer><span>₹{totalExpense}</span></AmountContainer>
                                </AmountTitleContainer>
                            </AmountColumnCardContainer>
                        </AmountRowContainer>
                    </Fragment>
                    : null
                }
                <Selection handleSelectionChange = {handleSelectionChange}/>
                {
                    showCustomDate ?
                    <DatePicker>
                        <DateRangePicker onChange={handleDateChange} value={dateValue}/>
                    </DatePicker> : null
                }
                <NavTabList className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                {
                    allTransactions.length > 0 && allTransactions[0].transactions!==undefined 
                    && allTransactions[0].transactions.length > 0
                    ?
                    <DisplayList transactions={allTransactions} newKey="all" onHandleClick={onHandleClick}/>
                    : null
                }
                </NavTabList>
                <NavTabList className="tab-pane fade" id="nav-expense" role="tabpanel" aria-labelledby="nav-expense-tab">
                {
                    expenseTransactions.length > 0 && expenseTransactions[0].transactions!==undefined 
                    && expenseTransactions[0].transactions.length > 0
                    ?
                    <DisplayList transactions={expenseTransactions} newKey="expense" onHandleClick={onHandleClick}/>
                    : null
                }
                </NavTabList>
                <NavTabList className="tab-pane fade" id="nav-income" role="tabpanel" aria-labelledby="nav-income-tab">
                {
                    incomeTransactions.length > 0 && incomeTransactions[0].transactions!==undefined 
                    && incomeTransactions[0].transactions.length > 0
                    ?
                    <DisplayList transactions={incomeTransactions} newKey="income" onHandleClick={onHandleClick}/>
                    : null
                }
                </NavTabList>
            </NavTabContent>
        </Fragment>
    )
}

export default NavTabs;