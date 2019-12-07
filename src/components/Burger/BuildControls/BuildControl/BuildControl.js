import React from 'react'
import classes from './BuildControl.module.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={() => props.clickedRemove(props.type)} disabled={props.disabled}>LESS</button>
            <button className={classes.More} onClick={() => props.clickedAdd(props.type)}>MORE</button>
        </div>
    );
    

}

export default buildControl;