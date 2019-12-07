import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'

class BurgerBuilder extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            ingredients:{
                salad:0,
                bacon:0,
                cheese:0,
                meat:0
            }
            
        }
    }

    render(){
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls/>
            </React.Fragment>
        );
    }
}


export default BurgerBuilder;