import React from 'react';
import ReactExport from "react-data-export";
import moment from 'moment';
import Card from './card.component';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExcelFileSheet({data, filename, image, sheetname, displayname}){
    return(
        <ExcelFile filename={filename} element={<Card image = {image} name={displayname}/>} >
            <ExcelSheet data={data} name={sheetname}>
                <ExcelColumn label="Type" value="type"/>
                <ExcelColumn label="Category" value="category"/>
                <ExcelColumn label="Description" value="description"/>
                <ExcelColumn label="Date" value = { (item) => moment.utc(new Date(item["date"])).local().format('DD-MM-YYYY')} />
                <ExcelColumn label="Amount" value= {(item) => filename==='Transactions' && item.type==='expense' ? (item.amount*(-1)) : item.amount}/>
            </ExcelSheet>
        </ExcelFile>
    )
}

export default ExcelFileSheet;