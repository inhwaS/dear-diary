import React, { Component } from 'react';
import './ShowDiary.css';
import Alert from 'react-s-alert';
import { ACCESS_TOKEN } from '../../constants'; // Import ACCESS_TOKEN

class ShowDiary extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="page-not-found">
                        <div class="desc">
                            <h2>You are all set! </h2>
                            <h3>Invite your partner with code below:</h3>
                            <div>
                                <input type="text" className="field" value={this.props.location.pathname.split("/")[2]}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowDiary