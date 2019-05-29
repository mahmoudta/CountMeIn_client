import React, { Component } from "react";

export class SetSmartSecStep extends Component {
  render() {
    const { values } = this.props;
    console.log(values);
    return (
      <section className="mt-5">
        <div className="container">
          <div className="col-12 col-lg-8 mx-auto">
            <div className="card">
              <div className="card-header text-uppercase">Smart Schedule </div>
              <div className="card-body">
                <form>
                  <small className="mb-2">I Prefer Appointment in the </small>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.props.getSmart}
                    timeScope={0}
                  >
                    Morning
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.props.getSmart}
                    timeScope={1}
                  >
                    Afternoon
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.props.getSmart}
                    timeScope={2}
                  >
                    Evening
                  </button>
                </form>
                <div className="col-12">
                  {<p className="my-3">You have choosed</p>}
                </div>
              </div>
              <div className="card-footer" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SetSmartSecStep;
