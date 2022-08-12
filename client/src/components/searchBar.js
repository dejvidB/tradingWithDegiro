import { Component } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stocks: [
                {"id": "331868", "name": "Apple Inc",  "symbol": "AAPL"},
                {"id": "331822", "name": "Meta Inc",  "symbol": "META"}
            ]
        }
    }
    
    render(){
        return (
            <Autocomplete
            options={this.state.stocks}
            autoHighlight
            getOptionLabel={(option) => option.symbol}
            renderOption={(props, option) => (
                <Box component="li" {...props}>
                    {option.name} - {option.symbol}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Find a stock"
                inputProps={{
                    ...params.inputProps
                }}
                />
            )}
            onChange={(e, product) => this.props.setProductId(product ? product.id : null)}
            disabled={this.props.disabled}
            />
        );
    }
}
