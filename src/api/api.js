// REQUIREMENTS:
// SUMMARY: Access point for accessing API's required for the app
// NEEDS TO:
// 1. Implement a return object with properties noting FETCHING_DATA, FETCHING_ERROR, FETCHING_SUCCESS
import getBabyNameData from "./cso/csoApi";

const fetchBoysNames = () =>
  getBabyNameData(
    // "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA05" - full
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA10",
    "Male"
  );

const fetchGirlsNames = () =>
  getBabyNameData(
    // "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA12" - full
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA11",
    "Female"
  );

export default { fetchBoysNames, fetchGirlsNames };
