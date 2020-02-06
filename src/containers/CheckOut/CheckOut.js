import React from 'react'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

const CheckOut = props => {


    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued =() => {
        props.history.replace('/checkout/contact-data');

    }



    let summary = <Redirect to="/"/>
    if(props.ingredients){
        
        const puchasedRedirect = props.purchased ? <Redirect to='/'/> : null
        summary =(
            <div>
                {puchasedRedirect}
                <CheckOutSummary checkoutCancelled={checkoutCancelled} checkoutContinued={checkoutContinued} ingredients={props.ingredients}/>
                <Route path={props.match.path + "/contact-data"} 
                component={ContactData}/>
            </div>
        )

    return summary
    }
    
}

const mapStateToProps = state => {
    return{
        ingredients:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
       
    }
    
}




export default connect(mapStateToProps)(CheckOut);