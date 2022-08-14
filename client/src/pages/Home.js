import { Component } from 'react';
import { Grid, Container, CssBaseline, Stack, Button } from '@mui/material/';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import TransactionHistory from '../components/transactionHistory';
import SearchBar from '../components/searchBar';

const ACCOUNT_INFO_ENDPOINT = '/getAccountInfo';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [
                // {"id": 1, "symbol": "AAPL", "buy": 2.10, "sell": 2.09, quantity: 450},
                // {"id": 2, "symbol": "META", "buy": 2.10, "sell": 2.50, quantity: 450}
            ],
            orderExecution: false,
            currentOrder: "sell",
            productId: null,
            productCurrency: null,
            productSymbol: null,
            cash: 0,
            cashCurrency: '',
            jsessionid: null
        }

        this.componentDidMount = () => {
            this.sendRequest(ACCOUNT_INFO_ENDPOINT).then(response => {
                this.setState(state => ({ ...state, cash: response[0].value, cashCurrency: response[0].currencyCode }));
            }, error => {
                console.log(error);
            });
        }

        this.sendRequest = (endpoint, args = {}, method = 'GET') => {
            let requestOptions = {
                method: method,
                headers: {}
            };

            if (this.state.jsessionid !== null) {
                requestOptions.headers['jsessionid'] = this.state.jsessionid;
            }

            if (method.toUpperCase() === 'POST') {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(args);
            }
            else if (method.toUpperCase() === 'GET') {
                let argsArray = [];

                for (let arg in args) {
                    argsArray.push(arg + '=' + encodeURIComponent(args[arg]));
                }

                endpoint += '?' + argsArray.join('&');
            }

            return new Promise((resolve, reject) => {
                fetch(endpoint, requestOptions)
                    .then(response => {
                        if (!response.ok)
                            reject(response);

                        this.setState(state => ({ ...state, jsessionid: response.headers.get('jsessionid') }));
                        return response.json();
                    })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => reject(error));
            });
        }

        this.buy = (productId) => {
            const newOrder = {"id": 3, "symbol": "NVDA", "buy": 180, "quantity": 10, "sell": null};
            this.setState(state => ({...state, orderExecution: true}));
            this.simulateOrder(() => this.setState(state => ({
                ...state, 
                orderExecution: false,
                currentOrder: "buy",
                productId,
                orders: [newOrder, ...state.orders]})));
        }

        this.sell = (productId) => {
            this.setState(state => ({...state, orderExecution: true}));
            this.simulateOrder(() => this.setState(state => ({
                ...state, 
                orderExecution: false, 
                currentOrder: "sell", 
                productId,
                orders: [
                    {
                        sell: 200,
                        "id": state.orders[0].id, 
                        "symbol": state.orders[0].symbol, 
                        "buy": state.orders[0].buy, 
                        "quantity": state.orders[0].quantity
                    }
                ].concat(state.orders.slice(1))
            })));
        }

        this.simulateOrder = fallback => {
            setTimeout(() => { fallback() }, 500);
        }

        this.setProductId = (productId) => {
            this.setState(state => ({...state, productId}));
        }
    }

    render() {
        return (
            <>
                <CssBaseline /> 
                <Container fixed style={{marginTop: "25px"}}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} mt="1%">
                            <SearchBar setProductId={this.setProductId} disabled={this.state.currentOrder === "buy"}/>
                            <Stack direction="row" spacing={2} mt="30%">
                                <Button variant="contained"
                                    color="error" 
                                    size="large" 
                                    startIcon={<PaidIcon />}
                                    disabled={this.state.productId === null || this.state.orderExecution === true || this.state.currentOrder === "sell"}
                                    onClick={() => this.sell(1)}>
                                    SELL
                                </Button>
                                <Button variant="contained"
                                    color="success" 
                                    size="large" 
                                    startIcon={<ShoppingCartIcon />}
                                    disabled={this.state.productId === null || this.state.orderExecution === true || this.state.currentOrder === "buy"}
                                    onClick={() => this.buy(1)}>
                                    BUY
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <TransactionHistory orders={this.state.orders} cash={this.state.cash} currency={this.state.cashCurrency} />
                        </Grid>
                </Grid>
            </Container>
          </>
        );
    }
}
