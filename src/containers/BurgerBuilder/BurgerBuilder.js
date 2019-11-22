import React from 'react'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            
        }
    }

    render(){
        return (
            <React.Fragment>
                <Burger/>
                <div>Builder Control</div>
            </React.Fragment>
        );
    }
}


export default BurgerBuilder;