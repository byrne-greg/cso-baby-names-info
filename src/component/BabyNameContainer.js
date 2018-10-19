// Requirements
// SUMMARY: Manage the state and pass modifier functions to child elements

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import queryString from "query-string";
import BabyNameFilterOptions from "./BabyNameFilterOptions";
import BabyNameDetails from "./BabyNameDetails";
import BabyNameList from "./BabyNameList";
import BabyNameFilter from "./BabyNameFilter";
import VirtualizedExample from "./VirtualizedExample";
import { ASCENDING } from "./constants";

class BabyNameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortOrder: ASCENDING,
      genderFilter: null,
      nameApproximationFilter: null
    };

    this.setNameApproximationFilter = this.setNameApproximationFilter.bind(
      this
    );
    this.setSortOrder = this.setSortOrder.bind(this);
    this.setGenderFilter = this.setGenderFilter.bind(this);
    this.unsetAllFilters = this.unsetAllFilters.bind(this);
  }

  setSortOrder(sortOrder) {
    this.setState({ sortOrder });
  }

  setGenderFilter(gender) {
    this.setState({
      genderFilter: gender
    });
  }

  setNameApproximationFilter(name) {
    this.setState({
      nameApproximationFilter: name
    });
  }

  getSpecificNameObjFromDirectPath(location) {
    const name = location.pathname.replace("/", "");
    const gender = queryString.parse(location.search).gender;
    return this.getSpecificNameObjFromBabyNames(name, gender);
  }

  // TODO rename
  getSpecificNameObjFromBabyNames(name, gender) {
    const babyNameObjArray = this.props.babyNames.filter(
      nameObj => nameObj.name === name && nameObj.genderedName === gender
    );

    if (babyNameObjArray.length === 0) {
      return { err: true };
    }
    return babyNameObjArray[0]; // will only ever have one name with gender, never two "Male John" name data
  }

  unsetAllFilters() {
    this.setState({ genderFilter: null, nameApproximationFilter: null });
  }

  render() {
    return (
      <div className="BabyNameContainer">
        <BabyNameFilterOptions
          handleGenderedNameFilter={this.setGenderFilter}
          handleShowAllFilter={this.unsetAllFilters}
          handleApproximationFilter={this.setNameApproximationFilter}
          handleAlphabeticalSort={this.setSortOrder}
        />
        <Switch>
          <Route
            path="/:name"
            render={() => (
              <BabyNameDetails
                isLoading={!this.props.babyNameDataLoaded}
                nameDetails={this.getSpecificNameObjFromDirectPath(
                  this.props.location
                )}
                handleClose={() => this.props.history.push("/")}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              // <BabyNameFilter
              //   nameList={this.props.babyNames}
              //   sortOrder={this.state.sortOrder}
              //   genderFilter={this.state.genderFilter}
              //   nameApproximationFilter={this.state.nameApproximationFilter}
              // >
              //   <BabyNameList isLoading={!this.props.babyNameDataLoaded} />
              // </BabyNameFilter>

              <BabyNameFilter
                nameList={this.props.babyNames}
                sortOrder={this.state.sortOrder}
                genderFilter={this.state.genderFilter}
                nameApproximationFilter={this.state.nameApproximationFilter}
              >
                <VirtualizedExample
                  isLoading={!this.props.babyNameDataLoaded}
                />
              </BabyNameFilter>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  babyNames: state.babyNames,
  babyNameDataLoaded: state.isBabyNameDataLoaded
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(BabyNameContainer)
);
