import React from 'react'
import classes from './BurgerIngredient.module.css'




const burgerIngrendient = (props) => {
    let ingredient = null;

    switch (props.type){
        case('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        case('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;
        default:
            ingredient = null;
            break;
    }
    return ingredient;

}


<<<<<<< HEAD
=======
burgerIngrendient.propTypes={
    type:PropTypes.string.isRequired
>>>>>>> 5f0b4ec08df48ca6a12a49d12a1ad2d31d342314



export default burgerIngrendient;