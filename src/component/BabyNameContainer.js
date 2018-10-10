// Requirements
// SUMMARY: Manage the state and pass modifier functions to child elements

import React, { Component } from "react";
import { connect } from "react-redux";
import BabyNameFilterOptions from "./BabyNameFilterOptions";
import BabyNameDetails from "./BabyNameDetails";
import BabyNameList from "./BabyNameList";
import BabyNameFilter from "./BabyNameFilter";
import { ASCENDING } from "./constants";

class BabyNameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedName: null,
      sortOrder: ASCENDING,
      genderFilter: null,
      nameApproximationFilter: null
    };

    this.setSelectedBabyName = this.setSelectedBabyName.bind(this);
    this.setNameApproximationFilter = this.setNameApproximationFilter.bind(
      this
    );
    this.setSortOrder = this.setSortOrder.bind(this);
    this.setGenderFilter = this.setGenderFilter.bind(this);
    this.unsetAllFilters = this.unsetAllFilters.bind(this);
  }

  setSelectedBabyName(selectedName) {
    this.setState({ selectedName });
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
        {this.state.selectedName === null || this.state.selectedName === "" ? (
          <BabyNameFilter
            nameList={this.props.babyNames}
            sortOrder={this.state.sortOrder}
            genderFilter={this.state.genderFilter}
            nameApproximationFilter={this.state.nameApproximationFilter}
          >
            <BabyNameList
              isLoading={!this.props.babyNameDataLoaded}
              setSelectedBabyName={this.setSelectedBabyName}
            />
          </BabyNameFilter>
        ) : null}

        {this.state.selectedName !== null && this.props.babyNameDataLoaded ? (
          <BabyNameDetails
            nameDetails={this.state.selectedName}
            handleClose={() => this.setSelectedBabyName(null)}
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

export default connect(
  mapStateToProps,
  {}
)(BabyNameContainer);
