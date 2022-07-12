import types from "./types.js";
import pokemonJson from "../../assets/pokemon.json";

const DEFAULT_POKEMONLIST_STATE = {
  pokemon: [],
  selectedPokemon: [],
  teamPokemonList: [],
  pageNumber: 1,
  pageIndex: 0,
  defaultPokemonList: pokemonJson.results,
};

const pokemonListReducer = (state = DEFAULT_POKEMONLIST_STATE, action) => {
  switch (action.type) {
    case types.SET_POKEMON: {
      return {
        ...state,
        pokemon: action.value,
      };
    }
    case types.SET_SELECTED_POKEMON: {
      return {
        ...state,
        selectedPokemon: action.value,
      };
    }
    case types.SET_TEAM_POKEMON_LIST: {
      return {
        ...state,
        teamPokemonList: action.value,
      };
    }
    case types.SET_PAGE_NUMBER: {
      return {
        ...state,
        pageNumber: action.value,
      };
    }
    case types.SET_PAGE_INDEX: {
      return {
        ...state,
        pageIndex: action.value,
      };
    }
    default:
      return state;
  }
};

export default pokemonListReducer;
