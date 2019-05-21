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
      fallowedComponent: null
    };
  }

  async componentWillMount() {
    axios
      .get(`${API}/users/getFallowedBusinesses`, {})
      .then(response => {
        console.log(response.data.QueryRes.following);

        this.setState({ fallowedArr: response.data.QueryRes.following }, () => {
          console.log(this.state.fallowedArr);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const PrintIt = this.state.fallowedArr.map(i => {
      return <BusinessList businessId={i} />;
    });
    return <GridContainer>{PrintIt}</GridContainer>;
  }
}
