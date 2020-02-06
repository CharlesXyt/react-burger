import React,{useState,useEffect,useCallback} from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandle'
import {useDispatch,useSelector } from 'react-redux'
import * as actions from '../../components/store/actions/index'





const BurgerBuilder = props => {

    const [purchasing,setPurchasing] = useState(false)


    const dispatch = useDispatch()

    const onIngredientAdded  = (ingName) => dispatch(actions.addIngredient(ingName))
    const onIngredientRemoved  = (ingName) => dispatch(actions.removeIngredient(ingName))
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredient()),[dispatch])
    const onInitPurchase = () => dispatch(actions.purchaseInit())
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path)) 

    const ings = useSelector(state => state.burgerBuilder.ingredients)
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
    const error = useSelector(state => state.error)
    const isAuthenticated = useSelector(state => state.auth.token !== null)

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
        if(isAuthenticated){
            setPurchasing(true)
        }else{
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
        
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase()
        props.history.push('/checkout');
    }

    const disableInfo = {
        ...ings
    };
    for (let key in disableInfo){
        disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null

    
    let burger = error ? <p>ingredients cannot be loaded</p> : <Loader/>

    if(ings){
        burger = (
            <React.Fragment>
                <Burger ingredients={ings}/>
                <BuilderControls 
                    clickedAdd={onIngredientAdded} 
                    clickedRemove={onIngredientRemoved} 
                    disableInfo={disableInfo} 
                    price={totalPrice}
                    purchasable={updatePurchaseState(ings)}
                    purchasing={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </React.Fragment>
        )
        orderSummary = <OrderSummary totalPrice={totalPrice} ingredients={ings} purchaseCancelled={purchaseCancelHandler} purchaseContinued={purchaseContinueHandler}/>
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





export default withErrorHandler(BurgerBuilder,axios);