import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusinessById } from "../../actions/businessActions";

import SetFStep from "./SetFStep";
import SetSecStep from "./SetSecStep";
import SetThirdStep from "./SetThirdStep";
import SetSmartSecStep from "./SetSmartSecStep";

import { convertToUtcTime } from "../../utils/date";
import axios from "axios";
import { API } from "../../consts";
import SetSmartThirdStep from "./SetSmartThirdStep";

class NewAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      pickedService: "NULL",
      date_from: "",
      date_until: "",
      services: [],
      onBusiness: { profile: { services: [] } },
      Dates: "",
      date: "",
      shour: "",
      sminute: "",
      ehour: "", //{free._start}
      eminute: "", //{free._end}
      Smartdata: []
    };
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePickedService = this.handlePickedService.bind(this);
  }

  componentDidMount() {
    console.log("componentdidmount");
    const id = this.props.match.params.id;
    this.props.getBusinessById(id);
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };
  toSmart = () => {
    //const { step } = this.state;
    this.setState({ step: 6 });
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  preSetAppointment = e => {
    console.log("here");
  };
  handlePickedService = e => {
    console.log("pick Service handler called");
    this.setState({ pickedService: e.target.value });
  };
  setAppointment = e => {
    console.log("set appointment");
    const { step } = this.state;
    const { business } = this.props;
    //request
    const shour = e.target.getAttribute("shour");
    const date = e.target.getAttribute("date");
    const sminute = e.target.getAttribute("sminute");
    const ehour = e.target.getAttribute("ehour");
    const eminute = e.target.getAttribute("emminute");
    console.log(shour, date, sminute, ehour, eminute);
    axios
      .post(`${API}/appointments/setAppointment/`, {
        businessId: business._id,
        costumerId: this.props.auth.user.sub,
        service: [this.state.pickedService],
        date: date,
        shour: shour, //need,
        sminute: sminute, //need,
        ehour: ehour,
        eminute: eminute
      })
      .then(response => {
        //	this.setState({ dates: response.data });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.setState({ step: step + 1 });
      });
  };

  // smart function call anxsso
  getSmart = e => {
    const timeScope = e.target.getAttribute("timeScope");
    const { step } = this.state;
    const { business } = this.props;
    console.log(
      "businessId",
      business._id,
      "servicesArr",
      [this.state.pickedService],
      "customerId",
      this.props.auth.user.sub,
      "timeScop",
      Number(timeScope)
    );
    axios
      .post(`${API}/algorithms/smart`, {
        businessId: business._id,
        servicesArr: [this.state.pickedService],
        customerId: this.props.auth.user.sub,
        timeScope: Number(timeScope)
      })
      .then(response => {
        this.setState({ Smartdata: response.data });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.setState({ step: step + 1 });
      });
  };

  getFreeTime = e => {
    const { step } = this.state;
    const { business } = this.props;
    axios
      .post(`${API}/algorithms/freetime`, {
        business: business._id,
        services: [this.state.pickedService],
        date_from: this.state.date_from,
        date_until: this.state.date_until
      })
      .then(response => {
        this.setState({ dates: response.data });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.setState({ step: step + 1 });
      });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("set appointment");
  };

  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <SetFStep
            nextStep={this.nextStep}
            toSmart={this.toSmart}
            handleChange={this.handleChange}
            handlePickedService={this.handlePickedService}
            values={this.state}
          />
        );
      case 2:
        return (
          <SetSecStep
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            freeTime={this.getFreeTime}
            values={this.state}
          />
        );
      case 3:
        return (
          <SetThirdStep
            values={this.state}
            handleSubmit={this.handleSubmit}
            prevStep={this.prevStep}
            setAppointment={this.setAppointment}
            preSetAppointment={this.preSetAppointment}
          />
        );
      case 4:
        return <div>hey</div>;

      case 6:
        return (
          <SetSmartSecStep
            values={this.state}
            handleSubmit={this.handleSubmit}
            getSmart={this.getSmart}
            prevStep={this.prevStep}
            setAppointment={this.setAppointment}
            preSetAppointment={this.preSetAppointment}
          /> /// SecondstepSmart
        );
      case 7:
        return (
          <SetSmartThirdStep
            values={this.state}
            handleSubmit={this.handleSubmit}
            prevStep={this.prevStep}
            setAppointment={this.setAppointment}
          />
        );
    }
  }
}
NewAppointment.propTypes = {
  auth: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
  getBusinessById: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  business: state.business.business
});

export default connect(
  mapStatetoProps,
  { getBusinessById }
)(NewAppointment);
