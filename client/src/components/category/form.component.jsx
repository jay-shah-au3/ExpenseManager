import React from 'react';
import { FormContainer, SelectOptionConatiner,
    SelectContainer, InputDivContainer, InputContainer, Button
} from './category.styles.js';

function Form({handleSubmit, handleChange ,allCategories, type, category, error, show, button_type}){
    return(
        <FormContainer onSubmit={handleSubmit}>
            <SelectOptionConatiner onChange={handleChange}>
                <SelectContainer id="cat_type" name="type">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </SelectContainer>
            </SelectOptionConatiner>
            {
                show ?
                    allCategories.length > 0 ? 
                    <SelectOptionConatiner onChange={handleChange}>
                        <SelectContainer name="deleteCategory">
                            {
                                allCategories.map( (cat) => {
                                    return(
                                        <option value= {cat} key={cat+type}>{cat}</option>
                                    )
                                })
                            }
                        </SelectContainer>
                    </SelectOptionConatiner>
                    :
                    <InputContainer value={"No "+type+" categories"} type="text" disabled/>
                :
                <InputDivContainer>
                    <InputContainer name="category" value={category} onChange={handleChange} type="text" maxLength="30" placeholder="Category(max 30 characters)" required/>
                    {error.length > 0 ? <p style={{color:'red', fontSize:"0.9em"}}>{error}</p> : null}
                </InputDivContainer>
            }
            <Button type="submit" btn_type={button_type}>{button_type}</Button>
        </FormContainer>        
    )    
}

export default Form;