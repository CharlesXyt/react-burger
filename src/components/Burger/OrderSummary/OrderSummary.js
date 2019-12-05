import React ,{Component}from 'react'
import Button from '../../UI/Button/Button'


class OrderSummary extends Component{



    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igkey =>{
            return (
                <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>:{this.props.ingredients[igkey]}</li>
            )
        })
        return(
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:{this.props.totalPrice.toFixed(2)}</strong></p>
                <p>continue to check out?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </React.Fragment>
        )

    }
}

    


export default OrderSummary;