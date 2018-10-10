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
import { List, Card } from "antd";
import withLoading from "./LoadingComponent";

const BabyNameList = ({ nameList, setSelectedBabyName }) => (
  <div className="BabyNameList">
    <List
      grid={{ gutter: 16, xs: 2, sm: 3, xl: 4 }}
      dataSource={nameList}
      renderItem={item => (
        <List.Item>
          <Card
            style={
              item.genderedName.toUpperCase() === "FEMALE"
                ? { backgroundColor: "#ffd6e7" }
                : { backgroundColor: "#bae7ff" }
            }
            onClick={() => setSelectedBabyName(item)}
          >
            <Card.Meta title={item.name} description={item.genderedName} />
          </Card>
        </List.Item>
      )}
    />
  </div>
);

export default withLoading(BabyNameList);
