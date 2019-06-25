import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div className="d-flex w-100 justify-content-center align-items-center" >
                <div className="row">
                    <div className="col-4 mx-auto">
                        <img className="img-fluid" src={process.env.PUBLIC_URL + '/loading.gif'} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Loading;
