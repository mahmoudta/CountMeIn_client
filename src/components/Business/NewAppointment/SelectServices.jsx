import React, { Component } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';



export class SelectServices extends Component {
    render() {
        const { values } = this.props;
        return (
            <div>
                <Select
                    options={values.Options}
                    value={values.selectedOptions}
                    isMulti
                    name="services"
                    components={makeAnimated()}
                    closeMenuOnSelect={false}
                    onChange={(e) => { this.props.handleSelectChange(e) }}
                />            </div>
        )
    }

}

export default SelectServices
