import getBabyNameData from "./cso/csoApi";

const fetchBoysNames = () =>
  getBabyNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA10",
    "Male"
  );

const fetchGirlsNames = () =>
  getBabyNameData(
    "https://www.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/VSA11",
    "Female"
  );

export default { fetchBoysNames, fetchGirlsNames };
