import React from 'react'
import Swal from 'sweetalert2';
import { getResults, updateResults, deleteResult} from '../../config/api';
import Form from './form.component';
import { CategoryContainer, SelectContainer } from './category.styles.js';
class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            button_type : 'Add', 
            type:'expense',
            category : '',            
            show : false,
            allCategories : [],
            deleteCategory : '',
            error:''
        }
    }

    async componentDidMount(){
        const response  = await (getResults('category'));
        const { expenseCategories ,incomeCategories, 
            getUserExpenseCategories, getUserIncomeCategories, 
            defaultExpenseCategories, defaultIncomeCategories} = response;
        this.setState({
            expenseCategories ,incomeCategories, 
            getUserExpenseCategories, getUserIncomeCategories, 
            defaultExpenseCategories, defaultIncomeCategories
        });
    }

    handleSuccessMessage = (msg) => {
        Swal.fire(
            'Success!',
            msg,
            'success'
        );
    } 

    handleFailureMessage = (msg) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
            footer:'Try Again'
          });
    }


    handleChange = (e) => {
        let { name, value } = e.target;
        const {show} = this.state;
        const obj = {};
        if(name === 'category'){
            let splitString = value.split(' ');
            const len = splitString.length;
            for (var i = 0; i < len; i++) {
                splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);     
            }
            value = splitString.join(' '); 
        }
        else if(show && name==='type'){
            const allCategories = value === 'expense' ? this.state.getUserExpenseCategories : this.state.getUserIncomeCategories;
            obj["allCategories"] = allCategories;
            obj["deleteCategory"] = allCategories.length===0 ? '' : allCategories[0];
        }
        this.setState({[name]:value,...obj, error:''});
    }

    handleButtonChange = (e) => {
        let obj = {};
        const { name, value} = e.target;
        const {type} = this.state;
        const allCategories = type === 'expense' ? this.state.getUserExpenseCategories : this.state.getUserIncomeCategories;
        if(value === 'Delete'){        
            obj["allCategories"] = allCategories;
            obj["show"] = true;
            obj["deleteCategory"] = allCategories.length===0 ? '' : allCategories[0];
        }
        else{
            obj["show"] = false;
        }
        this.setState({[name]:value, ...obj, error:''});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { button_type } = this.state;
        if(button_type === 'Add'){
            let flag = false;
            let error = ''; 
            const { category, type, incomeCategories, expenseCategories, getUserExpenseCategories,
                getUserIncomeCategories} = this.state;
            if(type === 'expense'){
                const expenseDefaultC = expenseCategories.map((cat)=> cat.split(' ').join('').toLowerCase());
                const expenseUserC = getUserExpenseCategories.map((cat)=> cat.split(' ').join('').toLowerCase());
                const checkStr = category.split(' ').join('').toLowerCase();
                if(expenseDefaultC.includes(checkStr)){
                    flag = true;
                    error = "Category exists as Default Expense Category!";
                }
                else if(expenseUserC.includes(checkStr))
                {
                    flag = true;
                    error = "Expense Category exists!";
                }
                if(flag){
                    this.setState({error});
                }
                else{
                    const {expense_categories}  =  await updateResults( {type, category}, 'category');
                    this.setState({ getUserExpenseCategories: expense_categories ,error:'', category:''},
                    ()=>this.handleSuccessMessage('Category Added!'));
                }
            }
            else{
                const incomeDefaultC = incomeCategories.map((cat)=> cat.split(' ').join('').toLowerCase());
                const incomeUserC = getUserIncomeCategories.map((cat)=> cat.split(' ').join('').toLowerCase());
                const checkStr = category.split(' ').join('').toLowerCase();
                if(incomeDefaultC.includes(checkStr)){
                    flag = true;
                    error = "Category exists as Default Income Category!";
                }
                else if(incomeUserC.includes(checkStr))
                {
                    flag = true;
                    error = "Income Category exists!";
                }
                if(flag){
                    this.setState({error});
                }
                else{
                    const { income_categories }  =  await updateResults( {type, category}, 'category');
                    this.setState({getUserIncomeCategories : income_categories ,error:'', category:''},
                    ()=>this.handleSuccessMessage('Category Added!'));
                }
            }
        }
        /*DELETE*/
        else{
            const { deleteCategory, type } = this.state;
            if(deleteCategory!==null && deleteCategory!==undefined && deleteCategory.length>0){
                const {income_categories, expense_categories}  =  await deleteResult('category/'+type+'/'+deleteCategory);
                const obj = {};
                if(type === 'expense'){
                    obj["getUserExpenseCategories"] = expense_categories;
                    obj["allCategories"] = expense_categories;
                    obj["deleteCategory"] = expense_categories.length===0 ? '' : expense_categories[0];
                }
                else{
                    obj["getUserIncomeCategories"] = income_categories;
                    obj["allCategories"] = income_categories;
                    obj["deleteCategory"] = income_categories.length===0 ? '' : income_categories[0];
                }
                this.setState({error:'',...obj}, ()=>this.handleSuccessMessage('Category Deleted!'));
            }
        }
    }
    render(){
        const {button_type, allCategories, show, type, error, category} = this.state;
        return(
            <CategoryContainer>
                <SelectContainer id="btn_type" name="button_type" onChange={e=>this.handleButtonChange(e)}>
                    <option value="Add">Add</option>
                    <option value="Delete">Delete</option>
                </SelectContainer>
                <Form
                handleSubmit = {(e)=>this.handleSubmit(e)} 
                handleChange = {(e)=>this.handleChange(e)}
                type = {type}
                category = {category} 
                error = {error} 
                show = {show} 
                button_type = {button_type}
                allCategories = {allCategories}               
                />
            </CategoryContainer>
        )
    }
}

export default Category;

