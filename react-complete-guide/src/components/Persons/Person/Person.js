import React from 'react'
// we aren't using classes so we don't need to import Component of React
import classes from './Person.css'

const person = (props) => { 
    // const rnd = Math.random();

    // if (rnd > 0.7) {
    //     throw new Error( 'Something went wrong' );
    // } - just to throw an error and testint the ErrorBoundary
    console.log('[Person.js] rendering...');
    return (
        <div className={classes.Person}>
            <p onClick={props.click}> I'm {props.name} and I am {props.age} years old </p> 
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
}

export default person;