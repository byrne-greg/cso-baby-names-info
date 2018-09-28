// Requirements
// SUMMARY:
// List of all baby names
// NEEDS TO:
// 1. Show the entire list on all device widths
// 2. Show quick-glance information based on filters
// 3. When a name is chosen for viewing (BabyNameDetails), the list needs to disappear and render the BabyNameDetails. It also needs to close this view with a one button click
// DEPENDS ON:
// * List of baby names from state

import React from "react";
import { List, Card } from "antd";

const BabyNameList = ({ nameList, handleRowClick }) => (
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

export default BabyNameList;
