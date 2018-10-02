export const loadBabyNameData = babyNameData => ({
  type: "LOAD_BABY_NAME_DATA",
  payload: babyNameData
});

export const isBabyNameDataLoaded = babyNameDataIsLoaded => ({
  type: "IS_BABY_NAME_DATA_LOADED",
  payload: babyNameDataIsLoaded
});
