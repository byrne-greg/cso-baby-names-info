const defaultState = {
  babyNames: [],
  isBabyNameDataLoaded: false,
  exampleOne: "test"
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case "LOAD_BABY_NAME_DATA":
      return { ...state, babyNames: action.payload };
    case "IS_BABY_NAME_DATA_LOADED":
      return { ...state, isBabyNameDataLoaded: action.payload };
    default:
      return state;
  }
};

export default reducers;
