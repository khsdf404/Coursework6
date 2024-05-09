import { LocalStorage } from './LocalStorage';

const API_URL = 'http://localhost:8080';

class PollsDB {

    static async GetUserdata() {
        await PollsDB.CheckToken();
        return await PollsDB.Request('/auth/users/', 'GET', null, LocalStorage.GetToken());
    }

    static async PostUserdata(obj) {
        await PollsDB.CheckToken();
        return await PollsDB.Request('/auth/users/', 'PUT', obj, LocalStorage.GetToken());
    }

    static async DeletePoll(link) {
        await PollsDB.CheckToken();
        return await PollsDB.Request(`${API_URL}/api/polls/${link}/`, 'DELETE', null, LocalStorage.GetToken());
    }
    static async PostPoll(obj) {
        await PollsDB.CheckToken();
        console.log(LocalStorage.GetToken())
        return await PollsDB.Request(`${API_URL}/api/polls/`, 'POST', obj, LocalStorage.GetToken());
    }

    static async GetUserPolls() {
        await PollsDB.CheckToken();
        return await PollsDB.Request(`${API_URL}/api/polls/all/`, 'GET', null, LocalStorage.GetToken());
    }





    static async CheckToken() {
        let tokenObj = await PollsDB.Request(`${API_URL}/auth/token/`, 'GET', null, LocalStorage.GetToken());
        if (tokenObj['token'] == null) {
            window.location.replace('/');
            return;
        }
        LocalStorage.SetToken(tokenObj['token']);
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


export { PollsDB }