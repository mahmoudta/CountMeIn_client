import React, { Component } from "react";
import BusinessList from "./BusinessList";
import axios from "axios";
import { API } from "../../../consts";
import GridContainer from "../../Interface/Grid/GridContainer.jsx";

export default class BusinessListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fallowedArr: [],
      fallowedComponent: null,
      refresh: false
    };
  }

  async componentWillMount() {
    axios
      .get(`${API}/users/getFallowedBusinesses`, {})
      .then(response => {
        console.log("business", response.data.following);
        this.setState({ fallowedArr: response.data.following }, () => {
          console.log("followed array", this.state.fallowedArr);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const PrintIt = this.state.fallowedArr.map(i => {
      return <BusinessList business={i} />;
    });
    return <GridContainer>{PrintIt}</GridContainer>;
  }
}
