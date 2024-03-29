import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/books',
    headers: {
        'Content-type': 'application/json'
    }
});

export default API;
