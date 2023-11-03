import React, { Component } from 'react';
import './Home.css';
import { diaryhome } from '../util/APIUtils';
import logosm from '../img/logo_sm.png';
import diaryimage from '../img/diary.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ShowDiary from '../diary/showdiary/ShowDiary';
import {
  Route,
  Switch
} from 'react-router-dom';

class DiaryHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diaryData: null,
            currentUser: this.props,
        };
    }

    componentDidMount() {
        const { currentUser } = this.props; // Access currentUser prop

        const newDiaryRequest = Object.assign({}, currentUser);

        // For example, you can make an API call here:
        diaryhome(newDiaryRequest)
        .then(response => {
            this.setState({ diaryData: response }); // Update the state with response data
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
    }
    render() {
        const { diaryData, currentUser } = this.state; // Access diaryData from state
        return (
            <Container className="app-nav">
                {diaryData && diaryData.diaryId ? (
                    <div>
                        <div className="page-not-found">
                            <nav className="app-nav">
                                <ul className="navbar-nav row justify-content-center" id="margin-please">
                                    <li className="nav-item col-md-4">{diaryData.name}</li>
                                    <li className="nav-item col-md-4">
                                        <img className="logosm" src={logosm} alt="Logo" />
                                    </li>
                                    <li className="nav-item col-md-4">{diaryData.pname}</li>
                                </ul>
                            </nav>
                        </div>
                        <div className="inner-block-dates">
                            <p className="nav-item col-md-4">{diaryData.begindt} • {diaryData.days} days</p>
                        </div>
                        <div className="inner-block-image">
                            <a href="/opendiary">
                                <img className="diary-image" src={diaryimage} alt="Diary" />
                            </a>
                        </div>
                        <div className="inner-block-new">
                            <div className="social-login">
                                <a className="btn btn-block social-btn google" href="/writediary">New Entry </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="profile-container">
                        <div className="container">
                            <div className="page-not-found">
                                <div class="desc">
                                    <h3>Waiting for your partner to join... </h3>
                                    <h4>Invite your partner with code below:</h4>
                                    <div>
                                        <input type="text" className="field" value={currentUser.currentUser.diaryId} readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        );
    }
}

export default DiaryHome;