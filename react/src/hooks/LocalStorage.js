if (!localStorage['token']) {
    localStorage['token'] = JSON.stringify({});
}


class LocalStorage {

    static GetToken() {
        return  localStorage['token'];
    }
    static SetToken(token) {
        localStorage['token'] = token;
    }
    
}

export { LocalStorage }