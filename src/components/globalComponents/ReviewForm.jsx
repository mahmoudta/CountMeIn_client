import React, { Component } from 'react'
import { connect } from "react-redux";

import Rating from 'react-rating'
import PropTypes from "prop-types";
import FilledStar from "@material-ui/icons/Star";
import EmptyStar from "@material-ui/icons/StarBorder";
import HalfStar from "@material-ui/icons/StarHalf";
import Amber from '@material-ui/core/colors/amber';
import { setFlashMessage } from "../../actions/flashMessageActions";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import GridContainer from "../Interface/Grid/GridContainer";
import GridItem from "../Interface/Grid/GridItem.jsx";
import Button from "../Interface/CustomButtons/Button.jsx";
import Loading from "../globalComponents/Loading";
import Checkbox from '@material-ui/core/Checkbox';
import Card from "../Interface/Card/Card.jsx"
import CardBody from "../Interface/Card/CardBody.jsx"
import CardHeader from "../Interface/Card/CardHeader.jsx"
import CardFooter from "../Interface/Card/CardFooter.jsx";


import loginPageStyle from "../Interface/Assets/loginPageStyle";
import axios from "axios";
import { API } from "../../consts";
import { Grid } from '@material-ui/core';



const styles = theme => ({

    icon: {
        color: Amber[300]
    },
    iconLight: {
        color: Amber[200]
    },
    textField: {
        width: "100%"
    },
    ...loginPageStyle(theme)
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
            isRated: null,
            recommend: false,
            hideName: false,
        }

    }

    componentDidMount() {
        const appointmentId = this.props.match.params.appointment_id;
        axios
            .get(`${API}/appointments/getisRated/${appointmentId}`)
            .then(response => {
                this.setState({ isRated: response.data.success });
            })
            .then(() => {

            })
            .catch(err => {
                console.log(err);

            });


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

    handleChange = event => {
        this.setState({ feedback: event.target.value });
    }
    handleRec = event => {
        this.setState(prevState => ({
            recommend: !prevState.recommend
        }));
    }
    handleHide = event => {
        this.setState(prevState => ({
            hideName: !prevState.hideName
        }));
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
                appointment_id: appointmentId,
                feedback: this.state.feedback,
                comm: this.state.communication,
                resp: this.state.responsiveness,
                rec: this.state.recommend,
                Vom: this.state.value_for_money,
                Qos: this.state.quality_of_service,
                hideName: this.state.hideName,
            })
            .then(() => {
                this.props.setFlashMessage({
                    type: "success",
                    text: "Thanks for the feedbacl",
                    action: { next: "REDIRECT_TO_DASHBAORD" }
                });
            })
            .then(() => {

            })
            .catch(err => {
                console.log(err);
                this.props.setFlashMessage({
                    type: "error",
                    text: "error occured",
                    action: { next: "REDIRECT_TO_DASHBAORD" }
                });
            });
    }


    render() {

        //const appointmentId = this.props.appointmentId;
        const { classes } = this.props;
        const appointmentId = this.props.match.params.appointment_id;




        return (
            <div className={classes.container}>
                <GridContainer justify="center" alignItems="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <form>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="CMI"
                                >

                                    <h6 className={classes.cardTitle}>Please rate this appointment</h6>

                                </CardHeader>
                                <CardBody>
                                    {(this.state.isRated == null ? <Loading></Loading> : (this.state.isRated) ?
                                        <GridContainer alignItems="center"
                                        >
                                            <GridItem xs={6} sm={6} md={6}>
                                                Communication
    </GridItem>
                                            <GridItem xs={6} sm={6} md={6}>
                                                <Rating
                                                    initialRating={this.state.communication}
                                                    emptySymbol={<EmptyStar color="action"></EmptyStar>}
                                                    fullSymbol={<FilledStar className={classes.icon}></FilledStar>}
                                                    fractions={2}
                                                    onChange={(rate) => this.handleCommunication(rate)}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={6} md={6}>
                                                responsiveness
                        </GridItem>
                                            <GridItem xs={6} sm={6} md={6}>
                                                <Rating
                                                    initialRating={this.state.responsiveness}
                                                    emptySymbol={<EmptyStar color="action"></EmptyStar>}
                                                    fullSymbol={<FilledStar className={classes.icon}></FilledStar>}
                                                    fractions={2}
                                                    onChange={(rate) => this.handleResponsiveness(rate)}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={6} md={6}>
                                                Quality of Service
    </GridItem><GridItem xs={6} sm={6} md={6}>
                                                <Rating
                                                    initialRating={this.state.quality_of_service}
                                                    emptySymbol={<EmptyStar color="action"></EmptyStar>}
                                                    fullSymbol={<FilledStar className={classes.icon}></FilledStar>}
                                                    fractions={2}
                                                    onChange={(rate) => this.handleQOS(rate)}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={6} md={6}>
                                                Worth the money
                        </GridItem><GridItem xs={6} sm={6} md={6}>
                                                <Rating
                                                    initialRating={this.state.value_for_money}
                                                    emptySymbol={<EmptyStar color="action"></EmptyStar>}
                                                    fullSymbol={<FilledStar className={classes.icon}></FilledStar>}
                                                    fractions={2}
                                                    onChange={(rate) => this.handleVOM(rate)}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Checkbox

                                                    color="default"
                                                    value="recommend"
                                                    onChange={(e) => this.handleRec(e)}
                                                    inputProps={{
                                                        'aria-label': '',
                                                    }}
                                                /> I recommend this business to others
</GridItem>

                                            <GridItem xs={12} sm={12} md={12}>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Feedback"
                                                    multiline
                                                    rowsMax="5"
                                                    defaultValue=""
                                                    onChange={e => this.handleChange(e)}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Checkbox

                                                    color="default"
                                                    value="hideName"
                                                    onChange={(e) => this.handleHide(e)}
                                                    inputProps={{
                                                        'aria-label': '',
                                                    }}
                                                /> Hide my name
</GridItem>
                                            <Grid container direction="row" justify="center">
                                                <Button color="success" size="md" onClick={() => this.Sub(appointmentId)}>Submit Review</Button>
                                            </Grid> </GridContainer>
                                        : "Already reviewed")}

                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>

                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    Id: state.auth.user.sub
});
ReviewForm.propTypes = {
    classes: PropTypes.object.isRequired,
    setFlashMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { setFlashMessage })(withStyles(
    styles)(ReviewForm));


