import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandle'


const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}


class BurgerBuilder extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            ingredients:{
                salad:0,
                bacon:0,
                cheese:0,
                meat:0
            },
            totalPrice:4,
            purchasable:false,
            purchasing:false,
            loading:true
        }
    }

    updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients).reduce((sum,el)=>{
            return sum + ingredients[el]
        },0)
        console.log(sum)
        this.setState({
            purchasable:sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const oldPrice = this.state.totalPrice
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type]
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount -1
        const oldPrice = this.state.totalPrice
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const updatedPrice = oldPrice - INGREDIENT_PRICES[type]
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        // alert('asd')
        const order = {
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'charles',
                address:{
                    street:'www',
                    zipcode:'123123',
                    country:"asd"
                },
                email:"asd@asd.com"
            }    
        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading:false,purchasing:false})
        })
        .catch(error => {
            this.setState({loading:false})
        })

    }
    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = <OrderSummary totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>

        if(this.state.loading){
            orderSummary = <Loader/>
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls clickedAdd={this.addIngredientHandler} clickedRemove={this.removeIngredientHandler} disableInfo={disableInfo} 
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                purchasing={this.purchaseHandler}
                />
                
            </React.Fragment>
        );
    }
}


export default withErrorHandler(BurgerBuilder);