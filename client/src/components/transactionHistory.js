import { Component } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default class TransactionHistory extends Component {
    render(){
        return (
            <div style={{float: "right", minWidth: "80%"}}>
                <div>
                    <span style={{ float: "left" }}>Account total: {this.props.cash} {this.props.currency}</span>
                    <span style={{ float: "right" }}>Today: {this.props.orders.map(order => order.sell ? (order.sell - order.buy) * order.quantity : 0).reduce((a, b) => a + b, 0).toFixed(2)}</span>
                </div>
                <List>
                    {this.props.orders.map((order) => {
                        return (
                            order.sell !== null ?
                                <ListItem key={order.id} style={{ backgroundColor: (order.sell - order.buy) > 0 ? "#2e7d32" : "#d32f2f", color: "white" }}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        {(order.sell - order.buy) > 0 ? <AddCircleIcon /> : <RemoveCircleIcon />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={((order.sell - order.buy) * order.quantity).toFixed(2)}
                                        secondary={order.symbol} />
                                </ListItem>
                                :
                                <ListItem key={order.id} style={{ backgroundColor: "lightgray", color: "white" }}>
                                    <ListItemIcon style={{ color: "white" }}>
                                        <AccessTimeIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={order.symbol}
                                        secondary={order.quantity + " @ " + order.buy} />
                                </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}
