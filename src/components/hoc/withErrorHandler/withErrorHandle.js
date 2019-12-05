import React from 'react'
import Modal from '../../UI/Modal/Modal'

const withErrorHandler = (Wrapper,axios) => {
    return (props) => {
        return (
            <React.Fragment>
                <Modal show>
                    Something didn't work
                </Modal>
                <Wrapper {...props}/>
            </React.Fragment>
        )
    }
}


export default withErrorHandler;