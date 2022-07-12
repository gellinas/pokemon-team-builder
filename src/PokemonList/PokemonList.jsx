import React from "react";
import { connect } from "react-redux";
import pokemonListSelectors from "../Redux/PokemonList/selectors.js";
import pokemonListActions from "../Redux/PokemonList/actions.js";

import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import FilterMenu from "../FilterMenu/FilterMenu.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import { isEmpty, uniqBy, some } from "lodash";

import "./PokemonList.css";

class PokemonList extends React.Component {
  componentDidMount() {
    this.props.setSelectedPokemon([]);
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${this.props.pageIndex}&limit=12`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.props.setPokemon(data.results));
  }
  componentDidUpdate(prevProps) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${this.props.pageIndex}&limit=12`;
    if (prevProps.pageNumber !== this.props.pageNumber) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => this.props.setPokemon(data.results));
    }
  }

  onMenuChange = (event, value, reason) => {
    this.props.setSelectedPokemon(value);
  };

  onPokemonCardClick = (pokemonInfo) => {
    const { teamPokemonList } = this.props;
    if (some(teamPokemonList, pokemonInfo)) {
      const newTeamPokemonList = teamPokemonList.filter((eachPokemon) => {
        if (eachPokemon.name !== pokemonInfo.name) {
          return eachPokemon;
        }
      });
      this.props.setTeamPokemonList(uniqBy(newTeamPokemonList, "name"));
    } else {
      const newTeamPokemonList = uniqBy(
        [...teamPokemonList, pokemonInfo],
        "name"
      );
      this.props.setTeamPokemonList(newTeamPokemonList);
    }
  };

  renderPagination = () => {
    const { selectedPokemon, pageNumber } = this.props;
    if (isEmpty(selectedPokemon)) {
      return (
        <div className="page-controls">
          {this.renderBackButton()}
          <div> {pageNumber} </div>
          {this.renderForwardButton()}
        </div>
      );
    }
  };

  renderBackButton = () => {
    const { pageNumber } = this.props;
    const disabled = pageNumber === 1;
    return (
      <IconButton
        onClick={this.onBackwardClick}
        disabled={disabled}
        size="small"
      >
        <ArrowBackIosIcon />
      </IconButton>
    );
  };

  renderForwardButton = () => {
    const { pageNumber } = this.props;
    const disabled = pageNumber === 13;
    return (
      <IconButton
        onClick={this.onForwardClick}
        disabled={disabled}
        size="small"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    );
  };

  onForwardClick = () => {
    const { pageNumber, pageIndex } = this.props;
    this.props.setPageNumber(pageNumber + 1);
    this.props.setPageIndex(pageIndex + 12);
  };

  onBackwardClick = () => {
    const { pageNumber, pageIndex } = this.props;
    this.props.setPageNumber(pageNumber - 1);
    this.props.setPageIndex(pageIndex - 12);
  };

  renderPokemon = () => {
    const { pokemon, selectedPokemon, teamPokemonList, pageNumber } =
      this.props;

    if (isEmpty(selectedPokemon)) {
      let counter = 0;
      return pokemon.map((eachPokemon, index) => {
        const isPokemonOnTeam = some(teamPokemonList, eachPokemon);

        if (counter < 12 && pageNumber < 13) {
          counter += 1;
          return (
            <PokemonCard
              pokename={eachPokemon.name}
              onPokemonCardClick={this.onPokemonCardClick}
              pokemonInfo={eachPokemon}
              isPokemonOnTeam={isPokemonOnTeam}
              key={index}
            />
          );
        } else if (pageNumber === 13 && counter < 7) {
          counter += 1;
          return (
            <PokemonCard
              pokename={eachPokemon.name}
              onPokemonCardClick={this.onPokemonCardClick}
              pokemonInfo={eachPokemon}
              isPokemonOnTeam={isPokemonOnTeam}
              key={index}
            />
          );
        }
      });
    }
  };

  renderSelectedPokemon = () => {
    const { selectedPokemon, teamPokemonList } = this.props;
    if (!isEmpty(selectedPokemon)) {
      return selectedPokemon.map((eachPokemon, index) => {
        const isPokemonOnTeam = some(teamPokemonList, eachPokemon);
        return (
          <PokemonCard
            pokename={eachPokemon.name}
            onPokemonCardClick={this.onPokemonCardClick}
            pokemonInfo={eachPokemon}
            isPokemonOnTeam={isPokemonOnTeam}
            key={index}
          />
        );
      });
    }
  };

  render() {
    return (
      <div className="page-container">
        <Sidebar {...this.props} isOnPokemonListView />
        <div className="pokemon-list-view">
          <FilterMenu
            data={this.props.defaultPokemonList}
            onMenuChange={this.onMenuChange}
            onPokemonCardClick={this.onPokemonCardClick}
          />
          <div className="render-pokemon-list-view">
            {this.renderPokemon()}
            {this.renderSelectedPokemon()}
          </div>
          {this.renderPagination()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokemon: pokemonListSelectors.getPokemon(state),
    selectedPokemon: pokemonListSelectors.getSelectedPokemon(state),
    teamPokemonList: pokemonListSelectors.getTeamPokemonList(state),
    pageNumber: pokemonListSelectors.getPageNumber(state),
    pageIndex: pokemonListSelectors.getPageIndex(state),
    defaultPokemonList: pokemonListSelectors.getDefaultPokemonList(state),
  };
};

const mapDispatchToProps = {
  setPokemon: pokemonListActions.setPokemon,
  setSelectedPokemon: pokemonListActions.setSelectedPokemon,
  setTeamPokemonList: pokemonListActions.setTeamPokemonList,
  setPageNumber: pokemonListActions.setPageNumber,
  setPageIndex: pokemonListActions.setPageIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
