// Requirements
// SUMMARY: Manage the state and pass modifier functions to child elements

import React, { Component } from "react";
import api from "../api/api";
import BabyNameFilter from "./BabyNameFilter";
import BabyNameDetails from "./BabyNameDetails";
import LoadableBabyNameList from "./BabyNameList";

class BabyNameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      babyNamesDataLoaded: false,
      names: [],
      filteredNames: [],
      selectedName: null
    };

    this.setSelectedName = this.setSelectedName.bind(this);
    this.setFilteredNamesBySortOrder = this.setFilteredNamesBySortOrder.bind(
      this
    );
    this.unfilterNames = this.unfilterNames.bind(this);
    this.setFilteredNamesByGender = this.setFilteredNamesByGender.bind(this);
    this.setFilteredNamesByApproximation = this.setFilteredNamesByApproximation.bind(
      this
    );
  }

  componentDidMount() {
    api.fetchBabyNames().then(result =>
      this.setState({
        names: result,
        filteredNames: this.sortNamesAlphabetically(true, result),
        babyNamesDataLoaded: true
      })
    );
  }

  setSelectedName(selectedName) {
    this.setState({ selectedName });
  }

  getNameDetailFromList(name) {
    const filteredNames = this.state.names.filter(
      nameObj => nameObj.name === name
    );
    return filteredNames[0];
  }

  setFilteredNamesBySortOrder(ascending) {
    this.setState({
      filteredNames: this.sortNamesAlphabetically(
        ascending,
        this.state.filteredNames
      )
    });
  }

  sortNamesAlphabetically(ascending, nameListToSort) {
    let sortedNames = [...nameListToSort];

    sortedNames = sortedNames.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 > name2) {
        return 1;
      }
      if (name1 < name2) {
        return -1;
      }
      return 0;
    });

    if (!ascending) {
      sortedNames = sortedNames.reverse();
    }

    return sortedNames;
  }

  setFilteredNamesByApproximation(name) {
    this.setState({
      filteredNames: this.filterNamesByApproximation(name, this.state.names)
    });
  }

  filterNamesByApproximation(name, nameList) {
    return nameList.filter(nameObj =>
      nameObj.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  setFilteredNamesByGender(gender) {
    this.setState({
      filteredNames: this.filterNamesByGender(gender, this.state.names)
    });
  }

  filterNamesByGender(gender, nameList) {
    return nameList.filter(nameObj => nameObj.genderedName === gender);
  }

  unfilterNames() {
    this.setState({ filteredNames: [...this.state.names] });
  }

  render() {
    return (
      <div className="BabyNameContainer">
        <BabyNameFilter
          handleGenderedNameFilter={this.setFilteredNamesByGender}
          handleShowAllFilter={this.unfilterNames}
          handleApproximationFilter={this.setFilteredNamesByApproximation}
          handleAlphabeticalSort={this.setFilteredNamesBySortOrder}
        />
        {this.state.selectedName === null || this.state.selectedName === "" ? (
          <LoadableBabyNameList
            loading={!this.state.babyNamesDataLoaded}
            nameList={this.state.filteredNames}
            handleRowClick={this.setSelectedName}
          />
        ) : null}

        {this.state.selectedName !== null && this.state.babyNamesDataLoaded ? (
          <BabyNameDetails
            nameDetails={this.getNameDetailFromList(this.state.selectedName)}
            handleClose={() => this.setSelectedName(null)}
          />
        ) : null}
      </div>
    );
  }
}

export default BabyNameContainer;
