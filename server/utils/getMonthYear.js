const getMonthYear = (type) => {
    let month = null;
    let year = null;
    if(type==='current'){
        month = new Date().getMonth()+1;            
        year = new Date().getFullYear();
    }
    else{
        month = new Date().getMonth();
        if(month === 0){   
            month = 12;
            year = new Date().getFullYear()-1;
        }
        else
            year = new Date().getFullYear();
    }            
    return {
        month,
        year        
    }
}

module.exports = getMonthYear;