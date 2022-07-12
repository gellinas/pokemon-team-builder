const getPokemon = (state) => {
  return state.pokemonList.pokemon;
};

const getSelectedPokemon = (state) => {
  return state.pokemonList.selectedPokemon;
};

const getTeamPokemonList = (state) => {
  return state.pokemonList.teamPokemonList;
};

const getPageNumber = (state) => {
  return state.pokemonList.pageNumber;
};

const getPageIndex = (state) => {
  return state.pokemonList.pageIndex;
};

const getDefaultPokemonList = (state) => {
  return state.pokemonList.defaultPokemonList;
};

export default {
  getPokemon,
  getSelectedPokemon,
  getTeamPokemonList,
  getPageNumber,
  getPageIndex,
  getDefaultPokemonList,
};
