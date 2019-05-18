import React, { Component } from "react";
import BusinessList from "./BusinessList";
import axios from "axios";
import { API } from "../../../consts";

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
      return (
        // <Link to={`/business/${i}`}>
        <BusinessList businessId={i} />
        //  </Link>
      );
    });
    return PrintIt;
  }
}
