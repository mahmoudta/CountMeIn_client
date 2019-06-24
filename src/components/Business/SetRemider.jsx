import React, { Component } from 'react'
import { API } from "../../consts";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GridItem from "../Interface/Grid/GridItem"
import Card from "../Interface/Card/Card"
import CardHeader from "../Interface/Card/CardBody"
import CardFooter from '../Interface/Card/CardFooter';
import CardBody from '../Interface/Card/CardBody';
import { setFlashMessage } from "../../actions/flashMessageActions";
import { getBusinessById } from "../../actions/businessActions";
import SelectServices from './NewAppointment/SelectServices';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../Interface/CustomButtons/Button'
import Success from "../Interface/Typography/Success"
import Warning from "../Interface/Typography/Warning"
import loginPageStyle from '../Interface/Assets/loginPageStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid } from '@material-ui/core';






import makeAnimated from 'react-select/lib/animated';
import isEmpty from 'lodash/isEmpty';
import GridContainer from '../Interface/Grid/GridContainer';




class SetRemider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            Options: [],
            selectedOptions: [],
            daysOptions: [],
            monthsOptions: [],
            monthSelected: null,
            daySelected: null,
            repeat: false,
            allFilled: false,
            cardAnimaton: ''

        };


    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.getBusinessById(id);

        const Opt = this.props.business.services.map(service => {
            return { label: service.service_id.title, value: service.service_id._id, time: service.time, cost: service.cost };
        })
        this.setState({ Options: Opt })

        for (var i = 0; i < 31; i++) {
            // this.setState(prevState => ({
            //     daysOptions: [...prevState.daysOptions, <option value={i} key={i}>{i}</option>]
            // }))

            this.setState(prevState => ({
                daysOptions: [...prevState.daysOptions, { value: i, label: `${i} Days` }]
            }))


            if (0 < i && i < 13) {
                this.setState(prevState => ({
                    monthsOptions: [...prevState.monthsOptions, { value: i, label: `${i} Months` }]
                }))
            }

        }

    }
    handleSelectChange = async (selectedOptions) => {
        await this.setState({ selectedOptions });
        this.CheckAllFilled();
    }
    handleMonthsChange = async (monthsSelected) => {
        await this.setState({ monthSelected: monthsSelected });
        this.CheckAllFilled();

    }
    handleDaysChange = async (daysSelected) => {
        await this.setState({ daySelected: daysSelected });
        this.CheckAllFilled();

    }

    handleRepeat = async () => {
        if (this.state.repeat) {
            await this.setState({ repeat: false })
        } else {
            await this.setState({ repeat: true })
        }
    }

    CheckAllFilled = async () => {
        if (!isEmpty(this.state.selectedOptions) && (this.state.daySelected || this.state.monthSelected)) {
            this.setState({ allFilled: true })
        } else {
            this.setState({ allFilled: false })
        }
        return
    }

    setReminder = e => {
        const { business } = this.props;
        //request

        var timeInDays;
        if (isEmpty(this.state.monthSelected)) {
            timeInDays = this.state.daySelected.value;
        } else {
            timeInDays = this.state.daySelected.value + (this.state.monthSelected.value * 30);
        }
        const tmpServices = this.state.selectedOptions.map(service => { return service.value })

        console.log(this.props.auth.user.sub, this.state.repeat, tmpServices, timeInDays)


        axios
            .post(`${API}/users/setReminder/`, {
                businessId: this.props.business._id,
                customerId: this.props.auth.user.sub,
                services: tmpServices,
                days: timeInDays, //need,
                repeat: this.state.repeat, //need,
            })
            .then(() => {
                this.props.setFlashMessage({
                    type: "success",
                    text: "Appointment is ready",
                    action: { next: "REDIRECT_TO_DASHBAORD" }
                });
            })
            .catch(err => {
                console.log(err);
                this.props.setFlashMessage({
                    type: "error",
                    text: "You Already have reminder in this business",
                    action: { next: "REDIRECT_TO_DASHBAORD" }
                });
            });
    };


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center" alignItems="center"><GridItem xs={12} sm={6} md={5} lg={5} > <Card login > <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`}><h3 className={`${classes.cardTitle} text-muted`}>Set reminder</h3></CardHeader> <CardBody>
                    <GridItem xs={12}>

                        <small className={"text-muted"}>Services:</small>
                        <SelectServices values={this.state} handleSelectChange={this.handleSelectChange} />
                        <small className={"text-muted"}>Remind me in :</small>
                        <div className="row">
                            <div className="form-group col-6">
                                <Select defaultValue={this.state.daysOptions[0]}
                                    options={this.state.daysOptions} onChange={this.handleDaysChange} components={makeAnimated()}
                                />

                            </div>
                            <div className="form-group col-6">
                                <Select defaultValue={this.state.monthsOptions[0]} options={this.state.monthsOptions} onChange={this.handleMonthsChange} components={makeAnimated()}
                                />
                            </div>
                        </div>
                        <Checkbox
                            color="default"
                            value="repeat"
                            onChange={(e) => this.handleRepeat()}
                            inputProps={{
                                'aria-label': '',
                            }}
                        />
                        <small className={"text-muted"}>Repeat reminder</small>

                    </GridItem>

                    {(this.state.allFilled) ? <Grid container direction="row" justify="center">    <Button color="success" size="md" onClick={() => this.setReminder()}>Set Reminder</Button>
                    </Grid> : <Grid container direction="row" justify="center" >
                            <Warning>Please fields above to continue</Warning>
                            <Success >By setting reminder , we will be able to suggest to you the correct appointment with the most ideal time for you ,</Success>

                        </Grid>}
                </CardBody></Card></GridItem></GridContainer></div>)

    }

}
const mapStatetoProps = state => ({
    auth: state.auth,
    business: state.business.business
});
SetRemider.propTypes = {
    classes: PropTypes.object.isRequired,
    setFlashMessage: PropTypes.func.isRequired
};

export default connect(
    mapStatetoProps,
    { setFlashMessage, getBusinessById }
)(withStyles(loginPageStyle)(SetRemider));
