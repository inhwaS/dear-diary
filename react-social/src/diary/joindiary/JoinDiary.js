import React, { Component } from 'react';
import { joindiary } from '../../util/APIUtils';
import './JoinDiary.css';
import Alert from 'react-s-alert';
import { ACCESS_TOKEN } from '../../constants'; // Import ACCESS_TOKEN

class JoinDiary extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
                <div className="container">
                    <div class="page-not-found">
                        <h2>Welcome to Dear Diary! </h2>
                        <h3>Please enter the diary code that was shared by your partner.</h3>
                        <div className="newdiary-info">
                            <JoinDiaryForm currentUser={this.props.currentUser} {...this.props} />
                        </div>
                    </div>
                </div>
        );
    }
}



class JoinDiaryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.currentUser.email,
            diaryId: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { currentUser } = this.props; // Access currentUser prop

        const newDiaryRequest = Object.assign({}, this.state);
        console.log(newDiaryRequest);

        joindiary(newDiaryRequest)
        .then(response => {
            console.log("Response from server:", response);

            // Extract the diaryId from the response (assuming it's named diaryId)
            const diaryId = response.id;

            currentUser.diaryId = diaryId;

            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            Alert.success("Diary created successfully!");
            // Use history.push to navigate to the showDiary page with the diaryId as a URL parameter
            this.props.history.push("/");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="diaryId"
                            className="form-control" placeholder="Paste diary id here"
                            value={this.state.begindt} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Join Our Diary</button>
                </div>
            </form>
        );
    }
}


export default JoinDiary