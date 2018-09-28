// Requirements
// SUMMARY:
// List of all baby names
// NEEDS TO:
// 1. Show the entire list on all device widths
// 2. Show quick-glance information based on filters
// 3. When a name is chosen for viewing (BabyNameDetails), the list needs to disappear and render the BabyNameDetails. It also needs to close this view with a one button click
// 4. The list view must be independently scrollable from the rest of the view
// 5. Should show loading until all the data has been retrieved
// DEPENDS ON:
// * List of baby names from state if ready

import React from "react";
import { Skeleton, List, Card } from "antd";

const BabyNameList = ({ nameList, handleRowClick }) => (
  <div className="BabyNameList">
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

const BabyNameListLoading = () => (
  <div className="BabyNameList">
    <List
      grid={{ gutter: 16, column: 2, size: "small" }}
      dataSource={new Array(30)}
      renderItem={() => (
        <List.Item>
          <Skeleton active>
            <Card />
          </Skeleton>
        </List.Item>
      )}
    />
  </div>
);

const LoadableBabyNameList = ({ nameList, handleRowClick, loading }) => (
  <div>
    {loading ? (
      <BabyNameListLoading />
    ) : (
      <BabyNameList nameList={nameList} handleRowClick={handleRowClick} />
    )}
  </div>
);
export default LoadableBabyNameList;