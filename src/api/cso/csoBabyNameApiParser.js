import axios from "axios";
import JSONstat from "jsonstat";

export default function getNameData(csoUrl, genderedName) {
  return axios.get(csoUrl).then(response => {
    const dataset = JSONstat(response.data).Dataset(0);

    const nameDimension = dataset.Dimension("Name");
    const yearDimension = dataset.Dimension("Year");
    const statDimension = dataset.Dimension("Statistic");

    const names = nameDimension.id.map(nameCode => ({
      id: nameCode,
      name: nameDimension.Category(nameCode).label,
      genderedName,
      data: yearDimension.id.map(yearCode => {
        const isRankStat = statCode =>
          statDimension.Category(statCode).label.indexOf("Rank") !== -1;

        const getStatValue = isRankingStat => {
          const totalNumData = () =>
            dataset.Data({
              Name: nameCode,
              Year: yearCode,
              Statistic: statDimension.id.filter(
                statCode =>
                  isRankingStat ? isRankStat(statCode) : !isRankStat(statCode)
              )[0]
            }).value;
          return totalNumData() !== null ? totalNumData() : 0;
        };

        return {
          year: yearCode,
          total: getStatValue(false),
          rank: getStatValue(true)
        };
      })
    }));
    return names;
  });
}
