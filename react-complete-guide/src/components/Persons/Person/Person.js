import React, { Component } from 'react'
// we aren't using classes so we don't need to import Component of React
import classes from './Person.css'

class Person extends Component{
    
    render() {
        console.log('[Person.js] rendering...');
        return (
            <div className={classes.Person}>
                <p onClick={this.props.click}> 
                    I'm {this.props.name} and I am {this.props.age} years old 
                </p> 
                <p>{this.props.children}</p>
                <input
                    type="text" 
                    onChange={this.props.changed}
                    value={this.props.name}/>
            </div>
        )
    }
    // const rnd = Math.random();

    // if (rnd > 0.7) {
    //     throw new Error( 'Something went wrong' );
    // } - just to throw an error and testint the ErrorBoundary
}

export default Person;