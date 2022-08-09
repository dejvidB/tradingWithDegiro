const DeGiro = require('degiro-api').default;

class User{
    constructor(){
        this.username = '';
        this.password = '';
    }

    login = async () => {
        const degiro = DeGiro.create({ 
            username: this.username,
            pwd: this.password,
            jsessionId: this.jsessionId 
        });

        if(!await degiro.isLogin({ secure: true })){
            await degiro.login();
            this.jsessionId = degiro.getJSESSIONID();
            this.degiroInstance = degiro;

            console.log("Logged in with session id: " + this.jsessionId);
        }

        return this.jsessionId;
    }

    loadData = async () => {
        const cashFunds = await this.degiroInstance.getCashFunds();
        console.log(JSON.stringify(cashFunds, null, 2));

        
    }
}

module.exports = User;
