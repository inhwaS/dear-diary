import React, { Component } from 'react';
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
            email: this.props.currentUser.email,
            begindt: ''
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

        writediary(newDiaryRequest)
        .then(response => {
            console.log("Response from server:", response);

            // Extract the diaryId from the response (assuming it's named diaryId)
            const diaryId = response.id;

            currentUser.diaryId = diaryId;

            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            Alert.success("Diary created successfully!");
            // Use history.push to navigate to the showDiary page with the diaryId as a URL parameter
            this.props.history.push(`/showDiary/${diaryId}`);
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
                    <textarea className="form-textarea" name="content" required></textarea>
                    <DisplayImage required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Create</button>
                </div>
            </form>
        );
    }
}

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

   // if we are using arrow function binding is not required
   //  this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <div>
          <h1></h1>
            <img length="100%" width="100%" src={this.state.image} />
            <h1></h1>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default WriteDiary