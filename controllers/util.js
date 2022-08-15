class Util{
    static convertCurrency = (from, to, amount) => {
        return new Promise((resolve, reject) => {
            if (from === to)
                resolve(amount);

            if (process.env[from.toUpperCase() + "_TO_" + to.toUpperCase()]) {
                resolve(amount * parseFloat(process.env[from.toUpperCase() + "_TO_" + to.toUpperCase()]));
            }

            var myHeaders = new Headers();
            myHeaders.append("apikey", process.env.EXCHANGERATESAPI_KEY);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            };

            fetch("https://api.apilayer.com/exchangerates_data/convert?to=" + to + "&from=" + from + "&amount=" + amount, requestOptions)
                .then(response => response.json())
                .then(response => resolve(response.result))
                .catch(error => reject(error));
        });
    }
}

module.exports = Util;
