# Trading with Degiro

This is an **unofficial** project for executing buy/sell orders for stocks in the simplest way possible in [Degiro](https://www.degiro.co.uk). Currently, traders in Degiro have to manually insert the type of the order (Limit Order, Stop Loss, etc), the quantity of stocks they want to purchase, and even the price of the stock, if the order is not a "market order".

This is very inconvenient for traders who just want to execute their orders in the "perfect" timing, without caring about such details.

This is the problem that "Trading with Degiro" aims to solve by calculating the maximum amount of stocks the trader can buy based on their capital and requesting the stocks close to market price ("buy limit order"). All of this is done automatically when the trader clicks the "BUY" button after selecting the stock they are going to trade. By clicking the "SELL" button they immediately get rid of all the stocks they previously bought, executing a stop loss order.

## Disclaimer
This project was developed for personal use. Degiro is not responsible for this unofficial project and can change their API at any moment(even mid-trading), making the project (or part of it) useless. Neither Degiro or project contributors are in charge for any losses caused by the use of "Trading with Degiro". 

### License
[MIT License](https://github.com/dejvidB/tradingWithDegiro/blob/main/LICENSE)

### Installation
1. `git clone` the project.
2. Run `npm install` inside the root folder to install Node.js dependencies.
3. Navigate into the `client` folder and run `npm install` to install React dependencies.

### How to run
1. Create a .env file in the root folder of the project. The .env file should look like the following:

```
DEGIRO_USERNAME=""
DEGIRO_PASSWORD=""
SAFETY_NET="5"

EUR_TO_USD="1.02"

FINNHUB_API_KEY=""
EXCHANGERATESAPI_KEY=""
```

- `DEGIRO_USERNAME`: Your Degiro account username
- `DEGIRO_PASSWORD`: Your Degiro account password. Make sure this is correct. Degiro will temporarily block your account if you use wrong credentials for several API calls.
- `SAFETY_NET`: This amount is subtracted from your account funds to calculate the maximum amount of stocks you can buy for a given stock. __It should at least include transaction costs estimation, if you want to take advantage of all your funds in each buy order__.
- `EUR_TO_USD`: [Ignore if the stocks you are trading have the same currency with your funds.] The current exchange rate between your funds currency and the currency of the stocks your are going to trade. If you use another currency, use the same format (eg USD_TO_GBP). This is __optional__, as you can set up a free account in [Exchange Rates API](https://exchangeratesapi.io) to automatically get the current exchange rate instead. But keep in mind that making an extra API call will slow down your buying orders by a few hundreds of milliseconds.
- `FINNHUB_API_KEY`: The API key you should get from [Finnhub](https://finnhub.io). The free subscription allows you to get stock prices of US stocks only. This means that you can trade only US stocks using "Trading with Degiro" for now, unless you have a paid subscription in Finnhub.
- `EXCHANGERATESAPI_KEY`: This is required only if you don't plan to use the `EUR_TO_USD` (or similar) variable. If so, get a free API key from [Exchange Rates API](https://exchangeratesapi.io).

2. Run `npm start` inside the root folder to start the Node.js server. The server will run on port 8080.
3. In a separate terminal tab, run `npm start` inside the `client` folder. React will run on port 3000.

### Dependencies
- All API calls to Degiro are done using the open source project [degiro-api](https://github.com/icastillejogomez/degiro-api).
- Finnhub API is used to get stock prices in real-time just before buying/selling a stock. Their free plan allows getting data for US stocks only. Since "Trading with Degiro" relies on Finnhub, you can only trade US stocks using a free Finnhub API key.
- Exchange Rates API is optionally used to exchange users' funds currency to stocks currency.
