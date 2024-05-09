import { LocalStorage }  from './LocalStorage';

const WEB_URL = 'http://192.168.74.57:3000'
const API_URL = 'http://192.168.74.57:8080';

class AuthDB {

    static async Registry(user) {
        console.log(`${API_URL}/auth/reg/`);
        return await AuthDB.Request(`${API_URL}/auth/reg/`, 'POST', user);
    }

    static async Login(user) {
        return await AuthDB.Request(`${API_URL}/auth/login/`, 'POST', user);
    }

    static async GetUserInfo() {
        return await AuthDB.Request(`${API_URL}/auth/users/`, 'GET', null, LocalStorage.GetToken());
    }

    static async UpdateUserInfo(user) {
        return await AuthDB.Request(`${API_URL}/auth/users/`, 'POST', user, LocalStorage.GetToken());
    }

    static async Redirect() {

        function changeWindowLocation(location) {
            let currentLocation = window.location.href.replace(WEB_URL, '');
            if (currentLocation !== location) {
                window.location.replace(location)
            }
        }

        await AuthDB.Request(`${API_URL}/auth/token/`, 'GET', null, LocalStorage.GetToken()).then(responseData => {
            if (responseData === null || responseData['token'] === null) {
                LocalStorage.SetToken('');
                if (window.location.href !== `${WEB_URL}/`)
                    window.location.replace('/');
                return;
            }

            LocalStorage.SetToken(responseData['token']);
    
            if (responseData['role'] === 'ROLE_USER' && window.location.href === `${WEB_URL}/`)
                changeWindowLocation('/polls/')
        });
        
    }
    

    static async Request(url, method = 'GET', bodyObj = null, token = null) {
        
        let result = null;
        let obj = {};

        obj['method'] = method;
        
        obj['headers'] = {};
        obj['headers']['Content-type'] = 'application/json';

        if (token) obj['headers']['Authorization'] = `Bearer ${token}`;
            
        if (bodyObj) obj['body'] = JSON.stringify(bodyObj);
        
        await fetch(url, obj).then(async (response) => {
            console.log(response)
            if (response.ok)
                await response.json().then(data => {
                    console.log(data);
                    result = data;
                })
            else 
                response.text().then(console.log)
        });

        return result;

    }

}

export { AuthDB }