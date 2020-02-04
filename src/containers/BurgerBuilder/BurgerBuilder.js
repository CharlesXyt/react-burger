import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandle'
import {connect } from 'react-redux'
import * as actions from '../../components/store/actions/index'





class BurgerBuilder extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            purchasing:false,
        }
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients).reduce((sum,el)=>{
            return sum + ingredients[el]
        },0)
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing:true
            })
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
    }
    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null

        
        let burger = this.props.error ? <p>ingredients cannot be loaded</p> : <Loader/>

        if(this.props.ings){
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuilderControls 
                        clickedAdd={this.props.onIngredientAdded} 
                        clickedRemove={this.props.onIngredientRemoved} 
                        disableInfo={disableInfo} 
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </React.Fragment>
            )
            orderSummary = <OrderSummary totalPrice={this.props.totalPrice} ingredients={this.props.ings} purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>
        }
                

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
                
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        error:state.error,
        isAuthenticated:state.auth.token !== null
        
    }
}

const mapDispatchToState = dispatch =>{
    return {
        onIngredientAdded :(ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved :(ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:() => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)) 
    }
}




export default connect(mapStateToProps,mapDispatchToState)(withErrorHandler(BurgerBuilder,axios));