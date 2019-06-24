import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';



class SetFStep extends Component {
  constructor(props) {

    super(props);

  }
  // componentDidMount() {
  //   this.props.fillServices();
  // }

  render() {
    const { values, selectedOptions } = this.props;


    //console.log(this.props);
    // console.log(values.onBusiness);
    const empty = isEmpty(values.Options);
    console.log("Options", values.Options)
    // console.log("empty", values);
    return (
      <section className="mt-5">
        <div className="container">
          {!empty ? (
            <div className="col-12 col-lg-8 mx-auto">
              <div className="card">
                <div className="card-header text-uppercase">
                  Set Appointment{" "}
                </div>
                <div className="card-body">
                  <form>
                    <small className="mb-2">Please Select Services .</small>
                    <div className="form-group">
                      <label className="text-uppercase" htmlFor="services">
                        Services
                        <span className="form-required" />
                      </label>
                      <Select
                        options={values.Options}
                        value={selectedOptions}
                        isMulti
                        name="services"
                        components={makeAnimated()}
                        closeMenuOnSelect={false}
                        onChange={this.handleChange}
                      />
                    </div>
                  </form>
                  <div className="col-12">
                    {<p className="my-3">You have choosed</p>}
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={this.props.prevStep}
                  >
                    previous
                  </button>
                  <button
                    className="btn btn-sm btn-success float-right"
                    onClick={this.props.toSmart}
                  >
                    Smart
                  </button>
                  <button
                    className="btn btn-sm btn-primary float-right"
                    onClick={this.props.nextStep}
                  >
                    Regular
                  </button>
                </div>
              </div>
            </div>
          ) : (
              <div>Loading</div>
            )}
        </div>
      </section>
    );
  }

}
SetFStep.propTypes = {
  business: PropTypes.object.isRequired
};

const mapStatetoProps = (state) => ({
  business: state.business.business,
  businessLoading: state.business.loading
});

export default connect(mapStatetoProps, {})(SetFStep);
