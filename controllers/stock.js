const degiroApi = require('degiro-api');
const { DeGiroActions, DeGiroMarketOrderTypes, DeGiroTimeTypes, DeGiroProducTypes } = degiroApi.DeGiroEnums;

const SEARCH_LIMIT = 10;

class Stock {
    static search = (degiroInstance, text) => {
        return new Promise((resolve, reject) => {
            degiroInstance.searchProduct({
                text,
                type: DeGiroProducTypes.shares,
                limit: SEARCH_LIMIT
            }).then(results => {
                resolve(results.filter(result => result.tradable)
                    .map(result => ({
                        id: result.id,
                        name: result.name,
                        symbol: result.symbol,
                        currency: result.currency,
                        closePrice: result.closePrice
                    })));
            }).catch(error => reject(error));
        });
    }

    static getPrice = symbol => {
        return new Promise((resolve, reject) => {
            fetch("https://finnhub.io/api/v1/quote?symbol=" + symbol + "&token=" + process.env.FINNHUB_API_KEY)
                .then(response => response.json())
                .then(response => resolve(response.c))
                .catch(error => reject(error));
        });
    }

    static calculateTradeSize = (cash, stockPrice) => {
        return Math.floor(cash / stockPrice);
    }

    static buy = (degiroInstance, productId, price, size) => {
        return new Promise((resolve, reject) => {
            const order = {
                buySell: DeGiroActions.BUY,
                orderType: DeGiroMarketOrderTypes.LIMITED,
                productId,
                size,
                timeType: DeGiroTimeTypes.DAY,
                price
            }

            degiroInstance.createOrder(order).then(({ confirmationId, freeSpaceNew, transactionFees }) => {
                degiroInstance.executeOrder(order, confirmationId).then(orderId => {
                    resolve(orderId);
                })
            }).catch(error => reject(error));
        });
    }

    static sell = async (degiroInstance, productId, price, size) => {
        return new Promise((resolve, reject) => {
            const order = {
                buySell: DeGiroActions.SELL,
                orderType: DeGiroMarketOrderTypes.STOP_LOSS,
                productId,
                size,
                timeType: DeGiroTimeTypes.DAY,
                price
            }

            degiroInstance.createOrder(order).then(({ confirmationId, freeSpaceNew, transactionFees }) => {
                degiroInstance.executeOrder(order, confirmationId).then(orderId => {
                    resolve(orderId);
                })
            }).catch(error => reject(error));
        });
    }
}

module.exports = Stock;
