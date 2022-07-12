import types from "./types";

const setSelectedPokemon = (selectedPokemon) => ({
  type: types.SET_SELECTED_POKEMON,
  value: selectedPokemon,
});

export default { setSelectedPokemon };
