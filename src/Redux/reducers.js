import pokemonListReducer from "./PokemonList/reducer.js";
import teamReducer from "./Team/reducer.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  pokemonList: pokemonListReducer,
  team: teamReducer,
});

export default rootReducer;
