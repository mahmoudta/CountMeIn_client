import React from "react";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Lock from "@material-ui/icons/LockOpen";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "../../../Interface/Grid/GridContainer.jsx";
import GridItem from "../../../Interface/Grid/GridItem.jsx";
import PictureUpload from "../../../Interface/CustomUpload/PictureUpload.jsx";
import CustomInput from "../../../Interface/CustomInput/CustomInput.jsx";


//Upload

import { S3IMAGESCONFIGUSERS } from '../../../../consts';
import S3 from 'aws-s3';
import defaultImage from "../../../Interface/Assets/img/default-avatar.png";




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
    }
};

class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            firstnameState: "",
            lastname: "",
            lastnameState: "",
            email: "",
            emailState: "",
            phone: '',
            phoneState: '',
            password: "",
            passwordState: "",
            file: null,
            imagePreviewUrl: defaultImage,
            img: "",

        };
    }
    sendState() {
        return this.state;
    }
    // function that returns true if value is email, false otherwise
    verifyEmail(value) {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
            return true;
        }
        return false;
    }
    // function that verifies if a string has a given length or not
    verifyLength(value, length) {
        if (value.length >= length) {
            return true;
        }
        return false;
    }
    verifyLengthAndPhone(value, length) {
        if (value.length >= length) {
            if (!isNaN(value)) {
                return true;
            }
        }
        return false;
    }
    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "email":
                if (this.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "length":
                if (this.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "phone":
                if (this.verifyLengthAndPhone(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default: break;

        }
        this.setState({ [stateName]: event.target.value });
    }
    isValidated() {
        if (
            this.state.firstnameState === "success" &&
            this.state.lastnameState === "success" &&
            this.state.emailState === "success"
        ) {
            return true;
        } else {
            if (this.state.firstnameState !== "success") {
                this.setState({ firstnameState: "error" });
            }
            if (this.state.lastnameState !== "success") {
                this.setState({ lastnameState: "error" });
            }
            if (this.state.emailState !== "success") {
                this.setState({ emailState: "error" });
            }
        }
        return false;
    }
    uploadFile = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        this.setState({ imgLoading: true });
        var newName = new Date();
        const S3Client = new S3(S3IMAGESCONFIGUSERS);
        S3Client.uploadFile(e.target.files[0], newName)
            .then((data) => {
                this.setState({ img: data.key, imgLoading: false });
                console.log("img", this.state.img)
            })
            .catch((err) => console.error(err));

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);

    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12}>
                    <h4 className={classes.infoText}>
                        Let's start with the basic information
          </h4>
                </GridItem>
                <GridItem xs={12} sm={4}>
                    <PictureUpload uploadFile={this.uploadFile.bind(this)} imagePreviewUrl={this.state.imagePreviewUrl} />
                </GridItem>
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        success={this.state.firstnameState === "success"}
                        error={this.state.firstnameState === "error"}
                        labelText={
                            <span>
                                First Name <small>(required)</small>
                            </span>
                        }
                        id="firstname"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "firstname", "length", 3),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <CustomInput
                        success={this.state.lastnameState === "success"}
                        error={this.state.lastnameState === "error"}
                        labelText={
                            <span>
                                Last Name <small>(required)</small>
                            </span>
                        }
                        id="lastname"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "lastname", "length", 3),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <RecordVoiceOver className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <CustomInput

                        success={this.state.phoneState === "success"}
                        error={this.state.phoneState === "error"}
                        labelText={
                            <span>
                                Phone <small>(required)</small>
                            </span>
                        }
                        id="phone"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "tel",
                            pattern: "[0-9]{10}",
                            onChange: event => this.change(event, "phone", "phone", 10),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Phone className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <CustomInput
                        success={this.state.passwordState === "success"}
                        error={this.state.passwordState === "error"}
                        labelText={
                            <span>
                                Password <small>(required)</small>
                            </span>
                        }
                        id="password"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "password",
                            onChange: event => this.change(event, "password", "length", 8),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Lock className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={10}>
                    <CustomInput
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}
                        labelText={
                            <span>
                                Email <small>(required)</small>
                            </span>
                        }
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "email", "email"),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Email className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(style)(Step1);
