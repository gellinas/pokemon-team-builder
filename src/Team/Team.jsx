import React from "react";
import { connect } from "react-redux";
import teamSelectors from "../Redux/Team/selectors.js";
import teamActions from "../Redux/Team/actions.js";
import pokemonListSelectors from "../Redux/PokemonList/selectors.js";
import pokemonListActions from "../Redux/PokemonList/actions.js";

import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

import { filter, isEmpty } from "lodash";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

import "./Team.css";

class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isDialogOpen: false };
  }

  onPokemonCardClick = (pokemonInfo) => {
    this.props.setSelectedPokemon(pokemonInfo);
    this.handleOpen();
  };

  handleClose = () => {
    this.setState({ isDialogOpen: false });
  };

  handleOpen = () => {
    this.setState({ isDialogOpen: true });
  };

  onRemovePokemonClick = () => {
    const { selectedPokemon } = this.props;
    const newTeamPokemonList = filter(
      this.props.teamPokemonList,
      (pokemonOnTeam) => {
        if (selectedPokemon !== pokemonOnTeam) {
          return pokemonOnTeam;
        }
      }
    );
    this.props.setTeamPokemonList(newTeamPokemonList);
    this.handleClose();
  };

  renderDialog = () => {
    return (
      <Dialog
        open={this.state.isDialogOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove this pokemon from your team?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} variant="outlined">
            No
          </Button>
          <Button onClick={this.onRemovePokemonClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderPokemonTeam = () => {
    const { teamPokemonList } = this.props;
    if (!isEmpty(teamPokemonList)) {
      return teamPokemonList.map((eachPokemon, index) => {
        return (
          <PokemonCard
            key={index}
            pokename={eachPokemon.name}
            onPokemonCardClick={this.onPokemonCardClick}
            pokemonInfo={eachPokemon}
            isPokemonOnTeam
          />
        );
      });
    } else {
      return (
        <div className="no-pokemon-team"> You Have No Pokemon Selected</div>
      );
    }
  };

  onClearTeamClick = () => {
    this.props.setTeamPokemonList([]);
    return <div className="no-pokemon-team"> You Have No Pokemon Selected</div>;
  };

  render() {
    return (
      <div className="page-container">
        <Sidebar {...this.props} />
        <div className="current-team-container">
          {this.renderDialog()}
          <header className="team-header"> MY TEAM </header>
          <div className="team-selected"> {this.renderPokemonTeam()} </div>
          <Button
            variant="outlined"
            className="clear-button"
            onClick={this.onClearTeamClick}
          >
            Clear Team
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPokemon: teamSelectors.getSelectedPokemon(state),
    teamPokemonList: pokemonListSelectors.getTeamPokemonList(state),
  };
};

const mapDispatchToProps = {
  setSelectedPokemon: teamActions.setSelectedPokemon,
  setTeamPokemonList: pokemonListActions.setTeamPokemonList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
