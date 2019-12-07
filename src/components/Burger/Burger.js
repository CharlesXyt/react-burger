import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {


    let burgerIngredients = Object.keys(props.ingredients).map((el) => {
        return [...Array(props.ingredients[el])].map((_,i) =>{
            return <BurgerIngredient key={el+i} type={el}/>
        })
    }).reduce((arr,el) =>{
        return arr.concat(el)
    },[])
    if(burgerIngredients.length ===0){
        burgerIngredients=<p>Start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};


export default burger;