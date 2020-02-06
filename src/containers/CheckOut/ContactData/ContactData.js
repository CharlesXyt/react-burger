import React,{useState} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Loader from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandle'
import * as actions from '../../../components/store/actions/index'

const ContactData = props => {

    const [formState,setFormState] = useState({
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'your name'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:3,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'your street'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:3,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                zipcode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'your zipcode'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:3,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'your country'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:3,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'your email'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:3
                    },
                    valid:false,
                    touched:false
                },
                deliverMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    validation:{},
                    value:'fastest',
                    valid:true,
                }
            })
    const [formIsValid,setformIsValid] = useState(false)


    const checkValidity = (value,rules) => {
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in formState){
            formData[formElementIdentifier] =formState[formElementIdentifier].value
        }
        const order = {
            ingredients:props.ingredients,
            price:props.totalPrice,
            orderData:formData,
            userId:props.userId
             
        }
        props.onOrderBurger(order,props.token)
        
    }

    const inputChangedHandler =(event,inputIdentifier) => {

        const updatedForm ={
            ...formState
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true
        updatedForm[inputIdentifier] = updatedFormElement
        let formIsValid = true
        for (let inputIdentifierElement in updatedForm){
            formIsValid = updatedForm[inputIdentifierElement].valid && formIsValid
        }

        setFormState(updatedForm)
        setformIsValid(formIsValid)
    }




    const formElementArray = [];
    for(let key in formState){
        formElementArray.push({
            id:key,
            config:formState[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementArray.map(el => (<Input 
            shouldValidate={el.config.validation}
            inValid={!el.config.valid}
            touched={el.config.touched}
            changed={(event) => inputChangedHandler(event,el.id)} 
            key={el.id} 
            elementType={el.config.elementType} 
            elementConfig={el.config.elementConfig} 
            value={el.config.value} 
            />))}
            
            <Button btnType="Success" disabled={!formIsValid}>Order</Button>
            {formIsValid}
        </form>
    );
    if (props.loading){
        form = <Loader/>
    }
    
    return(
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );

}


const mapStateToProps = state => {
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
    
}


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger:(orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
