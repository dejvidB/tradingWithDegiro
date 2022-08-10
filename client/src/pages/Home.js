import { Component } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <>
                <CssBaseline />
                <Container fixed style={{paddingTop: "25px"}}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            {/* Buying area */}
                            <Autocomplete
                            options={stocks}
                            autoHighlight
                            getOptionLabel={(option) => option.name}
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
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* Account data */}
                        </Grid>
                </Grid>
            </Container>
          </>
        );
    }
}

const stocks = [
    {"id": "331868", "name": "Apple Inc",  "symbol": "AAPL"},
    {"id": "331822", "name": "Meta Inc",  "symbol": "META"}
];
