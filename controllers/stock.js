const degiroApi = require('degiro-api');
const { DeGiroActions, DeGiroMarketOrderTypes, DeGiroTimeTypes, DeGiroProducTypes } = degiroApi.DeGiroEnums;
const { OrderType } = degiroApi.DeGiroTypes;

class Stock{
    SEARCH_LIMIT = 10;

    search = async (text) => {
        const results = await degiro.searchProduct({
            text,
            type: DeGiroProducTypes.shares,
            limit: this.SEARCH_LIMIT
        });

        return results.map(result => { result.id, result.name, result.symbol, result.currency });
    }

    buy = async (productId, size, price) => {
        const order: OrderType = {
            buySell: DeGiroActions.BUY,
            orderType: DeGiroMarketOrderTypes.LIMITED,
            productId,
            size,
            timeType: DeGiroTimeTypes.DAY,
            price
        }

        const { confirmationId, freeSpaceNew, transactionFees } = await degiro.createOrder(order);
        const orderId = await degiro.executeOrder(order, confirmationId);
        console.log(`Order executed with id: ${orderId}`)
    }

    sell = async (productId, size, price) => {
        const order: OrderType = {
            buySell: DeGiroActions.SELL,
            orderType: DeGiroMarketOrderTypes.LIMITED,
            productId,
            size,
            timeType: DeGiroTimeTypes.DAY,
            price
        }

        const { confirmationId, freeSpaceNew, transactionFees } = await degiro.createOrder(order);
        const orderId = await degiro.executeOrder(order, confirmationId);
        console.log(`Order executed with id: ${orderId}`)
    }
}

module.exports = Stock;
