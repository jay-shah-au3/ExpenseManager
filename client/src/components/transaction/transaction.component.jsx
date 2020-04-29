import React,{Fragment} from 'react';
import DatePicker from 'react-date-picker';
import CategoryModal from './category-modal.component';
import { getResults, postResults, updateResults, deleteResult} from '../../config/api';
import Swal from 'sweetalert2';

import { TransactionContainer, InputBoxContainer,
    InputTitleContainer, InputContainer,
    InputErrorContainer, InputTextBoxContainer, 
    InputTextAreaContainer,
    SaveTransactionButton,
    Button
    } from './transaction.styles';

class Transaction extends React.Component {
    constructor(props){
        super(props);
        const {type, id} = this.props.match.params;
        this.state = {
            t_id:null,
            edit:id && type,
            amount:'',
            amountError:'',
            date: new Date(),
            previousDate: new Date(),
            expenseCategories : [],
            incomeCategories : [],
            category : '',
            categoryError:'',
            categorySection:'',
            description:''
        }
    }

    async componentDidMount(){
        const {type, id} = this.props.match.params;
        if( id && type) {
            const response  = await Promise.all([getResults('category'), getResults('transaction/'+type+'/single/'+id)]);
            const { incomeCategories, expenseCategories } = response[0];
            const { transaction } = response[1];
            const {_id, amount, date, category, description } = transaction;
            this.setState({incomeCategories, expenseCategories ,amount : amount.toString(),date: new Date(date), category, categorySection:type, description, t_id:_id, edit:true});
        }       
        else{
            const result = await getResults('category');
            this.setState({incomeCategories : result.incomeCategories, expenseCategories:result.expenseCategories, t_id:null, edit:false});    
        }
    }


    handleClick = (e) => {
        if(e.target.value!==undefined)
            this.setState({category:e.target.value, categorySection:e.target.dataset.category, categoryError:''});            
    }

    handleAmountChange = (e) =>{
        if(e.target.dataset.number!==undefined){
            if(isNaN(e.target.value)){
                const value = e.target.value;
                const len = value.length;
                const newValue = value.substring(0,len-1);
                this.setState({amount:newValue, amountError:''});
            }
            else{
                this.setState({amount:e.target.value, amountError:''})
            }
        }
    } 

    onDateChange = (date) =>{ 
        if(date===null)
            this.setState({date:this.state.previousDate})
        else
            this.setState({ date, previousDate:date})
    };

    handleTextChange = (e) => {
        this.setState({description:e.target.value});
    }

    handleSuccessMessage = (msg) => {
        Swal.fire(
            'Success!',
            msg,
            'success'
        ).then(()=> this.props.history.push('/dashboard'));
    } 

    handleFailureMessage = (msg) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
            footer:'Try Again'
          });
    }

    handleSubmit = async () => {
        let flag = false;
        if(this.state.category.length===0){
            this.setState({categoryError:'*category required'});
            flag = true;
        }
        if(this.state.amount.length===0){
            this.setState({amountError:'*amount required'});
            flag = true;
        }
        if(flag===false){
            const { date, category, categorySection, amount, description, edit} = this.state;
            const {type, id} = this.props.match.params;
            const newDate = new Date(date);
            const day = newDate.getDate();
            const month = newDate.getMonth()+1;
            const year = newDate.getFullYear();
            if(edit){
                if(type===categorySection){
                   const result = await updateResults({type,category,date,day,month,year,description,amount:Number(amount),
                    },`transaction/${categorySection}/${id}`);
                    if(result.error)
                        this.handleFailureMessage('Transaction could not be updated!');
                    else
                        this.handleSuccessMessage('Transaction Updated');
                }
                else{
                    const response = await Promise.all([
                        deleteResult(`transaction/${type}/${id}`),
                        postResults({category,date,day,month,year,description,amount:Number(amount)},`transaction/${categorySection}`)
                    ]);
                    if(response[0].error || response[1].error)
                        this.handleFailureMessage('Transaction could not be updated!');
                    else
                        this.handleSuccessMessage('Transaction Updated');
                }
            }
            else{
                const result = await postResults({category,date,day,month,year,description,amount:Number(amount)},
                `transaction/${categorySection}`);
                if(result.error)
                    this.handleFailureMessage('Transaction could not be added!');
                else{
                    await Swal.fire(
                        'Success!',
                        'Transaction Added',
                        'success'
                    );       
                    this.setState({
                        date: new Date(),
                        amount:'',
                        amountError:'',
                        previousDate: new Date(),
                        category : '',
                        categoryError:'',
                        categorySection:'',
                        description:''
                    },()=>this.props.history.push('/dashboard'));
                }
            }
        }
    }
    handleDelete = async () => {
        const {type, id} = this.props.match.params;
        const result = await deleteResult(`transaction/${type}/${id}`);
        if(result.error)
            this.handleFailureMessage('Transaction could not be deleted!');
        else
            this.handleSuccessMessage('Transaction deleted');
    }

    render(){
        const { t_id, date, category, categorySection, incomeCategories, expenseCategories, amountError, categoryError, description, edit } = this.state
        return(
            <TransactionContainer>
                <InputBoxContainer>
                    <InputTitleContainer>Category</InputTitleContainer>
                    <CategoryModal
                        handleClick = {(e) => this.handleClick(e)}
                        category = {category} 
                        categorySection = {categorySection} 
                        incomeCategories = {incomeCategories} 
                        expenseCategories = {expenseCategories}
                        placeholder="Select Category >"
                    />
                </InputBoxContainer>
                {
                    categoryError.length > 0 ? <InputErrorContainer>{categoryError}</InputErrorContainer> : null
                }
                <InputBoxContainer>
                    <InputTitleContainer>Amount</InputTitleContainer>
                    <InputContainer maxLength="10" value={this.state.amount} onChange={this.handleAmountChange} type="text" data-number id="amount" placeholder="Enter Amount"/>
                </InputBoxContainer>   
                {
                    amountError.length > 0 ? <InputErrorContainer>{amountError}</InputErrorContainer> : null
                }
                <InputBoxContainer>
                    <InputTitleContainer>Date</InputTitleContainer>
                    <DatePicker onChange={this.onDateChange} value={date}/>
                </InputBoxContainer>
                <InputTextBoxContainer>
                    <InputTitleContainer>Description</InputTitleContainer>
                    <InputTextAreaContainer value={description} onChange={(e) => this.handleTextChange(e)} maxLength="500" placeholder="Note..."/>
                </InputTextBoxContainer>
                { edit ? null : <SaveTransactionButton onClick={this.handleSubmit}>Save Transaction</SaveTransactionButton>}

                { edit ? 
                    <Fragment>
                        <Button b_type="update" onClick={this.handleSubmit} type="button" id={t_id}>Update</Button>                
                        <Button b_type="delete" onClick={this.handleDelete} type="button" id={t_id}>Delete</Button>
                    </Fragment> : null
                }
            </TransactionContainer>
        )
    }
}

export default Transaction