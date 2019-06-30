import React, { Component } from 'react'
import Card from '../../Interface/Card/Card';
import GridContainer from "../../Interface/Grid/GridContainer.jsx";
import dashboardStyle from "../../Interface/Assets/dashboardStyle";
import withStyles from '@material-ui/core/styles/withStyles';
import Done from '@material-ui/icons/CheckCircleOutlined';
import CommingApp from '@material-ui/icons/Schedule'
import Total from '@material-ui/icons/CalendarToday'
import { connect } from "react-redux";
import axios from "axios";
import { API } from "../../../consts";
import Loading from "../../globalComponents/LoadingSmall";
import "./hideScroll.css"









export class TodaysPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PannelStats: null
        };
    }

    componentWillMount() {
        axios
            .get(`${API}/users/getpannel/${this.props.Id}`)
            .then(response => {

                this.setState({ PannelStats: response.data })
            })
            .catch(err => {
                console.log(err);
            })


    }
    render() {
        const { PannelStats } = this.state;
        return (
            (PannelStats) ?

                <GridContainer className="d-flex justify-content-between cont" style={{
                    maxHeight: '175px',
                    overflowX: 'auto',
                    overflowY: 'none'
                }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-4 mb-4">
                                <Card className="border-left-primary">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="icon-bg">
                                                <Total />
                                            </div>
                                            <div className="col mr-2">
                                                <div className="text-sm font-weight-bold text-primary text-uppercase mb-1">
                                                    TOTAL APPOINTMENTS
												<small className="text-muted w-100 d-block">
                                                        <span>You have</span>

                                                    </small>
                                                </div>
                                                <div className="">
                                                    {PannelStats.All} Appointments
											</div>
                                            </div>
                                        </div>
                                    </div>

                                </Card>
                            </div>

                            <div className="col-12 col-lg-4 mb-4">
                                <Card className="border-left-success">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="icon-bg">
                                                <Done />
                                            </div>
                                            <div className="col mr-2">
                                                <div className="text-sm font-weight-bold text-success text-uppercase mb-1">
                                                    DONE APPOINTMENTS
												<small className="text-muted w-100 d-block">
                                                        <span>You have</span>
                                                    </small>
                                                </div>
                                                <div className="">
                                                    {PannelStats.Done} Appointments
											</div>
                                            </div>
                                        </div>
                                    </div>

                                </Card>
                            </div>

                            <div className="col-12 col-lg-4 mb-4">
                                <Card className="border-left-info">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="icon-bg">
                                                <CommingApp />
                                            </div>
                                            <div className="col mr-2">
                                                <div className="text-sm font-weight-bold text-info text-uppercase mb-1">
                                                    UPCOMMING APPOINTMENTS
												<small className="text-muted w-100 d-block">
                                                        <span>You have</span>
                                                    </small>
                                                </div>
                                                <div >
                                                    {PannelStats.upcomming} Appointments
											</div>
                                            </div>
                                        </div>
                                    </div>

                                </Card>
                            </div>

                        </div>
                    </div>
                </GridContainer>
                :
                <Loading></Loading>
        )
    }
}
const mapStateToProps = state => ({
    Id: state.auth.user.sub
});



export default connect(mapStateToProps)(withStyles(dashboardStyle)(TodaysPanel));
