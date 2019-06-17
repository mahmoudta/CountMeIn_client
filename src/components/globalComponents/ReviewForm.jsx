import React, { Component } from 'react'
import Rating from 'react-rating'
import PropTypes from "prop-types";
import FilledStar from "@material-ui/icons/Star";
import EmptyStar from "@material-ui/icons/StarBorder";
import HalfStar from "@material-ui/icons/StarHalf";
import Amber from '@material-ui/core/colors/amber';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import GridContainer from "../Interface/Grid/GridContainer";
import GridItem from "../Interface/Grid/GridItem.jsx";
import Button from "../Interface/CustomButtons/Button.jsx";

import axios from "axios";
import { API } from "../../consts";



const styles = theme => ({
    icon: {
        color: Amber[300]
    },
    iconLight: {
        color: Amber[200]
    }
});


//var Rating = require('react-rating');



export class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            communication: 0,
            responsiveness: 1,
            quality_of_service: 2,
            value_for_money: 3,
            feedback: '',
            appointmentId: null,
        }

    }
    handleCommunication(rate) {
        this.setState({ communication: rate })
    }
    handleResponsiveness(rate) {
        this.setState({ responsiveness: rate })
    }
    handleQOS(rate) {
        this.setState({ quality_of_service: rate })
    }
    handleVOM(rate) {
        this.setState({ value_for_money: rate })
    }
    handleChangeAppointment = event => {
        this.setState({ appointmentId: event.target.value })
    }
    handleChange = event => {
        this.setState({ feedback: event.target.value });
    }

    Sub(appointmentId) {
        console.log(
            this.state.feedback,
            this.state.communication,
            this.state.responsiveness,
            this.state.recommend,
            this.state.value_for_money,
            this.state.quality_of_service)
        axios
            .put(`${API}/appointments/setCustomerReview`, {
                appointment_id: this.state.appointmentId,
                feedback: this.state.feedback,
                comm: this.state.communication,
                resp: this.state.responsiveness,
                rec: 1,//this.state.recommend,
                Vom: this.state.value_for_money,
                Qos: this.state.quality_of_service,
            })
            .then(response => {
                //	this.setState({ dates: response.data });
                console.log(response);
            })
            .then(() => {

            })
            .catch(err => {
                console.log(err);

            });
    }


    render() {

        const appointmentId = this.props.appointmentId;
        const { classes } = this.props;

        return (
            <GridContainer alignItems="center"
            >
                <GridItem xs={12} sm={6} md={6}>
                    communication
                    </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                    <Rating
                        initialRating={this.state.communication}
                        emptySymbol={<EmptyStar color="action"></EmptyStar>}
                        fullSymbol={<FilledStar className={classes.icon}></FilledStar>}
                        fractions={2}
                        onChange={(rate) => this.handleCommunication(rate)}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                    responsiveness
                                        </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                    <Rating
                        initialRating={this.state.responsiveness}
                        emptySymbol={<EmptyStar color="action"></EmptyStar>}
                        fullSymbol={<FilledStar className={classes.icon}></FilledStar>}
                        fractions={2}
                        onChange={(rate) => this.handleResponsiveness(rate)}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                    quality_of_service
                    </GridItem><GridItem xs={12} sm={6} md={6}>
                    <Rating
                        initialRating={this.state.quality_of_service}
                        emptySymbol={<EmptyStar color="action"></EmptyStar>}
                        fullSymbol={<FilledStar className={classes.icon}></FilledStar>}
                        fractions={2}
                        onChange={(rate) => this.handleQOS(rate)}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                    value_for_money
                                        </GridItem><GridItem xs={12} sm={6} md={6}>
                    <Rating
                        initialRating={this.state.value_for_money}
                        emptySymbol={<EmptyStar color="action"></EmptyStar>}
                        fullSymbol={<FilledStar className={classes.icon}></FilledStar>}
                        fractions={2}
                        onChange={(rate) => this.handleVOM(rate)}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                    recommend
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Feedback"
                        multiline
                        rowsMax="4"
                        defaultValue="Default Value"
                        onChange={e => this.handleChange(e)}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="AppointmentId"
                        multiline
                        rowsMax="4"
                        defaultValue="null"
                        onChange={e => this.handleChangeAppointment(e)}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </GridItem>
                <Button onClick={() => this.Sub()}>Submit</Button>
            </GridContainer>

        )
    }
}

ReviewForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReviewForm);
