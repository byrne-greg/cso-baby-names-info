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
import "./BabyNameFilter.css";

const BabyNameFilter = ({
  handleGenderedNameFilter,
  handleShowAllFilter,
  handleApproximationFilter,
  handleAlphabeticalSort
}) => {
  const MALE = "Male";
  const FEMALE = "Female";

  return (
    <div className="BabyNameFilter">
      <div className="BabyNameFilter--InputSearch">
        <Input.Search
          placeholder="type name here"
          onSearch={value => handleApproximationFilter(value)}
          onChange={event => handleApproximationFilter(event.target.value)}
          onClick={event => (event.target.value = "")}
          size="large"
        />
      </div>
      <div className="BabyNameFilter--Options">
        <Button
          type="primary"
          block
          onClick={handleShowAllFilter}
          style={{ margin: "0 4px" }}
        >
          Show All
        </Button>

        <Button
          block
          onClick={() => handleGenderedNameFilter(MALE)}
          style={{ margin: "0 4px" }}
        >
          Show Boys
        </Button>

        <Button
          block
          onClick={() => handleGenderedNameFilter(FEMALE)}
          style={{ margin: "0 4px" }}
        >
          Show Girls
        </Button>

        <Dropdown
          overlay={(
<SortNamesAlphabeticallyDropdownMenu
  handleSort={handleAlphabeticalSort}
/>
)}
        >
          <Button block style={{ margin: "0 4px" }}>
            Sort Alphabetically
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

const SortNamesAlphabeticallyDropdownMenu = ({ handleSort }) => (
  <Menu>
    <Menu.Item onClick={() => handleSort(true)} key="1">
      <Icon type="caret-up" theme="outlined" />
      Ascending
    </Menu.Item>
    <Menu.Item onClick={() => handleSort(false)} key="2">
      <Icon type="caret-down" theme="outlined" />
      Descending
    </Menu.Item>
    {/* <Menu.SubMenu title="Alphabetically">
      <Menu.Item>Ascending</Menu.Item>
      <Menu.Item>Descending</Menu.Item>
    </Menu.SubMenu> */}
  </Menu>
);

export default BabyNameFilter;
