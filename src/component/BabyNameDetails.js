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

const BabyNameDetails = ({ names, nameInFocus }) => {
  const nameFound = names.filter(nameObj => nameObj.name === nameInFocus);

  return (
    <div className="NameInFocusDetail">
      {nameFound.length > 0 ? (
        <div>
          <h3>Name Details</h3>
          <h4>{nameFound[0].name}</h4>
          <h4>{`Classical Use: ${nameFound[0].genderedName}`}</h4>
          <ul>
            {nameFound[0].yearData.map(({ year, data }) => (
              <li key={year}>
                {year}
                <ul>
                  <li>{`Rank: ${data.rank}`}</li>
                  <li>{`Num of Births: ${data.births}`}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default BabyNameDetails;
