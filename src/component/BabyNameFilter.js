// Requirements
// SUMMARY:
// UI components that apply filters to BabyNamesList
// NEEDS TO:
// 1. Filters BabyNamesList by grouping (boys/girls/etc.)
// 2. Filters BabyNamesList by user input
// DEPENDS ON:
// * Retrieved Baby Names list in state

import React from "react";
import { Button, Input } from "antd";

const BabyNameFilter = ({
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

export default BabyNameFilter;
