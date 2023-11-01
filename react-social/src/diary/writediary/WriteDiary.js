import React, { Component } from 'react';
import { writediary } from '../../util/APIUtils';
import './WriteDiary.css';
import Alert from 'react-s-alert';
import { ACCESS_TOKEN } from '../../constants'; // Import ACCESS_TOKEN

class WriteDiary extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="container">
                <div className="page-not-found">
                    <h2>Leave your moment</h2>
                    <div className="newdiary-info">
                        <NewDiaryForm currentUser={this.props.currentUser} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}


class NewDiaryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diaryId: this.props.currentUser.diaryId,
            writer: this.props.currentUser.name,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Add a new state property to hold the selected image file
    state = {
        diaryId: this.props.currentUser.diaryId,
        image: null, // Initialize as null
        begindt: null,
        content: '',
    };

    handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const imageUrl = URL.createObjectURL(img);
            console.log("Image URL:", imageUrl);
            this.setState({
                image: imageUrl,
            });
        }
    };


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
        // Access currentUser and newDiaryRequest from the component's state
        const { currentUser } = this.props; // Access currentUser from props
        const { image, begindt, content } = this.state; // Access the selected image and other form field values from the state

        // Create a request object with all the data you want to send
        const newDiaryRequest = {
            diaryId: currentUser.diaryId,
            begindt,
            content,
        };

        writediary(newDiaryRequest, image)
        .then(response => {
            console.log("Response from server:", response);

            // Extract the diaryId from the response (assuming it's named diaryId)
            const diaryId = response.id;

            currentUser.diaryId = diaryId;

//            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
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
                    <input type="date" name="begindt"
                            className="form-control" placeholder="Today's date"
                            value={this.state.begindt} onChange={this.handleInputChange} required/>
                    <h1></h1>
                    <textarea className="form-textarea" name="content" value={this.state.content} onChange={this.handleInputChange} required></textarea>
                    <img width="100%" height="100%" src={this.state.image} />

                    <h1></h1>
                    <input type="file" name="myImage" accept="image/*" onChange={this.handleImageChange} />

                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Create</button>
                </div>
            </form>
        );
    }
}

export default WriteDiary