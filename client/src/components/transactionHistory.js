import { Component } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default class TransactionHistory extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <div style={{float: "right", minWidth: "80%"}}>
                <div>
                    <span style={{float: "left"}}>Account total: 1000 EUR</span>
                    <span style={{float: "right"}}>Today: </span>
                </div>
                <List>
                {this.props.orders.map((order) => {
                    return(
                    <ListItem key={order.id} style={{backgroundColor: (order.sell - order.buy) > 0 ? "#2e7d32" : "#d32f2f", color: "white"}}>
                        <ListItemIcon style={{color: "white"}}>
                            {(order.sell - order.buy) > 0 ? <AddCircleIcon /> : <RemoveCircleIcon />}
                        </ListItemIcon>
                        <ListItemText
                        primary={((order.sell - order.buy) * order.quantity).toFixed(2)}
                        secondary={order.symbol}/>
                    </ListItem>);
                })}
                </List>
            </div>
        );
    }
}
