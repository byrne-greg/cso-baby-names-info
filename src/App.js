// REQUIREMENTS:
// SUMMARY: Responsible for initializing the app

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { loadBabyNameData, isBabyNameDataLoaded } from "./actions/actions";
import BabyNameContainer from "./component/BabyNameContainer";
import BabyNameIntroduction from "./component/BabyNameIntroduction";
import api from "./api/api";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingDisplay: true };

    this.handleDisplayToggle = this.handleDisplayToggle.bind(this);
  }

  componentDidMount() {
    api.fetchBabyNames().then(result => {
      this.props.loadBabyNameData(result);
      this.props.isBabyNameDataLoaded(true);
    });
  }

  handleDisplayToggle(currentState) {
    this.setState({ isShowingDisplay: !currentState });
  }

  render() {
    return (
      <Router>
        {this.state.isShowingDisplay ? (
          <BabyNameIntroduction
            handleDisplayToggle={this.handleDisplayToggle}
          />
        ) : (
          <BabyNameContainer />
        )}
      </Router>
    );
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
