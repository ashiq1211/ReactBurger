import React from 'react';
import './Input.css'
const input = (props) => {
    const classes=['InputElement']
    if(props.invalid && props.shouldValidate && props.touched ){
        classes.push('Invalid')
    }
    let inputElement=null
    switch (props.elementType) {
        case ('input'):
            inputElement=<input className={classes.join(' ')} {...props.elementConfig} value={props.value} onch onChange={props.changed}></input>
            break;
        case ('textarea'):
            inputElement=<textarea className={classes.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}></textarea>
            break;
        case ('select'):
                inputElement=<select className='InputElement' name='select' value={props.value} onChange={props.changed}>
                     <option selected disabled>Delivery Options</option>
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value} value={option.value}>{option.displayValue} </option>
                    ))}
                </select>
                break;
        default:
           
            inputElement=<input className={classes.join(' ')} {...props.elementConfig} value={props.value}></input>
            
            break;
    }
    return ( 
        <div className='Input'>
            <label className='Label'></label>
            {inputElement}
        </div>
     );
}
 
export default input;