import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Swal from "sweetalert2";
import { deleteFlashMessage } from "../../actions/flashMessageActions";
import { unFollowBusiness } from "../../actions/businessActions";
import { Redirect } from "react-router";
class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.makeAction = this.makeAction.bind(this);
  }

  makeAction = action => {
    console.log("makeaction");
    // const action = this.props.flashMessage[0].action;
    switch (action.next) {
      case "UNFOLLOW_BUSINESS":
        console.log("here");
        console.log(action.business_id);
        this.props.unFollowBusiness(action.business_id);
        break;
      case "REDIRECT_TO_PAGE":
        this.context.router.history.push(action.path);
        break;
      case "REDIRECT_TO_DASHBAORD":
        this.context.router.history.push("/dashboard");
        break;
      case "FIRE_ANOTHER_ALERT":
        break;
      default:
        this.props.deleteFlashMessage();
    }
  };
  /* confirmButtonColor: '#5eba00' */
  render() {
    const { flashMessage } = this.props;
    return (
      <div>
        {!isEmpty(flashMessage) &&
          flashMessage.map(message => {
            Swal.fire({
              title: message.type,
              text: message.text,
              type: message.type,
              confirmButtonText: message.action.confirmText
                ? message.action.confirmText
                : "Done",
              showCancelButton: message.action.CancelButton
                ? message.action.CancelButton
                : false,
              buttonsStyling: false,
              customClass: {
                confirmButton: `btn mx-5 shadow ${
                  message.type.toLowerCase() === "warning"
                    ? "btn-danger"
                    : "btn-primary"
                }`,
                cancelButton: "btn mx-5 btn-secondary shadow"
              }
            }).then(res => {
              this.props.deleteFlashMessage();
              if (res.value) {
                console.log("res");
                this.makeAction(message.action);
              } else {
                console.log("else");
              }
            });
          })}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  flashMessage: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
  unFollowBusiness: PropTypes.func.isRequired
};
FlashMessage.contextTypes = {
  router: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  flashMessage: state.flashMessage
});
export default connect(
  mapStatetoProps,
  { deleteFlashMessage, unFollowBusiness }
)(FlashMessage);
