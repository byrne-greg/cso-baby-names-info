// Requirements
// SUMMARY: Manage the state and pass modifier functions to child elements

import React, { Component } from "react";
import api from "../api/api";
import BabyNameFilter from "./BabyNameFilter";
import BabyNameDetails from "./BabyNameDetails";
import BabyNameList from "./BabyNameList";

class BabyNameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boysNamesLoaded: false,
      girlsNamesLoaded: false,
      names: [],
      filteredNames: [],
      nameInFocus: null
    };

    this.setNameInFocus = this.setNameInFocus.bind(this);
    this.unfilterNames = this.unfilterNames.bind(this);
    this.filterNamesByGender = this.filterNamesByGender.bind(this);
    this.filterNamesByNameExclusive = this.filterNamesByNameExclusive.bind(
      this
    );
    this.filterNamesByApproximation = this.filterNamesByApproximation.bind(
      this
    );
  }

  setNameInFocus(nameInFocus) {
    this.setState({ nameInFocus });
  }

  filterNamesByNameExclusive(name) {
    const filteredNames = this.state.names.filter(
      nameObj => nameObj.name === name
    );
    this.setState({
      filteredNames
    });
    this.setNameInFocus(name);
  }

  filterNamesByApproximation(name) {
    const filteredNames = this.state.names.filter(nameObj =>
      nameObj.name.toLowerCase().includes(name.toLowerCase())
    );
    this.setState({
      filteredNames
    });
  }

  filterNamesByGender(gender) {
    const filteredNames = this.state.names.filter(
      nameObj => nameObj.genderedName === gender
    );
    this.setState({
      filteredNames
    });
  }

  unfilterNames() {
    this.setState({ filteredNames: [...this.state.names] });
  }

  componentDidMount() {
    api.fetchBoysNames().then(result =>
      this.setState({
        names: [...this.state.names, ...result],
        filteredNames: [...this.state.names, ...result],
        boysNamesLoaded: true
      })
    );
    api.fetchGirlsNames().then(result =>
      this.setState({
        names: [...this.state.names, ...result],
        filteredNames: [...this.state.names, ...result],
        girlsNamesLoaded: true
      })
    );
  }

  render() {
    const allNamesLoaded =
      this.state.girlsNamesLoaded && this.state.boysNamesLoaded;
    return (
      <div className="App">
        {allNamesLoaded ? (
          <BabyNameFilter
            handleBoyFilter={this.filterNamesByGender}
            handleGirlFilter={this.filterNamesByGender}
            handleShowAllFilter={this.unfilterNames}
            handleApproximationFilter={this.filterNamesByApproximation}
          />
        ) : null}

        {allNamesLoaded ? (
          <BabyNameList
            nameList={this.state.filteredNames}
            handleRowClick={this.filterNamesByNameExclusive}
          />
        ) : (
          "Loading List"
        )}

        {this.state.nameInFocus !== null && allNamesLoaded ? (
          <BabyNameDetails
            names={this.state.filteredNames}
            nameInFocus={this.state.nameInFocus}
          />
        ) : null}
      </div>
    );
  }
}

export default BabyNameContainer;
