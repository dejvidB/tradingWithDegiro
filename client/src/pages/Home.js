import { Component } from 'react';
import { Grid, Container, CssBaseline, Stack, Button } from '@mui/material/';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import TransactionHistory from '../components/transactionHistory';
import SearchBar from '../components/searchBar';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [
                {"id": 1, "symbol": "AAPL", "buy": 2.10, "sell": 2.09, quantity: 450},
                {"id": 2, "symbol": "META", "buy": 2.10, "sell": 2.50, quantity: 450}
            ]
        }
    }

    render() {
        return (
            <>
                <CssBaseline /> 
                <Container fixed style={{marginTop: "25px"}}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} mt="1%">
                            <SearchBar/>
                            <Stack direction="row" spacing={2} mt="30%">
                                <Button variant="contained"
                                    color="error" 
                                    size="large" 
                                    startIcon={<PaidIcon />}>
                                    SELL
                                </Button>
                                <Button variant="contained"
                                    color="success" 
                                    size="large" 
                                    startIcon={<ShoppingCartIcon/>}>
                                    BUY
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <TransactionHistory orders={this.state.orders}/>
                        </Grid>
                </Grid>
            </Container>
          </>
        );
    }
}
