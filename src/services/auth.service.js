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

}

export default new AuthService();