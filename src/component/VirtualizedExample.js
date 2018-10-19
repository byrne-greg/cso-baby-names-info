import React from "react";
import { List, message, Avatar, Spin, Card } from "antd";
import reqwest from "reqwest";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

export default class VirtualizedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
    this.loadedRowsMap = {};

    this.renderItem = this.renderItem.bind(this);
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
  }

  getData(callback) {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  }

  handleInfiniteOnLoad({ startIndex, stopIndex }) {
    let data = this.props.nameList;
    this.setState({
      loading: true
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 5321) {
      message.warning("Virtualized List loaded all");
      this.setState({
        loading: false
      });
      return;
    }
    this.getData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  }

  isRowLoaded({ index }) {
    !!this.loadedRowsMap[index];
  }

  renderItem({ index, key, style }) {
    const data = this.props.nameList;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <Card
          style={
            item.genderedName.toUpperCase() === "FEMALE"
              ? { backgroundColor: "#ffd6e7" }
              : { backgroundColor: "#bae7ff" }
          }
          onClick={() => {
            //   history.push(`/${item.name}?gender=${item.genderedName}`);
          }}
        >
          <Card.Meta title={item.name} description={item.genderedName} />
        </Card>
      </List.Item>
    );
  }

  componentDidMount() {
    {
      console.log(this.props.nameList);
    }
    this.getData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  render() {
    const { data } = this.props.nameList;
    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
      width
    }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={this.props.nameList.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered
    }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width
          })
        }
      </AutoSizer>
    );
    const infiniteLoader = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop
    }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={this.props.nameList.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered
          })
        }
      </InfiniteLoader>
    );
    return (
      <List grid={{ gutter: 16, xs: 2, sm: 3, xl: 4 }}>
        {this.props.nameList.length > 0 && (
          <WindowScroller>{infiniteLoader}</WindowScroller>
        )}
        {this.props.isLoading && <Spin className="demo-loading" />}
      </List>
    );
  }
}
