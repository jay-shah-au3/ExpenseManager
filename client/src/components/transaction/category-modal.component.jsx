import React, { Fragment } from 'react';
import NavCategoryList from './nav-list.component';
import { ModalContainer, ModalInput, ModalDialog, ModalContent,
    ModalHeader, ModalTitle, ModalClose, ModalBody,
    ModalNavTab, ModalNavTabTitle, ModalNavTabLink, ModalNavTabContent, ModalFooter, 
    ModalNavTabList
} from './category-modal.styles.js';

class CategoryModal extends React.Component {    
    render(){
        const {incomeCategories, expenseCategories, category, placeholder, handleClick} = this.props;
        return(
        <Fragment>
            <ModalInput
                type="search" 
                readOnly
                className="btn"
                data-toggle="modal" 
                data-target="#exampleModalCenter"
                placeholder = { placeholder }
                value={ category }
            />
                    
            <ModalContainer className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <ModalDialog className="modal-dialog modal-lg" role="document">
                    <ModalContent className="modal-content">
                        <ModalHeader className="modal-header">
                            <ModalTitle className="modal-title" id="exampleModalLongTitle">Select Category</ModalTitle>
                            <ModalClose type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </ModalClose>
                        </ModalHeader>
                        <ModalBody className="modal-body">
                            <ModalNavTab>
                                <ModalNavTabTitle className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <ModalNavTabLink className="nav-item nav-link active" id="nav-expense-tab" data-toggle="tab" href="#nav-expense" role="tab" aria-controls="nav-expense" aria-selected="true">Expense</ModalNavTabLink>
                                    <ModalNavTabLink className="nav-item nav-link" id="nav-income-tab" data-toggle="tab" href="#nav-income" role="tab" aria-controls="nav-income" aria-selected="false">Income</ModalNavTabLink>
                                </ModalNavTabTitle>
                            </ModalNavTab>
                            <ModalNavTabContent className="tab-content" id="nav-tabContent">
                                <ModalNavTabList onClick={handleClick} data-dismiss="modal" className="tab-pane fade show active" id="nav-expense" role="tabpanel" aria-labelledby="nav-expense-tab">
                                    <NavCategoryList data = {expenseCategories} type="expense"/>
                                </ModalNavTabList>
                                <ModalNavTabList onClick={handleClick} data-dismiss="modal" className="tab-pane fade" id="nav-income" role="tabpanel" aria-labelledby="nav-income-tab">
                                    <NavCategoryList data = {incomeCategories} type="income"/>
                                </ModalNavTabList>
                            </ModalNavTabContent>
                        </ModalBody>
                        <ModalFooter className="modal-footer">
                        </ModalFooter>
                    </ModalContent>
                </ModalDialog>
            </ModalContainer>                
        </Fragment>
        )
    }
}

export default CategoryModal;