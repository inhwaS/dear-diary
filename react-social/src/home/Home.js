import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="container">
                    <div className="graf-bg-container">
                        <div className="graf-layout">
                            <button>Make a New Diary</button>
                            <button>Join Our Diary</button>

                        </div>
                    </div>
                    <h1 className="home-title">Spring Boot React OAuth2 Social Login Demo</h1>
                </div>
            </div>
        )
    }
}

export default Home;