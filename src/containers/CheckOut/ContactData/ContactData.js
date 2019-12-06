import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Loader from '../../../components/UI/Spinner/Spinner'

class ContactData extends React.Component{


    state={
        name:'charles',
        address:{
            street:'www',
            zipcode:'123123',
            country:"asd"
        },
        email:"asd@asd.com",
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'charlesasd',
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
            this.setState({loading:false})
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({loading:false})
        })
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="postcode" placeholder="Your postcode"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading){
            form = <Loader/>
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


export default ContactData;
