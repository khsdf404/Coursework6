import { LocalStorage } from './LocalStorage';

const baseURL = 'http://localhost:8080';

class ReplyDB {

    static async GetReply(link) {
        let obj = {};

        let reply = await ReplyDB.Request(`${baseURL}/api/reply/${link}/`);
        obj['answers'] = reply.answers;
        obj['pollLink'] = reply.pollLink;

        let poll = await ReplyDB.Request(`${baseURL}/api/polls/public/${reply.pollLink}/`, 'GET', null, LocalStorage.GetToken());
        obj['questions'] = poll.questions;

        try {
            poll = await ReplyDB.Request(`${baseURL}/api/polls/private/${reply.pollLink}/`, 'GET', null, LocalStorage.GetToken());
            obj['rightAnswers'] = poll.answers;
        } catch (e) {
            obj['rightAnswers'] = null;
        };

        return obj;
    }

    static async GetPoll(link) {
        return await ReplyDB.Request(`${baseURL}/api/polls/public/${link}/`);
    }

    static async PostReply(obj) {
        return await ReplyDB.Request(`${baseURL}/api/reply/`, 'POST', obj);
    }

    static async GetReplyList(link) {
        // await ReplyDB.CheckToken();
        return await ReplyDB.Request(`${baseURL}/api/reply/byParent/${link}/`, 'GET', null, LocalStorage.GetToken())
    }

    

    static async CheckToken() {
        let tokenObj = await ReplyDB.Request('/auth/token/', 'GET', null, LocalStorage.GetToken());
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

export { ReplyDB };