import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";

export default class SetThirdStep extends Component {
  componentDidMount = async () => {
    console.log("im here");
  };

  render() {
    //console.log(this.props);

    const { values } = this.props;
    console.log("values ", values);
    return (
      <section className="mt-5">
        <div className="container">
          <div className="col-12 col-lg-8 mx-auto">
            <div className="card">
              <div className="card-header text-uppercase">Set Appointment </div>
              <div className="card-body">
                <small className="mb-2">Step 3</small> <br />
                <div className="row">
                  {values.dates.dates.map(dates => {
                    return (
                      <div className="col">
                        <div className="btn-group-vertical">
                          {dates.Date.slice(0, 10)}
                          {console.log(dates.Date)}
                          {dates.Free.map((free, i) => {
                            return (
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.props.setAppointment}
                                date={dates.Date}
                                shour={free._start._hour}
                                sminute={free._start._minute}
                                ehour={free._end._hour}
                                emminute={free._end._minute}
                              >
                                {free._start._hour}:{free._start._minute}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* 
                                //<button type="button" class="btn btn-secondary">
									//dates.free
									//	</button>
                                <div class="btn-group-vertical">
									day 1
									<button type="button" class="btn btn-secondary">
										1
									</button>
									<button type="button" class="btn btn-secondary">
										1
									</button>
									<button type="button" class="btn btn-secondary">
										1
									</button>
									<button type="button" class="btn btn-secondary">
										1
									</button>
								</div> */}
                <div className="col-12">
                  {<p className="my-3">You have choosed</p>}
                </div>
              </div>
              <div className="card-footer">
                {/* <button className="btn btn-sm btn-secondary" onClick={this.props.prevStep}>
									previous
								</button>

								<button className="btn btn-sm btn-primary float-right" onClick={this.props.nextStep}>
									Show me free Time
								</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
