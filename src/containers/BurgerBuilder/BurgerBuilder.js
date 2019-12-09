import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandle'
import {connect } from 'react-redux'
import * as actionType from '../../components/store/actions'



class BurgerBuilder extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            purchasing:false,
            loading:false,
            error:false
        }
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        // .then(res => {
        //     this.setState({ingredients:res.data})
        // })
        // .catch(error => {this.setState({error:error})})
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
        this.setState({
            purchasing:true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {

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

        
        let burger = this.state.error ? <p>ingredients cannot be loaded</p> : <Loader/>

        if(this.props.ings){
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuilderControls clickedAdd={this.props.onIngredientAdded} clickedRemove={this.props.onIngredientRemoved} disableInfo={disableInfo} 
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                    />
                </React.Fragment>
            )
            orderSummary = <OrderSummary totalPrice={this.props.totalPrice} ingredients={this.props.ings} purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>
        }
        if(this.state.loading){
            orderSummary = <Loader/>
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
        ings:state.ingredients,
        totalPrice:state.totalPrice
    }
}

const mapDispatchToState = dispatch =>{
    return {
        onIngredientAdded :(ingName) => dispatch({type:actionType.ADD_INGREDIENTS,ingredientName:ingName}),
        onIngredientRemoved :(ingName) => dispatch({type:actionType.REMOVE_INGREDIENTS,ingredientName:ingName})
    }
}




export default connect(mapStateToProps,mapDispatchToState)(withErrorHandler(BurgerBuilder,axios));