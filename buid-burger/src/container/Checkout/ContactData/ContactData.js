import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalcode: ''
    },
    loading: false,
  }

  orderSubmitHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed, 
      // in a real project, it need to be calculated on
      // the server for security
      customer: {
        name: "Jonas Lopes",
        address: {
          street: 'Teststreet',
          zipCode: '41542',
          country: 'Brazil'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    // send to firebase database
    axios.post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  render () {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
        <input className={classes.Input} type="email" name="street" placeholder="Street" />
        <input className={classes.Input} type="email" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderSubmitHandler}>ORDER NOW</Button>
      </form>
    );
    if ( this.state.loading ) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter yout Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;