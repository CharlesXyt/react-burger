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
                value:'',
                validation:{
                    required:true
                },
                valid:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your zipcode'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false
            },
            deliverMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'',
                valid:false
            }
        },
        loading:false   
    }


    checkValidity = (value,rules) => {
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= maxLength && isValid
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] =this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:formData
             
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
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
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(el => (<Input changed={(event) => this.inputChangedHandler(event,el.id)} key={el.id} elementType={el.config.elementType} elementConfig={el.config.elementConfig} value={el.config.value} />))}
                
                <Button btnType="Success">Order</Button>
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
