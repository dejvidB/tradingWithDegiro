class User {
    static getCashFunds = degiroInstance => {
        return new Promise((resolve, reject) => {
            degiroInstance.getCashFunds().then(cashFunds => {
                resolve(cashFunds.filter(cash => cash.value > 0));
            }, error => {
                reject(error);
            });
        });
    }
}

module.exports = User;
