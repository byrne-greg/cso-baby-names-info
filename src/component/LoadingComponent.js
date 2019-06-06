import React from "react";
import { Spin, Skeleton, List, Card } from "antd";

const loadingWithColumns = numColumns => {
  const dumbData = [];
  for (let i = 0; i < 30; i++) {
    dumbData.push({ key: i });
  }

  return (
    <Spin size="large">
      <List
        grid={{ gutter: 16, column: numColumns, size: "small" }}
        dataSource={dumbData}
        renderItem={() => (
          <List.Item>
            <Skeleton active>
              <Card />
            </Skeleton>
          </List.Item>
        )}
      />
    </Spin>
  );
};

export const withListPageLoading = WrappedComponent => (props = {}) => {
  const { isLoading } = props;
  if (isLoading) {
    return loadingWithColumns(2);
  }
  return <WrappedComponent {...props} />;
};

export const withDetailPageLoading = WrappedComponent => (props = {}) => {
  withDetailPageLoading.displayName = `withDetailPageLoading(${WrappedComponent})`;
  const { isLoading } = props;
  if (isLoading) {
    return loadingWithColumns(1);
  }
  return <WrappedComponent {...props} />;
};
