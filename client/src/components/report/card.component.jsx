import React from 'react';
import { ReportColumnContainer, ReportCardContainer,
    ImageContainer, Image, Button, CardFooter
} from './report.styles.js';

function Card({image, name}){
    return(
        <ReportColumnContainer>
            <ReportCardContainer>
                <ImageContainer>
                    <Image image = {image}/>
                </ImageContainer>
                <CardFooter>
                    <span>{name}</span>                                    
                    <Button><i className="fa fa-download" aria-hidden="true"></i></Button>  
                </CardFooter>    
            </ReportCardContainer>                  
        </ReportColumnContainer>                    
    )
}

export default Card;