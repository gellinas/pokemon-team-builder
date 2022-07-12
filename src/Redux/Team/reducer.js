import types from "./types.js";

const DEFAULT_TEAM_STATE = {
  selectedPokemon: null,
};

const teamReducer = (state = DEFAULT_TEAM_STATE, action) => {
  switch (action.type) {
    case types.SET_SELECTED_POKEMON: {
      return {
        ...state,
        selectedPokemon: action.value,
      };
    }
    default:
      return state;
  }

};

export default teamReducer;
