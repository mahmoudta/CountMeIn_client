import React, { Component } from "react";
import Upcomming from "./Upcomming";
import StatsPanel from "./StatsPanel";
import BusinessList from "./BusinessList";

import BusinessListContainer from "./BusinessListContainer";
import TodayUpcoming from "./TodayUpcoming";

export class ClientDashboard extends Component {
  render() {
    return (
      <div className="col-12">
        {/* <StatsPanel /> */}
        <Upcomming />
        <BusinessListContainer />
      </div>
    );
  }
}

export default ClientDashboard;
