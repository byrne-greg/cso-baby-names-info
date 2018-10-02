// REQUIREMENTS:
// SUMMARY: Responsible for initializing the app

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadBabyNameData, isBabyNameDataLoaded } from "./actions/actions";
import BabyNameContainer from "./component/BabyNameContainer";
import api from "./api/api";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    api.fetchBabyNames().then(result => {
      this.props.loadBabyNameData(result);
      this.props.isBabyNameDataLoaded(true);
    });
  }

  render() {
    return <BabyNameContainer />;
  }
}

const mapStateToProps = state => ({
  babyNames: state.babyNames,
  babyNameDataLoaded: state.isBabyNameDataLoaded
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBabyNameData, isBabyNameDataLoaded }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
