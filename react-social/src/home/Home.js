import React, { Component } from 'react';
import './Home.css';
import { getDiaryInfo } from '../util/APIUtils';
import logo from '../img/logo.png';
import DiaryHome from './DiaryHome';
import {
  Route,
  Switch
} from 'react-router-dom';


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
                <Route
                    render={(props) => (
                        <DiaryHome currentUser={currentUser}/>
                    )}
                />
            );
        } else {
            // If currentUser is not defined or does not have a name, it's not valid
            return (
                <div class="home-container">
                    <div className="container">
                        <div class="graf-sm-container">
                            <img class="logo" src={logo}/>
                        </div>
                        <div className="graf-bg-container">
                            <div className="graf-layout">
                                <div className="social-login">
                                    <a className="btn btn-block social-btn google" href="/newdiary">
                                        Make a New Diary</a>
                                </div>
                                <div className="social-login">
                                    <a className="btn btn-block social-btn google" href="/joindiary">
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