import React, { Component } from "react";
import { Input, Button, List, Card } from "antd";
import "./App.css";
import api from "./api/api";

class App extends Component {
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
      nameObj.name.includes(name)
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
          <FilterNames
            handleBoyFilter={this.filterNamesByGender}
            handleGirlFilter={this.filterNamesByGender}
            handleShowAllFilter={this.unfilterNames}
            handleApproximationFilter={this.filterNamesByApproximation}
          />
        ) : null}

        {allNamesLoaded ? (
          <BabyNameGridList
            nameList={this.state.filteredNames}
            handleRowClick={this.filterNamesByNameExclusive}
          />
        ) : (
          "Loading List"
        )}

        {this.state.nameInFocus !== null && allNamesLoaded ? (
          <NameInFocusDetail
            names={this.state.filteredNames}
            nameInFocus={this.state.nameInFocus}
          />
        ) : null}
      </div>
    );
  }
}

const FilterNames = ({
  handleBoyFilter,
  handleGirlFilter,
  handleShowAllFilter,
  handleApproximationFilter
}) => {
  const MALE = "Male";
  const FEMALE = "Female";
  return (
    <div className="FilterNames">
      <div>
        <Button onClick={() => handleBoyFilter(MALE)}>Show Boys</Button>
        <Button onClick={() => handleGirlFilter(FEMALE)}>Show Girls</Button>
        <Button onClick={handleShowAllFilter}>Show All</Button>
      </div>
      <div>
        <Input.Search
          placeholder="type name here"
          onSearch={value => handleApproximationFilter(value)}
          onChange={event => handleApproximationFilter(event.target.value)}
          style={{ width: 200 }}
        />
      </div>
    </div>
  );
};

const NameInFocusDetail = ({ names, nameInFocus }) => {
  const nameFound = names.filter(nameObj => nameObj.name === nameInFocus);

  return (
    <div className="NameInFocusDetail">
      {nameFound.length > 0 ? (
        <div>
          <h3>Name Details</h3>
          <h4>{nameFound[0].name}</h4>
          <h4>{`Classical Use: ${nameFound[0].genderedName}`}</h4>
          <ul>
            {nameFound[0].yearData.map(({ year, data }) => (
              <li key={year}>
                {year}
                <ul>
                  <li>{`Rank: ${data.rank}`}</li>
                  <li>{`Num of Births: ${data.births}`}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

const BabyNameGridList = ({ nameList, handleRowClick }) => (
  <div className="BabyNameGridList">
    <List
      grid={{ gutter: 16, column: 2, size: "small" }}
      dataSource={nameList}
      renderItem={item => (
        <List.Item>
          <Card title={item.name} onClick={() => handleRowClick(item.name)}>
            <p>{item.genderedName}</p>
          </Card>
        </List.Item>
      )}
    />
  </div>
);

export default App;
