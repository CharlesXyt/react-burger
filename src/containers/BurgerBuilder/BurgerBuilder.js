import React,{useState,useEffect} from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandle'
import {connect } from 'react-redux'
import * as actions from '../../components/store/actions/index'





const BurgerBuilder = props => {

    const [purchasing,setPurchasing] = useState(false)

    const {onInitIngredients} = props

    useEffect(()=>{
       onInitIngredients()
    },[onInitIngredients])

    const updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients).reduce((sum,el)=>{
            return sum + ingredients[el]
        },0)
        return sum > 0;
    }

    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true)
        }else{
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
        
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout');
    }

    const disableInfo = {
        ...props.ings
    };
    for (let key in disableInfo){
        disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null

    
    let burger = props.error ? <p>ingredients cannot be loaded</p> : <Loader/>

    if(props.ings){
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ings}/>
                <BuilderControls 
                    clickedAdd={props.onIngredientAdded} 
                    clickedRemove={props.onIngredientRemoved} 
                    disableInfo={disableInfo} 
                    price={props.totalPrice}
                    purchasable={updatePurchaseState(props.ings)}
                    purchasing={purchaseHandler}
                    isAuth={props.isAuthenticated}
                />
            </React.Fragment>
        )
        orderSummary = <OrderSummary totalPrice={props.totalPrice} ingredients={props.ings} purchaseCancelled={purchaseCancelHandler} purchaseContinued={purchaseContinueHandler}/>
    }
            

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {orderSummary}
            </Modal>
            {burger}
            
        </React.Fragment>
    );

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