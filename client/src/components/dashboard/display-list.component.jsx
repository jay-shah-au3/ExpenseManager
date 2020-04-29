import React from 'react';
import Moment from 'react-moment';
import { ListContainer, TextContainer, ListText, ListTextAmount,
    CardContainer, CardDate
} from './display-list.styles.js';

function DisplayList({transactions, newKey, onHandleClick}){
    return(
        transactions.map(item => {
            const color = item.totalAmount > 0 && newKey !=='expense' ? '#42DE90' : '#e72438';
            return(                
                <CardContainer key={`${item.transactions[0].date} ${newKey}`}>
                    <CardDate>
                        <Moment format="DD/MM/YYYY" date={item.transactions[0].date}/>
                        <ListTextAmount><span style={{color:color, marginRight:'10px' , float:'right'}}>₹{item.totalAmount}</span></ListTextAmount>
                    </CardDate>
                    {
                        item.transactions.map((t)=>{
                            return(
                                <ListContainer onClick = {onHandleClick} id={t.t_id} data-category = {t.type} key={`${t.t_id} ${newKey}`}>
                                    <TextContainer type={t.type}>
                                        <ListText>{t.category} <ListTextAmount>₹{t.amount}</ListTextAmount></ListText>
                                        {/* <ListText>{t.description}</ListText> */}
                                    </TextContainer>
                                </ListContainer>
                            )
                        })
                    }
                </CardContainer>
            )                           
        })
    )
}

export default DisplayList;