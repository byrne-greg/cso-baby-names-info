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
import "./BabyNameDetails.css";

const BabyNameDetails = ({ nameDetails }) => (
  // const nameFound = names.filter(nameObj => nameObj.name === nameInFocus);

  <div className="BabyNameDetails">
    <Card title={nameDetails.name}>
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

    {/* <div>
      <h3>Name Details</h3>
      <h4>{nameDetails.name}</h4>
      <h4>{`Classical Use: ${nameDetails.genderedName}`}</h4>
      <ul>
        {nameDetails.yearData.map(({ year, data }) => (
          <li key={year}>
            {year}
            <ul>
              <li>{`Rank: ${data.rank}`}</li>
              <li>{`Num of Births: ${data.births}`}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div> */}
  </div>
);

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

export default BabyNameDetails;
