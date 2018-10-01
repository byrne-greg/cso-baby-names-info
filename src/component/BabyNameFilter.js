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
import { Button, Input } from "antd";
import "./BabyNameFilter.css";

const BabyNameFilter = ({
  handleGenderedNameFilter,
  handleShowAllFilter,
  handleApproximationFilter
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
      </div>
    </div>
  );
};

export default BabyNameFilter;
