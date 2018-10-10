import React from "react";
import { Spin, Skeleton, List, Card } from "antd";

const withLoading = WrappedComponent => (props = {}) => {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <Spin size="large">
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
      </Spin>
    );
  }
  return <WrappedComponent {...props} />;
};

export default withLoading;
