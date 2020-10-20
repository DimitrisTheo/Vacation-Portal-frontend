import http from './api';

class AuthService {
    login(user) {
        return http
            .post('/', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
    }
    // register(user) {
    //     return http.post('api/auth/signup', {
    //         email: user.email,
    //         password: user.password
    //     });
    // }

    // handleResponse(response) {
    //     return response.text().then(text => {
    //         const data = text && JSON.parse(text);
    //         if (!response.status) {
    //             if (response.status === 401) {
    //                 // auto logout if 401 response returned from api
    //                 this.logout();
    //             }
    //
    //             const error = (data && data.message) || response.statusText;
    //             return Promise.reject(error);
    //         }
    //
    //         return data;
    //     });
    // }

}

export default new AuthService();