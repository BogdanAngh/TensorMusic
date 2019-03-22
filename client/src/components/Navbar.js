import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.navbarStyle = {
      backgroundColor: '#1f1651'
    }

    this.textStyle = {
      color:'#ffffff'
    }
  }

  render() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light " style={this.navbarStyle}>
            <Link className="navbar-brand" to="/" style={this.textStyle}>TensorMusic</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto" >
                    <li className="nav-item" >
                        <Link className="nav-link" to="/register" style={this.textStyle}>Register</Link>
                    </li>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/login" style={this.textStyle}>Login</Link>
                    </li>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/" style={this.textStyle}>Home</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}    

}
export default Navbar;