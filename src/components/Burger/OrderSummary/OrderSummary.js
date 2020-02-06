import React from 'react'
import Button from '../../UI/Button/Button'


const OrderSummary = props => {




    const ingredientSummary = Object.keys(props.ingredients).map(igkey =>{
        return (
            <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>:{props.ingredients[igkey]}</li>
        )
    })
    return(
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{props.totalPrice.toFixed(2)}</strong></p>
            <p>continue to check out?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </React.Fragment>
    )


}

    


export default OrderSummary;