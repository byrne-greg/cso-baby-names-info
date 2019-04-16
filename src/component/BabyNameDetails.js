// Requirements
// SUMMARY:
// Detail Pane that shows information on a particular baby name
// NEEDS TO:
// 1. Show the name to focus on
// 2. Show quick-glance information (e.g. < No 4 in 2008 >)
// 3. Show detailed information about that name
// 3a. Rank / 3b. Num of Births / 3c. Num of Registrations in Year / etc.
// 4. Is retrievable by direct URL
// DEPENDS ON:
// * Particular name information

import React from "react";
import { Icon, Card, Popover } from "antd";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";
import { withDetailPageLoading } from "./LoadingComponent";
import "./BabyNameDetails.css";

const BabyNameDetails = ({ nameDetails, handleClose }) => {
  if (nameDetails === null || nameDetails.err) {
    return <Card>No Data Found</Card>;
  }
  return (
    <div className="BabyNameDetails">
      <Card
        title={nameDetails.name}
        extra={<CloseCardIcon handleClose={handleClose} />}
      >
        {/* TODO issue with when these top ten boxes appear with no data. Need to extract out the finding of top ten rankings from the render */}
        <TopTenRankCard
          yearData={nameDetails.occurrenceData}
          cardTitle="Rank of name by occurrences in year"
          explainer="This card shows when this name was within the ten highest number of occurrences of people with this name within the year (1964 to present). Only names with 3 or more occurrences are registered."
        />
        {nameDetails.birthData ? (
          <TopTenRankCard
            yearData={nameDetails.birthData}
            cardTitle="Rank of name by birth registrations in year"
            explainer="This card shows when this name was within the ten highest number of babies registered within the year (1998 to present)."
          />
        ) : null}

        <Chart
          xIncrement={5}
          yLabel="Occurrences"
          data={nameDetails.occurrenceData}
        />
        {nameDetails.birthData ? (
          <Chart xIncrement={2} yLabel="Births" data={nameDetails.birthData} />
        ) : null}
      </Card>
    </div>
  );
};

const Chart = ({ data, yLabel, xIncrement }) => {
  const sortedData = data.sort((a, b) => a.year - b.year);
  return (
    <VictoryChart>
      <VictoryAxis
        label="Year"
        tickValues={[
          // data[0].year, // first value
          ...data
            .filter(({ year }) => year % xIncrement === 0)
            .map(({ year }) => year), // incremented values
          data[data.length - 1].year // last value
        ]}
        style={{
          axis: { stroke: "#756f6a" },
          axisLabel: { fontSize: 12 },
          ticks: { stroke: "grey", size: 5 },
          tickLabels: {
            fontSize: "8px",
            fontFamily: "inherit",
            fillOpacity: 1,
            paddingLeft: 5,
            paddingRight: 5,
            angle: 45
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        label={yLabel}
        style={{
          axis: { stroke: "#756f6a" },
          axisLabel: { fontSize: 12 },
          ticks: { stroke: "grey", size: 5 },
          tickLabels: {
            fontSize: "8px",
            fontFamily: "inherit",
            fillOpacity: 1,
            margin: `10px`
          }
        }}
      />
      <VictoryLine
        // labels={d => (d.y !== undefined ? d.y : null)}
        // style={{ labels: { fill: "white" } }}
        // labelComponent={<VictoryLabel dy={30} />}
        data={sortedData}
        x="year"
        y="total"
      />
    </VictoryChart>
  );
};

const TopTenRankCard = ({
  yearData,
  cardTitle,
  explainer = "No help text available"
}) => {
  // TODO requires a filter before mapping
  const badges = yearData
    .filter(({ rank }) => rank !== null && rank <= 10 && rank !== 0)
    .map(({ year, rank }) => (
      <div className="TopTenRanking--Badge">
        <Icon type="crown" theme="twoTone" twoToneColor="#d48806" />
        {` #${rank} in ${year}`}
      </div>
    ));

  return (
    <React.Fragment>
      {badges.length > 0 ? (
        <Card title={<Popover content={explainer}>{cardTitle}</Popover>}>
          <div className="TopTenRanking">{badges}</div>
        </Card>
      ) : null}
    </React.Fragment>
  );
};

const CloseCardIcon = ({ handleClose }) => (
  <div className="BabyNameDetails--CardClose" onClick={handleClose}>
    <Icon type="close" theme="outlined" />
  </div>
);

export default withDetailPageLoading(BabyNameDetails);
