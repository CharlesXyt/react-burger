import React ,{ Component }from 'react'
import Modal from '../../UI/Modal/Modal'

const withErrorHandler = (Wrapper,axios) => {
    return class extends Component{

        constructor(props){
            super(props)
            this.state = {
                error:null
            }
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error:null
                })
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                this.setState({error:error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmHandler = () => {
            this.setState({
                error:null
            })
        }

        render(){
            return(
                <React.Fragment>
                <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
                    {this.state.error ? this.state.error.message:null}
                </Modal>
                <Wrapper {...this.props}/>
            </React.Fragment>
            );
        }
    }
}


export default withErrorHandler;