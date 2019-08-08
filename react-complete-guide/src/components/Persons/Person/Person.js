import React, { Component } from "react";
import PropTypes from "prop-types";
// we aren't using classes so we don't need to import Component of React
import classes from "./Person.css";
import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }
 
  render() {
    console.log("[Person.js] rendering...");
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated</p> 
        ) : (
           <p>Please Log in</p>
        )}
      

        <div className={classes.Person}>
          <p onClick={this.props.click}>
            I'm {this.props.name} and I am {this.props.age} years old
          </p>
          <p>{this.props.children}</p>
          <input
            type="text"
            // ref={(inputEl) => {this.inputElement = inputEl}}
            ref={this.inputElementRef}
            onChange={this.props.changed}
            value={this.props.name}
          />
        </div>
      </Aux>
    );
  }
  // const rnd = Math.random();

  // if (rnd > 0.7) {
  //     throw new Error( 'Something went wrong' );
  // } - just to throw an error and testint the ErrorBoundary
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);
