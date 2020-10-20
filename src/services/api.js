import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-type': 'application/json'
    }
});

api.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        // console.log(error.response.data);
        // alert(error)
        if (error.response) {
            return Promise.reject(error);
        }
        else alert("Server Error! Please try again...");
    }
);

export default api;