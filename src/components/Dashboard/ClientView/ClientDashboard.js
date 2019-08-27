import React, { Component } from "react";
import Upcomming from "./Upcomming";
import StatsPanel from "./StatsPanel";
import BusinessList from "./BusinessList";

import BusinessListContainer from "./BusinessListContainer";
import TodayUpcoming from "./TodayUpcoming";
import TodaysPanel from "./TodaysPanel";
import "./hideScroll.css"

export class ClientDashboard extends Component {
  render() {
    return (
      <div className="col-12 overflow-hidden">
        <TodaysPanel />
        <Upcomming />
        <BusinessListContainer className="cont" />
      </div>
    );
  }
}

export default ClientDashboard;
