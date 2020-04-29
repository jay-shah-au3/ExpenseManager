import React from 'react';
import { CategoryButton } from './category-modal.styles.js';

function NavCategoryList({data, type}) {
    return (
        data.map(cat => {
            return(
                <CategoryButton data-category={type} value={cat} key={cat}>{cat}</CategoryButton>
            )
        })
    )
}

export default NavCategoryList;