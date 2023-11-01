import React, { Component } from 'react';
import './Home.css';
import { diaryhome } from '../util/APIUtils';
import logosm from '../img/logo_sm.png';
import diaryimage from '../img/diary.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class DiaryHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diaryData: null
        };
    }

   componentDidMount() {
        const { currentUser } = this.props; // Access currentUser prop

        const newDiaryRequest = Object.assign({}, currentUser);

        // This code will run when the component has been mounted to the DOM.
        // You can perform any page load actions or data fetching here.
        console.log('Page has loaded.');

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
        const { diaryData } = this.state; // Access diaryData from state
//        const { pname } = this.state.pname;
//        const title = diaryData.pname;

        return (
            <Container className="app-nav">
                {diaryData ? (
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
                    <div className="inner-block-image">
                      <a href="/opendiary">
                        <img className="diary-image" src={diaryimage} alt="Diary" />
                      </a>
                    </div>
                    <div className="inner-block">
                        <div className="new-entry-button">
                             <div className="social-login">
                                <a className="btn btn-block social-btn google" href="/writediary">New Entry </a>
                            </div>
                        </div>
                    </div>
                </div>
                ) : (
                    <p></p>
                )}
            </Container>
        );
    }
}

export default DiaryHome;