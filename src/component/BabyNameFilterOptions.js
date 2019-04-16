// Requirements
// SUMMARY:
// UI components that apply filters to BabyNamesList
// NEEDS TO:
// 1. Filters BabyNamesList by grouping (boys/girls/etc.)
// 2. Filters BabyNamesList by user input
// 3. Should show on load but be disabled until the data is ready for filtering
// DEPENDS ON:
// * Retrieved Baby Names list in state

import React from "react";
import { Menu, Dropdown, Button, Input, Icon } from "antd";
import { ASCENDING, DESCENDING, MALE, FEMALE } from "./constants";
import "./BabyNameFilterOptions.css";

const BabyNameFilterOptions = ({
  handleGenderedNameFilter,
  handleShowAllFilter,
  handleApproximationFilter,
  handleAlphabeticalSort
}) => {
  const buttonStyle = { margin: "4px" };

  return (
    <div className="BabyNameFilterOptions">
      <div className="BabyNameFilterOptions--InputSearch">
        <Input.Search
          placeholder="type name here"
          onSearch={value => handleApproximationFilter(value)}
          onChange={event => handleApproximationFilter(event.target.value)}
          onClick={event => {
            handleApproximationFilter(null);
            event.target.value = "";
          }}
          size="large"
        />
      </div>
      <div className="BabyNameFilterOptions--ButtonControls">
        <Button
          type="primary"
          onClick={handleShowAllFilter}
          style={buttonStyle}
        >
          Show All
        </Button>

        <Button
          onClick={() => handleGenderedNameFilter(MALE)}
          style={buttonStyle}
        >
          {`Show Boys`}
          <Icon type="man" theme="outlined" />
        </Button>

        <Button
          onClick={() => handleGenderedNameFilter(FEMALE)}
          style={buttonStyle}
        >
          {`Show Girls`}
          <Icon type="woman" theme="outlined" />
        </Button>
        <Dropdown
          overlay={
            <AlphabeticalSortDropdown setSortOrder={handleAlphabeticalSort} />
          }
        >
          <Button style={buttonStyle}>
            Sort Alphabetically
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

const AlphabeticalSortDropdown = ({ setSortOrder }) => (
  <Menu>
    <Menu.Item onClick={() => setSortOrder(ASCENDING)} key="1">
      <Icon type="caret-up" theme="outlined" />
      Ascending
    </Menu.Item>
    <Menu.Item onClick={() => setSortOrder(DESCENDING)} key="2">
      <Icon type="caret-down" theme="outlined" />
      Descending
    </Menu.Item>
  </Menu>
);

export default BabyNameFilterOptions;
