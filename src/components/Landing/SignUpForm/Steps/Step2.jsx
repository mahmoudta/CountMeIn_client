import React from "react";
import Axios from "axios";
import { API, B_IMAGES } from "../../../../consts";
import Button from "../../../Interface/CustomButtons/Button.jsx"
import PropTypes from 'prop-types';



// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";


import Lock from "@material-ui/icons/LockOpen";




// core components

import CustomInput from "../../../Interface/CustomInput/CustomInput.jsx";
import GridContainer from "../../../Interface/Grid/GridContainer.jsx";
import GridItem from "../../../Interface/Grid/GridItem.jsx";

import customSelectStyle from "../../../Interface/Assets/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "../../../Interface/Assets/customCheckboxRadioSwitch";
import { Redirect } from 'react-router-dom'

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    inputAdornment: {
        position: "relative"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};

class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sentVerfication: false,
            verfied: false,
            verficationCode: true,
            verficationCodeState: false,
        };
    }

    sendsms(phone) {
        this.setState({ sentVerfication: true })
        console.log("1", phone);
        Axios
            .post(`${API}/sms/Verfy`, { phone: phone })
            .then(response => {
                //	this.setState({ dates: response.data });
                console.log("response", response);

            })
            .catch(err => {
                console.log(err);
            })
            .then(() => { });

    }


    sendState() {
        return this.state;
    }
    verifyCode(value, phone) {
        console.log("verfying Code")
        Axios
            .post(`${API}/sms/CheckVerfy`, { phone: phone, code: value })
            .then(response => {
                //	this.setState({ dates: response.data });
                console.log("response", response.data);
                var result = response.data;
                if (result === "approved") {
                    this.setState({ codeState: "success" });
                    this.setState({ verfied: true })
                    return true
                } else {
                    console.log("false")
                    return false
                }
            })
            .catch(err => {
                console.log(err);
                return false
            })
    }

    verifyLength(value, length, phone) {
        console.log("verfying lenght")
        if (value.length === length) {
            return this.verifyCode(value, phone)
        }
        return false;
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    createUser(data) {
        console.log(data)
        const fullImg = `${B_IMAGES}/${data.img}`
        Axios
            .post(`${API}/users/signup`, { email: data.email, password: data.password, first_name: data.firstname, last_name: data.lastname, imgUrl_: fullImg, phone_: data.phone })
            .then(response => {
                //	this.setState({ dates: response.data });
                console.log("response", response.data);
                this.context.router.history.push('/');

            })
            .catch(err => {
                console.log(err);
                return false
            })
    }

    handleChange = (event, name, phone) => {
        console.log("handleChange")
        if (this.verifyLength(event.target.value, 6, phone)) {
            this.setState({ [name + "State"]: "success" });
        } else {
            this.setState({ [name + "State"]: "error" });
        }
        // this.setState({ personal: false, personalAndBusiness: false })
        this.setState({ [name]: event.target.value });
    };
    isValidated() {
        return true;
    }
    render() {
        //const print = ((this.props.allStates.Registeration.phone === undefined) ? "yes" : "no")
        const { classes } = this.props;
        return (
            <div>
                <h4 className={classes.infoText}>Verfication </h4>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12} lg={10}>
                        <GridContainer>
                            {(this.state.verfied) ? <Button color="success" size="lg" block onClick={(e) => this.createUser(this.props.allStates.Registeration)}>
                                Create User </Button> : (this.state.sentVerfication) ? <CustomInput
                                    success={this.state.codeState === "success"}
                                    error={this.state.codeState === "error"}
                                    labelText={
                                        <span>
                                            Verfication Code <small>(required)</small>
                                        </span>
                                    }
                                    id="verCode"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: event => this.handleChange(event, "code", this.props.allStates.Registeration.phone),
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                className={classes.inputAdornment}
                                            >
                                                <Lock className={classes.inputAdornmentIcon} />
                                            </InputAdornment>
                                        )
                                    }}
                                /> : <Button color="success" simple size="lg" block onClick={(e) => this.sendsms(this.props.allStates.Registeration.phone)}>
                                        Send Verfication Code
						 				 </Button>}



                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
Step2.contextTypes = {
    router: PropTypes.object.isRequired
};

export default withStyles(style)(Step2);
