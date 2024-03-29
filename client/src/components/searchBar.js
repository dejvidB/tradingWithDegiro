import { Component } from 'react';
import { TextField, Autocomplete, Box, Button, Grid, Snackbar, Alert } from '@mui/material/';
import CircularProgress from '@mui/material/CircularProgress';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stocks: [],
            loading: false,
            open: false,
            noResults: false,
            text: ''
        }

        this.search = () => {
            this.setState(state => ({ ...state, loading: true }),
                () => this.props.search(this.state.text).then(results => {
                    this.setState(state => ({
                        loading: false,
                        stocks: state.stocks.concat(results.filter(result => state.stocks.map(stock => stock.id).indexOf(result.id) === -1)),
                        noResults: results.length === 0,
                        open: true
                    }));
                }));
        }

        this.setOpen = value => this.setState(state => ({...state, open: value}));
    }
    
    render(){
        return (
        <>
            <Grid container spacing="2">
                <Grid item xs={10}>
                    <Autocomplete
                        options={this.state.stocks}
                        open={this.state.open}
                        onOpen={() => this.setOpen(true)}
                        onClose={() => this.setOpen(false)}
                        freeSolo
                        autoHighlight
                        getOptionLabel={(option) => option.symbol}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {option.name} - {option.symbol} @ {option.closePrice}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Find a stock"
                                value={this.state.text}
                                onChange={(e) => this.setState(state => ({...state, text: e.target.value}))}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                        {this.state.loading ? <CircularProgress color="success" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                        </>
                                    )
                                }}
                            />
                        )}
                        onChange={(e, product) => this.props.setProduct(product)}
                        disabled={this.props.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        size="large"
                        variant="outlined"
                        style={{minHeight: "100%"}}
                        onClick={this.search}
                        disabled={this.props.disabled}>
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={this.state.noResults}
                autoHideDuration={1500}
                onClose={() => this.setState(state => ({...state, noResults: false}))}
                message="No results found"
                anchorOrigin={{vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => this.setState(state => ({...state, noResults: false}))} severity="error" variant="filled" sx={{ width: '100%' }}>
                    No results found!
                </Alert>
            </Snackbar>
        </>
        );
    }
}
