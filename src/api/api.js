// REQUIREMENTS:
// SUMMARY: Access point for accessing API's required for the app
// NEEDS TO:
// 1. Implement a return object with properties noting FETCHING_DATA, FETCHING_ERROR, FETCHING_SUCCESS
import axios from "axios";
import getNameData from "./cso/csoBabyNameApiParser";

const fetchOccurrencesBoysNames = () =>
  getNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA05",
    "Male"
  );

const fetchBirthRegistrationBoysNames = () =>
  getNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA10",
    "Male"
  );

const fetchOccurrencesGirlsNames = () =>
  getNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA12",
    "Female"
  );

const fetchBirthRegistrationGirlsNames = () =>
  getNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA11",
    "Female"
  );

const combineOccurrenceAndBirthYearData = (
  occurrenceDataApiResult,
  birthDataApiResult
) =>
  occurrenceDataApiResult.map(occurrenceRecord => {
    const newRecord = Object.assign(occurrenceRecord);

    const match = birthDataApiResult.filter(
      birthRecord =>
        birthRecord.name === occurrenceRecord.name &&
        birthRecord.genderedName === occurrenceRecord.genderedName
    );

    if (match.length > 0) {
      newRecord.birthData = [...match[0].data];
    }
    newRecord.occurrenceData = newRecord.data;
    delete newRecord.data;
    return newRecord;
  });

const fetchBoysNamesData = () =>
  axios
    .all([fetchOccurrencesBoysNames(), fetchBirthRegistrationBoysNames()])
    .then(result => combineOccurrenceAndBirthYearData(result[0], result[1]));

const fetchGirlsNamesData = () =>
  axios
    .all([fetchOccurrencesGirlsNames(), fetchBirthRegistrationGirlsNames()])
    .then(result => combineOccurrenceAndBirthYearData(result[0], result[1]));

const fetchBabyNames = () =>
  axios
    .all([fetchBoysNamesData(), fetchGirlsNamesData()])
    .then(result => [...result[0], ...result[1]]);

const getNameOccurrenceData1 = () =>
  getNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA10",
    "Male"
  );

export default {
  fetchBabyNames,
  fetchBoysNamesData,
  fetchGirlsNamesData,
  getNameOccurrenceData1
};
