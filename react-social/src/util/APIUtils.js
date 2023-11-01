import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getDiaryInfo(currentUser) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/auth/checkDiary",
        method: 'GET',
        body: JSON.stringify(userResponse)
    });
}


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}


export function newdiary(newDiaryRequest) {
    return request({
        url: API_BASE_URL + "/auth/newdiary",
        method: 'POST',
        body: JSON.stringify(newDiaryRequest)
    });
}


export function joindiary(newDiaryRequest) {
    return request({
        url: API_BASE_URL + "/auth/joindiary",
        method: 'POST',
        body: JSON.stringify(newDiaryRequest)
    });
}

export function diaryhome(newDiaryRequest) {
    return request({
        url: API_BASE_URL + "/auth/diaryhome",
        method: 'POST',
        body: JSON.stringify(newDiaryRequest)
    });
}

export function opendiary(input) {
    return request({
        url: API_BASE_URL + "/opendiary",
        method: 'POST',
        body: JSON.stringify({diaryId: input})
    });
}

export function writediary(newDiaryRequest, imageBlobURL) {
    return fetch(imageBlobURL)
        .then(response => response.blob())
        .then(blob => {
            const imageFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            const formData = new FormData();
            formData.append('diaryData', JSON.stringify(newDiaryRequest));
            formData.append('image', imageFile);

            const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve the token from localStorage

            if (!token) {
                // Handle the case where the token is not available
                return Promise.reject(new Error('Token not found in localStorage'));
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            return request({
                url: API_BASE_URL + "/writediary",
                method: 'POST',
                headers: headers,
                body: formData,
                contentType: 'multipart/form-data',
            });
        })
        .catch(error => {
            console.error('Error fetching and converting image blob:', error);
            return Promise.reject(error);
        });
}

