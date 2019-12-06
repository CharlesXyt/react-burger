import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Loader from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends React.Component{


    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your name'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your street'
                },
                value:''
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your zipcode'
                },
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your country'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
                value:''
            },
            deliverMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:''
            }
        },
        loading:false   
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
             
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

    inputChangedHandler =(event,inputIdentifier) => {

        const updatedForm ={
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedForm[inputIdentifier] = updatedFormElement
        this.setState({
            orderForm:updatedForm
        })
    }


    render(){

        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form>
                {formElementArray.map(el => (<Input changed={(event) => this.inputChangedHandler(event,el.id)} key={el.id} elementType={el.config.elementType} elementConfig={el.config.elementConfig} value={el.config.value} />))}
                
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
