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
import { Timeline, Icon, Card } from "antd";
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
        <TopTenRankBadges yearData={nameDetails.yearData} />

        <Timeline mode="alternate">
          {nameDetails.yearData.map(({ year, data }) => (
            <Timeline.Item>
              <p>{year}</p>
              <p>{`Rank: ${data.rank}`}</p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  );
};

const TopTenRankBadges = ({ yearData }) => (
  <div className="TopTenRanking">
    {yearData.map(
      ({ year, data }) =>
        data.rank !== null && data.rank <= 10 ? (
          <div className="TopTenRanking--Badge">
            <Icon type="crown" theme="twoTone" twoToneColor="#d48806" />
            {` #${data.rank} in ${year}`}
          </div>
        ) : null
    )}
  </div>
);

const CloseCardIcon = ({ handleClose }) => (
  <div className="BabyNameDetails--CardClose" onClick={handleClose}>
    <Icon type="close" theme="outlined" />
  </div>
);

export default withDetailPageLoading(BabyNameDetails);
