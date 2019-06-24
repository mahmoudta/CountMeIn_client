import React, { Component } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';


export class SelectServices extends Component {
    render() {
        const { values, selectedOptions } = this.props;
        console.log("values", values)
        return (
            <div>
                <Select
                    options={values.Options}
                    value={selectedOptions}
                    isMulti
                    name="services"
                    components={makeAnimated()}
                    closeMenuOnSelect={false}
                    onChange={this.props.handleSelectChange}
                />            </div>
        )
    }

}

export default SelectServices
