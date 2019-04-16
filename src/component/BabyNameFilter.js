import React, { Component } from "react";
import { connect } from "react-redux";
import { ASCENDING, DESCENDING, MALE, FEMALE } from "./constants";

class BabyNameFilter extends Component {
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

  createSortedList(listToSort) {
    if (this.props.sortOrder === ASCENDING) {
      return this.sortNamesAlphabetically(true, listToSort);
    }
    if (this.props.sortOrder === DESCENDING) {
      return this.sortNamesAlphabetically(false, listToSort);
    }
    return listToSort;
  }

  filterNamesByMaleUse(nameList) {
    return nameList.filter(
      nameObj => nameObj.genderedName.toUpperCase() === MALE
    );
  }

  filterNamesByFemaleUse(nameList) {
    return nameList.filter(
      nameObj => nameObj.genderedName.toUpperCase() === FEMALE
    );
  }

  createGenderFilteredList(listToFilter) {
    if (this.props.genderFilter === MALE) {
      return this.filterNamesByMaleUse(listToFilter);
    }
    if (this.props.genderFilter === FEMALE) {
      return this.filterNamesByFemaleUse(listToFilter);
    }
    return [...listToFilter];
  }

  filterNamesByApproximation(name, nameList) {
    return nameList.filter(nameObj =>
      nameObj.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  createNameApproximationFilteredList(listToFilter) {
    if (this.props.nameApproximationFilter) {
      return this.filterNamesByApproximation(
        this.props.nameApproximationFilter,
        listToFilter
      );
    }
    return listToFilter;
  }

  render() {
    let displayList = this.props.babyNames;
    displayList = this.createGenderFilteredList(displayList);
    displayList = this.createNameApproximationFilteredList(displayList);
    displayList = this.createSortedList(displayList);

    const { children } = this.props;
    const childrenWithAddedProp = React.Children.map(children, child =>
      React.cloneElement(child, { nameList: displayList })
    );
    return <React.Fragment>{childrenWithAddedProp}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  babyNames: state.babyNames
});

export default connect(
  mapStateToProps,
  {}
)(BabyNameFilter);
