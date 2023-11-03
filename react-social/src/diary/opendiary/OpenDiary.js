import React, { Component } from 'react';
import { opendiary } from '../../util/APIUtils';
import './OpenDiary.css';
import Alert from 'react-s-alert';
import { ACCESS_TOKEN } from '../../constants';

class OpenDiary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diaryId: this.props.currentUser.diaryId,
            images: [] // Initialize an empty array to store the fetched images.
        };
    }

    componentDidMount() {
        const { diaryId } = this.state;
        opendiary(diaryId)
        .then(data => {
            this.setState({ images: data });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Alert.error('Error fetching data. Please try again.');
        });
    }

    render() {
        return (
            <div className="container">
                <div className="diary-body">
                    {this.state.images.map(image => (
                        <ul key={image.id}>
                            <p className="control"> {image.begindt} </p>
                            <p className="control-content">{image.writer}: {image.content} </p>
                            <div className="image-container">
                                <img
                                    src={`data:${image.type};base64,${image.picByte}`}
                                    alt={image.content}
                                />
                            </div>
                              <span class="dot"></span>
                              <span class="dot"></span>
                              <span class="dot"></span>
                              <span class="dot"></span>
                        </ul>
                    ))}
                    <div className="inner-block">
                        <div className="new-entry-button">
                            <div className="social-login">
                                <a className="btn btn-block social-btn google" href="/writediary">New Entry</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OpenDiary;
