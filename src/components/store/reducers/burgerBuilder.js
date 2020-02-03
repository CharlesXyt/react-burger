import * as actionType from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState ={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false
}

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

const addIngredient = (state,action) => {
    const updateIngredient = { [action.ingredientName]:state.ingredients[action.ingredientName] + 1}
    const updateIngredients = updateObject(state.ingredients,updateIngredient)
    const updatedState = {
        ingredients:updateIngredients,
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObject(state,updatedState);
} 

const removeIngredient = (state,action) => {
    const updateIngredient = { [action.ingredientName]:state.ingredients[action.ingredientName] - 1}
    const updateIngredients = updateObject(state.ingredients,updateIngredient)
    const updatedState = {
        ingredients:updateIngredients,
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObject(state,updatedState);
}

const setIngredients = (state,action) => {
    return updateObject(state,{
        ingredients:{
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat,
        },
        error:false,
        totalPrice:4,
        building:false
    })
}

const fetchIngredient = (state,action) => updateObject(state,{error:true})

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionType.ADD_INGREDIENTS:
            return addIngredient(state,action)
        case actionType.REMOVE_INGREDIENTS:
            return removeIngredient(state,action)
        case actionType.SET_INGREDIENTS:
            return setIngredients(state,action)
        case actionType.FETCH_INGREDIENTS_FAILED:
            return fetchIngredient(state,action)
        default:
            return state;
    }

}


export default reducer;