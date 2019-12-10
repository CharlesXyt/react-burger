import React,{Component} from 'react'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class CheckOut extends Component{

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued =() => {
        this.props.history.replace('/checkout/contact-data');

    }


    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ingredients){
            
            const puchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null
            summary =(
                <div>
                    {puchasedRedirect}
                    <CheckOutSummary checkoutCancelled={this.checkoutCancelled} checkoutContinued={this.checkoutContinued} ingredients={this.props.ingredients}/>
                    <Route path={this.props.match.path + "/contact-data"} 
                    component={ContactData}/>
                </div>
            )
        }
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