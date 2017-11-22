import React, { Component } from 'react'
import Menu, { MenuItem } from 'material-ui/Menu'
import List, { ListItem, ListItemText } from 'material-ui/List'

import { statuses } from '../lib/task_status'

class StatusListMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  }

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="task-status"
            aria-label="task status"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="task status"
              secondary={this.props.currentNode.status}
            />
          </ListItem>
        </List>
        <Menu
          id="task-status"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {statuses.map((status, index) => (
            <MenuItem
              key={status}
              disabled={index === 0}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {status}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default StatusListMenu
