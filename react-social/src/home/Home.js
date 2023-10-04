import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
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
        )
    }
}

export default Home;