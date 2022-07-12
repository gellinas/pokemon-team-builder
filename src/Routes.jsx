import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonList from "./PokemonList/PokemonList.jsx";
import Team from "./Team/Team.jsx";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={PokemonList} exact />
          <Route path="/team" component={Team} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
