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
import { connect } from "react-redux";
import { getAllCategories } from "../../actions/categoryActions";

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

class Businesses extends Component {
  state = {
    name: [],
    value: [],
    names: [],
    values: [],
    businesses: []
  };

  componentWillMount() {
    //get all catagories names and ids
    this.props.getAllCategories();
  }
  SearchBusinesses = item => {
    const Name = item.title;
    axios
      .get(`${API}/business/getBusinessesByCatagory/${item.values}`)
      .then(response => {
        //	this.setState({ dates: response.data });
        console.log("response", response.data.business);

        response.data.business.map(businessProfile => {
          this.setState(
            {
              businesses: [...this.state.businesses, { Name, businessProfile }]
            },
            () => console.log("callback", this.state.businesses)
          );
        });
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {});
  };

  handleChange = event => {
    const item = event.target.value;
    console.log("item", item.length);
    const index = this.state.value.indexOf(item[item.length - 1].values);
    console.log(index);
    if (index === -1) {
      // const item = event.target.attributes.getNamedItem("title").value;
      //console.log("item", item);
      const thisItem = item[item.length - 1];
      this.SearchBusinesses(thisItem);
      this.setState({
        name: [...this.state.name, thisItem.title],
        value: [...this.state.value, thisItem.values]
      });
      return;
    }
    if (index > -1) {
      this.state.businesses.map((that, i) => {
        if (that.Name === this.state.name[index]) {
          console.log(that.Name, this.state.name[index]);

          const tmpbusiness = this.state.businesses;
          tmpbusiness.splice(i, 1);
          this.setState({
            businesses: tmpbusiness
          });
        }
      });
      const tmpvalue = this.state.value;
      tmpvalue.splice(index, 1);
      const tmpname = this.state.name;
      tmpname.splice(index, 1);
      this.setState({ value: tmpvalue, name: tmpname });
      // this.state.value.splice(index, 1);
      // this.state.name.splice(index, 1);
      console.log("thisstatebusinesses", this.state.businesses);
    }
    //console.log(event.target.selectedOptions[0].getAttributes("title"));
  };

  render() {
    const { classes } = this.props;
    const { categoriess } = this.props;
    console.log("state array", this.state.businesses);

    const PrintIt = this.state.businesses.map(i => {
      console.log(i, "i");
      return <BusinessList business={i.businessProfile} />;
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
              {categoriess.map((category, i) => (
                <MenuItem
                  key={category._id}
                  title={category._id}
                  value={{ values: category._id, title: category.name }}
                  style={getStyles(category._id, this)}
                >
                  {category.name}
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
  classes: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getAllCategories: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  auth: state.auth,
  categoriess: state.category.categories
  //loading: state.business.loading
});

export default connect(
  mapStatetoProps,
  { getAllCategories }
)(withStyles(styles, { withTheme: true })(Businesses));
