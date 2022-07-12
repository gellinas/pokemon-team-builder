import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import "./FilterMenu.css";

class FilterMenu extends React.Component {
  render() {
    return (
      <Autocomplete
        className="filter-menu"
        options={this.props.data}
        multiple={true}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        onChange={this.props.onMenuChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            className="search-field"
            color="primary"
          />
        )}
      />
    );
  }
}

export default FilterMenu;
