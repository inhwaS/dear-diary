import React, { Component } from 'react';
import { showdiary } from '../../util/APIUtils';
import './ShowDiary.css';
import Alert from 'react-s-alert';
import { ACCESS_TOKEN } from '../../constants'; // Import ACCESS_TOKEN

class ShowDiary extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

//    componentDidMount() {
//        // Call the handleSubmit function when the component is mounted (page is loaded)
//        this.handleSubmit();
//    }
//
//    handleSubmit(event) {
//        const { location } = this.props;
//        const key = location.key;
//
//        showdiary(key)
//        .then(response => {
//            console.log("Response from server:", response);
//
//            // Extract the diaryId from the response (assuming it's named diaryId)
//            const diaryId = response.id;
//
//            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
//
//            // Use history.push to navigate to the showDiary page with the diaryId as a URL parameter
//            this.props.history.push(`/`);
//        }).catch(error => {
//            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
//        });
//    }

    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <p>SHOW YOUR DIARY HERE</p>
                </div>
            </div>
        );
    }


}

export default ShowDiary