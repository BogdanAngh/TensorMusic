import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
class HamburgerMenuLogged extends React.Component {
  constructor(props){
    super(props);
    this.linkStyle = {
        color: 'black'
    };
  }
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton onClick={this.handleClick} color="inherit" aria-label="Menu">
            <MenuIcon/>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
            <MenuItem onClick={this.handleClose}>
                <Link className="nav-link" to="/register" style={this.linkStyle}>Profile</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
                <Link className="nav-link" to="/login" style={this.linkStyle}>Make Metal</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
                <Link className="nav-link" to="/rocknroll" style={this.linkStyle}>Home</Link>
            </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default HamburgerMenuLogged;