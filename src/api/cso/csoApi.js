import axios from "axios";

function getYearIndex(data) {
  const yearIndexObj = data.dimension.Year.category.index;
  let years = [];
  for (const prop in yearIndexObj) {
    if (yearIndexObj.hasOwnProperty(prop)) {
      years.push(prop);
    }
  }
  return years;
}

function getNameIndex(data) {
  const nameIndexObj = data.dimension.Name.category.label;
  let names = [];
  for (const prop in nameIndexObj) {
    if (nameIndexObj.hasOwnProperty(prop)) {
      names.push(nameIndexObj[prop]);
    }
  }
  return names;
}

function getAllRankings(data) {
  let allNameRankAndYear = [];
  for (let j = 0; j < data.value.length; j++) {
    if (j % 2 === 0) {
      allNameRankAndYear.push(data.value[j]);
    }
  }

  return allNameRankAndYear;
}

function getAllBirthsWithName(data) {
  let allNameBirthAndYear = [];
  for (let j = 0; j < data.value.length; j++) {
    if (j % 2 !== 0) {
      allNameBirthAndYear.push(data.value[j]);
    }
  }
  return allNameBirthAndYear;
}

function getRankAndBirthNumPerYear(
  yearIndex,
  allNameRankAndYear,
  allNameBirthAndYear
) {
  let allNamesPerYearRankBirth = [];
  let yearIterator = 0;
  for (let i = 0; i < allNameRankAndYear.length; i++) {
    if (i % 20 === 0) {
      yearIterator = 0;
    }

    const currentYear = yearIndex[yearIterator];
    const yearObject = {
      year: currentYear,
      data: {
        rank: allNameRankAndYear[i],
        births: allNameBirthAndYear[i]
      }
    };
    allNamesPerYearRankBirth.push(yearObject);
    yearIterator++;
  }

  return allNamesPerYearRankBirth;
}

function getNamesWithPerYearData(
  nameIndex,
  yearIndex,
  rankBirthPerYearIndex,
  genderedName
) {
  let namesWithPerYearData = [];
  for (let k = 0; k < nameIndex.length; k++) {
    const nameWithPerYearRankBirth = {
      name: nameIndex[k],
      genderedName,
      yearData: []
    };

    for (let m = 0; m < yearIndex.length; m++) {
      nameWithPerYearRankBirth.yearData.push(rankBirthPerYearIndex[m]);
    }
    rankBirthPerYearIndex.splice(0, yearIndex.length);

    namesWithPerYearData.push(nameWithPerYearRankBirth);
  }
  return namesWithPerYearData;
}

export default function getBabyNameData(csoUrl, genderedName) {
  return axios.get(csoUrl).then(response => {
    const data = response.data.dataset;
    const nameGenderUse =
      genderedName && genderedName !== "" ? genderedName : "Both";

    const allNamesPerYearRankBirth = getRankAndBirthNumPerYear(
      getYearIndex(data),
      getAllRankings(data),
      getAllBirthsWithName(data)
    );
    const namesWithPerYearData = getNamesWithPerYearData(
      getNameIndex(data),
      getYearIndex(data),
      allNamesPerYearRankBirth,
      nameGenderUse
    );
    return namesWithPerYearData;
  });
}
