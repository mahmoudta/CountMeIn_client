import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "../../Interface/Card/Card.jsx";
import GridItem from "../../Interface/Grid/GridItem.jsx";
import CardHeader from "../../Interface/Card/CardHeader.jsx";
import CardIcon from "../../Interface/Card/CardIcon.jsx";
import CardFooter from "../../Interface/Card/CardFooter.jsx";
import dashboardStyle from "../../Interface/Assets/dashboardStyle";
import axios from "axios";
import { API } from "../../../consts";
import { Link } from "react-router-dom";

import DateRange from "@material-ui/icons/DateRange";
import Store from "@material-ui/icons/Store";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

class BusinessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: {
        _id: null,
        profile: {
          name: "loading"
        }
      }
    };
  }

  componentWillMount() {
    axios
      .get(`${API}/business/${this.props.businessId}`, {})
      .then(response => {
        console.log(response.data.business.profile);
        this.setState({ business: response.data.business });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardHeader color="success" stats icon>
            <CardIcon color="success">
              <Store />
            </CardIcon>
            <Link to={`/business/${this.state.business._id}`}>
              <p className={classes.cardCategory}>Visit Business</p>
            </Link>
            <h3 className={classes.cardTitle}>
              {this.state.business.profile.name}
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              Online 24 Hours
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    );
  }
}
BusinessList.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(dashboardStyle)(BusinessList);
