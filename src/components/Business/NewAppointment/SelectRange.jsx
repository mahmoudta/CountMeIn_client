import React, { Component } from 'react'
import GridItem from '../../Interface/Grid/GridItem';
import { Button, Grid } from '@material-ui/core';


export class SelectRange extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { values, selectedOptions } = this.props;
        //console.log("values", values)
        return (
            <Grid container spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
            >


                <button
                    type="button"
                    className="btn btn-secondary  d-block"
                    onClick={this.props.getSmart}
                    data-timescope={0}
                >
                    Morning
                      </button>

                <button
                    type="button"
                    className="btn btn-secondary d-block "
                    onClick={this.props.getSmart}
                    data-timescope={1}
                >
                    Afternoon
                      </button>

                <button
                    type="button"
                    className="btn btn-secondary  d-block"
                    onClick={this.props.getSmart}
                    data-timescope={2}
                >
                    Evening
                      </button>

            </Grid>

        )
    }
}

export default SelectRange
