import React, { Component } from 'react';
import './Home.css';
import { getDiaryInfo } from '../util/APIUtils';

class Home extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const { currentUser } = this.props;

        if (currentUser && currentUser.diaryId) {
            // If currentUser is defined and has a name, it's valid
            return (
                <div>welcome!</div>
            );
        } else {
            // If currentUser is not defined or does not have a name, it's not valid
            return (
                <div className="home-container">
                    <div className="container">
                        <div className="graf-bg-container">
                            <h1 className="home-title">Dear Diary for Us</h1>

                            <div className="graf-layout">
                                <div className="social-login">
                                    <a className="btn btn-block social-btn google" href="/newdiary">
                                        Make a New Diary</a>
                                </div>

                                <div className="social-login">
                                    <a className="btn btn-block social-btn google" href="/newdiary">
                                        Join Our Diary</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Home;