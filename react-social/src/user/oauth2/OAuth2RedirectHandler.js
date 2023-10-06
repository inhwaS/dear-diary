import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'
import { getCurrentUser } from '../../util/APIUtils';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
//        const error = this.getUrlParameter('error');

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            getCurrentUser()
            .then(userResponse => {
                console.log(userResponse);
                this.setState({
                    currentUser: userResponse,
                    authenticated: true,
                    loading: false
                });
                this.props.history.push("/",  { currentUser: userResponse });
                window.location.reload();
            })
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;