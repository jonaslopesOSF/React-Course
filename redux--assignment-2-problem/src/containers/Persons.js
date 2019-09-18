import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';


class Persons extends Component {

    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddPerson} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onDeletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    persons: state.persons
  }
}

const mapDispatcherToProps = dispatch => {
  return {
    onAddPerson: () => dispatch({type: actionTypes.ADD_PERSON}),
    onDeletePerson: (id) => dispatch({type: actionTypes.DELETE_PERSON, personId: id})
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(Persons);