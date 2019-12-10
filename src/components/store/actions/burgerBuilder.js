import * as actionTypes from './actionTypes'
import axios from '../../../axios-orders'


export const addIngredient = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName:name
    }
} 

export const removeIngredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:name
    }
} 

export const setIngredient = (Ingredient) => {
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:Ingredient
    };
} 

export const fetchIngredientsFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(res => {
            dispatch(setIngredient(res.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    };
} 