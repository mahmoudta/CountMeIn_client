import React, { Component } from 'react'
import CustomDropdown from '../../Interface/CustomDropdown/CustomDropdown'
import Button from '../../Interface/CustomButtons/Button'
import { zeroPad } from '../../../utils/padding'
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { Grid } from '@material-ui/core';
//import GridItem from "../../Interface/Grid/GridItem.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import NewAppointmentContainer from './NewAppointmentContainer';
import customDropdownStyle from '../../Interface/Assets/customDropdownStyle';


export class SmartOutPut extends Component {
    render() {
        const { values } = this.props;
        return (
            <Grid container spacing={0}
                direction="row"
                alignItems="center"
                justify="center">
                {values.Smartdata.smartData.map((smart, m) => {
                    console.log("smart", smart)
                    if (isEmpty(smart.Free)) { return null }
                    const Content = smart.Free.map((free, i) => {
                        const thisKey = `${m.toString()}${i.toString()}`
                        return (
                            <Button
                                color="CMI"
                                simple
                                block
                                onClick={this.props.setAppointment}
                                date={smart.Date}
                                shour={free._start._hour}
                                sminute={free._start._minute}
                                ehour={free._end._hour}
                                emminute={free._end._minute}
                            >
                                {free._start._hour}:
                          {zeroPad(free._start._minute, 2)} {" - "}
                                {free._end._hour}:
                          {zeroPad(free._end._minute, 2)}
                            </Button>

                        );
                    })
                    return (
                        <CustomDropdown
                            key={m}
                            buttonText={(new Date(smart.Date) + " ").slice(0, 15)}
                            dropdownList={Content}
                            buttonProps={{
                                color: "success"
                            }}
                        />)
                })}
            </Grid>
        )
    }
}


//export default SmartOutPut

export default SmartOutPut
