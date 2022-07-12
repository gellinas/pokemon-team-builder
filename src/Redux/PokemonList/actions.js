import types from "./types";

const setPokemon = (pokemon) => ({
  type: types.SET_POKEMON,
  value: pokemon,
});

const setSelectedPokemon = (selectedPokemon) => ({
  type: types.SET_SELECTED_POKEMON,
  value: selectedPokemon,
});

const setTeamPokemonList = (teamPokemonList) => ({
  type: types.SET_TEAM_POKEMON_LIST,
  value: teamPokemonList,
});

const setPageNumber = (pageNumber) => ({
  type: types.SET_PAGE_NUMBER,
  value: pageNumber,
});

const setPageIndex = (pageIndex) => ({
  type: types.SET_PAGE_INDEX,
  value: pageIndex,
});

export default {
  setPokemon,
  setSelectedPokemon,
  setTeamPokemonList,
  setPageNumber,
  setPageIndex,
};
