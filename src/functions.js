import axios from "axios";

export const url = 'http://localhost:8000/'

export const token = localStorage.getItem('demo_token') ? localStorage.getItem('demo_token') : ""

export const login = async () => {

    var FormData = require('form-data');
    var data = new FormData();
    data.append('username', 'admin');
    data.append('password', '123123');

    var config = {
        method: 'post',
        url: url + 'jwt/api/token/',
        headers: {},
        data: data
    };

    let res = await axios(config)
        .then(function (response) {
            localStorage.setItem('demo_token', response.data.access)
            console.log(JSON.stringify(response.data.access));
            return response.data.access
        })
        .catch(function (error) {
            console.log(error);
            return false
        });

    return res

}
export const logout = () => {
    console.log("login worked");
    var FormData = require('form-data');
    var data = new FormData();
    data.append('username', 'admin');
    data.append('password', '123123');

    var config = {
        method: 'post',
        url: url + 'jwt/api/token/',
        headers: {},
        data: data
    };

    axios(config)
        .then(function (response) {
            localStorage.setItem('demo_token', response.data.access)
            console.log(JSON.stringify(response.data.access));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const fetchdata = () => {

    var config = {
        method: 'get',
        url: url + 'notes/',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    };

    let res = axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return []
        });

    return res
}

export const add = (data) => {


    console.log("Heading ", data.heading)
    let heading = data.heading;
    let description = data.description;
    var FormData = require('form-data');
    var data = new FormData();
    data.append('heading', heading);
    data.append('description', description);
    data.append('note_background_color', '#EFEFEF');


    var config = {
        method: 'post',
        url: url + 'notes/',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        data: data
    };

    let result = axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            let res = 1
        })
        .catch(function (error) {
            console.log(error);
            let res = 0
        });
    return result
}

export const edit = (data) => {


    console.log("Heading ", data.heading)

    let id = data.id;
    let heading = data.heading;
    let description = data.description;

    var FormData = require('form-data');
    var data = new FormData();

    data.append('id', id);
    data.append('heading', heading);
    data.append('description', description);
    data.append('note_background_color', '#EFEFEF');


    var config = {
        method: 'put',
        url: url + 'notes/',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        data: data
    };

    let result = axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            let res = 1
        })
        .catch(function (error) {
            console.log(error);
            let res = 0
        });
    return result
}

export const remove = (id) => {
    // alert(id)
    // return 0

    var data = new FormData();

    var config = {
        method: 'delete',
        url: url + 'notes/?id=' + JSON.stringify([id]),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('demo_token'),
        },
        data: data
    };

    let res = axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return 1
        })
        .catch(function (error) {
            console.log(error);
            return 0
        });
    return res
}