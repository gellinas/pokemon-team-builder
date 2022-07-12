import React from "react";
import Button from "@material-ui/core/Button";

import "./Sidebar.css";

class Sidebar extends React.Component {
  render() {
    let listClassname = this.props.isOnPokemonListView
      ? "icon-active active-color"
      : null;
    let teamClassname = this.props.isOnPokemonListView
      ? null
      : "icon-active active-color";
    return (
      <div className="sidebar">
        <Button
          color="default"
          onClick={() => this.props.history.push("/")}
          className={listClassname}
        >
          Pokemon List
        </Button>
        <Button
          color="default"
          onClick={() => this.props.history.push("/team")}
          className={teamClassname}
        >
          My Team
        </Button>
      </div>
    );
  }
}

export default Sidebar;
