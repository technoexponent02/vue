import axios from 'axios';
import {config} from './config';

export const HTTP = axios.create({
    baseURL: `${config.site_url}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': "{!! csrf_token() !!}"
    }
})

export let TOKEN;

if(JSON.parse(localStorage.getItem('tootellaUser')) != null){
    TOKEN = JSON.parse(localStorage.getItem('tootellaUser')).api_token;
}


export const AUTH_DATA = JSON.parse(localStorage.getItem('tootellaUser'));


HTTP.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        // alert('In')
        localStorage.removeItem('tootellaUser');
        window.location.href = '/';
    } else {
        return Promise.reject(error);
    }
});


