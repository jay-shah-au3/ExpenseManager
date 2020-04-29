import React from 'react';

function Selection({handleSelectionChange}){
    return(
        <div onChange={handleSelectionChange} style={{textAlign:"center", marginTop:"15px", marginBottom:"5px"}}>
            <select id="date">
                <option value="this_month">This Month</option>
                <option value="past_month">Past Month</option>
                <option value="all_years">All Years</option>
                <option value="custom_date">Custom Date</option>
            </select>
        </div>
    )
}

export default Selection;