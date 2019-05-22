import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { API } from "../../consts";
import { truncateSync } from "fs";
import BusinessList from "../Dashboard/ClientView/BusinessList";
import GridContainer from "../Interface/Grid/GridContainer";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "80%",
    maxWidth: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  };
}

export class Businesses extends Component {
  state = {
    name: [],
    value: [],
    names: [],
    values: [],
    businesses: []
  };

  componentWillMount() {
    //get all catagories names and ids
    axios
      .get(`${API}/category`)
      .then(response => {
        //	this.setState({ dates: response.data });
        console.log(response.data);
        response.data.categories.map(cat => {
          // this.state.names.push(cat.name);
          this.setState({ names: [...this.state.names, cat.name] });
          this.setState({ values: [...this.state.values, cat._id] });
          console.log(this.state.names);
        });
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {});
  }
  SearchBusinesses = values => {
    axios
      .get(`${API}/business/getBusinessesByCatagory/${values}`)
      .then(response => {
        //	this.setState({ dates: response.data });
        console.log(response.data.ResultQuery);
        response.data.ResultQuery.map(eachid => {
          console.log(eachid, this.state.businesses);
          this.setState({ businesses: [...this.state.businesses, eachid] });
        });
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {});
  };

  handleChange = event => {
    const item = event.target.value;
    const index = this.state.value.indexOf(item[item.length - 1].values);
    if (index > -1) {
      const tmpArr = [...this.state.value];
      this.state.businesses.splice(index, 1);
      this.state.name.splice(index, 1);
      tmpArr.splice(index, 1);
      this.setState({ value: tmpArr });
      console.log("here");
    } else {
      this.setState({
        value: [item[item.length - 1].values],
        name: [item[item.length - 1].title]
      });
      // const item = event.target.attributes.getNamedItem("title").value;
      // console.log("item", item);

      this.SearchBusinesses(item[item.length - 1].values);
      console.log("Values", this.state.value);
      console.log("Names", this.state.name);
    }
    //console.log(event.target.selectedOptions[0].getAttributes("title"));
  };

  render() {
    const { classes } = this.props;
    const PrintIt = this.state.businesses.map(i => {
      console.log(i, "i");
      return <BusinessList businessId={i._id} />;
    });

    return (
      <div className="col-12">
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">
              select catagory
            </InputLabel>
            <Select
              multiple
              value={this.state.name}
              onChange={this.handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(nname => (
                    <Chip key={nname} label={nname} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {this.state.names.map((name, i) => (
                <MenuItem
                  key={name}
                  title={name}
                  value={{ values: this.state.values[i], title: name }}
                  style={getStyles(name, this)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <GridContainer>{PrintIt}</GridContainer>
        </div>
      </div>
    );
  }
}
Businesses.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Businesses);
