import React, { PureComponent } from "react";

import Person from "./Person/Person";


class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //     console.log('[Persons.js] getDerivedStateFromProps');
  //     return state;
  // }

  // componentWillReceiveProps(props) {
  //     console.log('[Persons.js] componentWillReceiveProps', props);
  // } - not suported anymore in modern projects

  // componentWillUpdate() {

  // } - not suported anymore in modern projects

  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log('[Persons.js] shouldComponentUpdate');
  //     if (nextProps.persons !== this.props.persons ||
  //         nextProps.changed !== this.props.changed ||
  //         nextProps.clicked !== this.props.clicked) {
  //         return true;
  //     }
  //     return false;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return { message: "Snapshot!" };
  }

  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate");
    console.log(snapshot);
  }

  render() {
    console.log("[Persons.js] rendering...");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          name={person.name}
          age={person.age}
          click={() => this.props.clicked(index)}
          changed={event => this.props.changed(event, person.id)}
          key={person.id}
        />
      );
    });
  }
}

export default Persons;
