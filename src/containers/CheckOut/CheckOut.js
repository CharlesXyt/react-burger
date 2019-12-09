import React,{Component} from 'react'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import {Route} from 'react-router-dom'
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
        return(
            <div>
                <CheckOutSummary checkoutCancelled={this.checkoutCancelled} checkoutContinued={this.checkoutContinued} ingredients={this.props.ingredients}/>
                <Route path={this.props.match.path + "/contact-data"} 
                component={ContactData}/>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return{
        ingredients:state.ingredients
       
    }
    
}



export default connect(mapStateToProps)(CheckOut);