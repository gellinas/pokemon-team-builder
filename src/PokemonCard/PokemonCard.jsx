import React from "react";

import { isEmpty } from "lodash";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import "./PokemonCard.css";

class PokemonCard extends React.Component {
  state = { details: {} };

  componentDidMount() {
    const { pokename } = this.props;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokename}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ details: data }));
  }

  componentDidUpdate(prevProps) {
    const { pokename } = this.props;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokename}`;
    if (prevProps.pokename !== pokename) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => this.setState({ details: data }));
    }
  }

  renderMoves = () => {
    const { moves } = this.state.details;
    return moves.map((moveItem, moveIndex) => {
      if (moveIndex < 6) {
        return (
          <Chip
            label={moveItem.move.name}
            variant="outlined"
            size="small"
            key={moveIndex}
          />
        );
      }
    });
  };

  renderSprite = () => {
    const { sprites } = this.state.details;
    return (
      <Avatar
        classes={{ root: "circle-big" }}
        alt="Pokemon Avatar"
        src={sprites.front_default}
      />
    );
  };

  renderTypes = () => {
    const { types } = this.state.details;
    return types.map((typeName, index) => {
      return (
        <Chip
          label={typeName.type.name}
          variant="outlined"
          size="small"
          key={index}
        />
      );
    });
  };

  render() {
    const { weight } = this.state.details;
    const cardClassName =
      this.props.isPokemonOnTeam === true
        ? "card-container team-pokemon"
        : "card-container";
    if (!isEmpty(this.state.details)) {
      return (
        <Card
          className={cardClassName}
          onClick={() => this.props.onPokemonCardClick(this.props.pokemonInfo)}
        >
          <CardContent className="content-container">
            <div className="poke-sprite">{this.renderSprite()} </div>
            <div className="poke-name"> {this.props.pokename} </div>
            <div className="info-container">
              <div className="t-w-container">
                <div className="types">
                  <div>Types: </div>
                  <div className="render-types">{this.renderTypes()}</div>
                </div>
                <div className="line"></div>
                <div className="weight">Weight: {weight}</div>
              </div>
              <div className="moves">
                <div>Moves:</div>
                <div className="render-moves"> {this.renderMoves()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  }
}

export default PokemonCard;
