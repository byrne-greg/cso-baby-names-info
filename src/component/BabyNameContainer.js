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
                nameDetails={
                  this.props.babyNames.filter(nameObj => {
                    const selectedName = this.props.location.pathname.replace(
                      "/",
                      ""
                    );
                    const gender = queryString.parse(this.props.location.search)
                      .gender;
                    return (
                      nameObj.name === selectedName &&
                      gender === nameObj.genderedName
                    );
                  })[0] // dont like this
                }
                handleClose={() => this.props.history.push("/")}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <BabyNameFilter
                nameList={this.props.babyNames}
                sortOrder={this.state.sortOrder}
                genderFilter={this.state.genderFilter}
                nameApproximationFilter={this.state.nameApproximationFilter}
              >
                <BabyNameList isLoading={!this.props.babyNameDataLoaded} />
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
