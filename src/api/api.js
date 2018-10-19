// REQUIREMENTS:
// SUMMARY: Access point for accessing API's required for the app
// NEEDS TO:
// 1. Implement a return object with properties noting FETCHING_DATA, FETCHING_ERROR, FETCHING_SUCCESS
import axios from "axios";
import getBabyNameData from "./cso/csoApi";

const fetchBoysNames = () =>
  getBabyNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA05",
    // "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA10", -- shortened
    "Male"
  );

const fetchGirlsNames = () =>
  getBabyNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA12",
    // "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA11", -- shortened
    "Female"
  );

const fetchBabyNames = () =>
  axios
    .all([fetchBoysNames(), fetchGirlsNames()])
    .then(result => [...result[0], ...result[1]]);

export default { fetchBabyNames, fetchBoysNames, fetchGirlsNames };
