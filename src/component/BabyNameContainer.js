// Requirements
// SUMMARY: Manage the state and pass modifier functions to child elements

import React, { Component } from "react";
import { connect } from "react-redux";
import BabyNameFilter from "./BabyNameFilter";
import BabyNameDetails from "./BabyNameDetails";
import LoadableBabyNameList from "./BabyNameList";

class BabyNameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  setSelectedName(selectedName) {
    this.setState({ selectedName });
  }

  getNameDetailFromList(name) {
    const filteredNames = this.props.babyNames.filter(
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
      filteredNames: this.filterNamesByApproximation(name, this.props.babyNames)
    });
  }

  filterNamesByApproximation(name, nameList) {
    return nameList.filter(nameObj =>
      nameObj.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  setFilteredNamesByGender(gender) {
    this.setState({
      filteredNames: this.filterNamesByGender(gender, this.props.babyNames)
    });
  }

  filterNamesByGender(gender, nameList) {
    return nameList.filter(nameObj => nameObj.genderedName === gender);
  }

  unfilterNames() {
    this.setState({ filteredNames: [...this.props.babyNames] });
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
            isLoading={!this.props.babyNameDataLoaded}
            nameList={this.props.babyNames}
            handleRowClick={this.setSelectedName}
          />
        ) : null}

        {this.state.selectedName !== null && this.props.babyNameDataLoaded ? (
          <BabyNameDetails
            nameDetails={this.getNameDetailFromList(this.state.selectedName)}
            handleClose={() => this.setSelectedName(null)}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  babyNames: state.babyNames,
  babyNameDataLoaded: state.isBabyNameDataLoaded
});

const mapDispatchToProps = dispatch => ({});
// bindActionCreators({ createInitialMutableBaby }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BabyNameContainer);
