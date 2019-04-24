import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
    constructor(){
        super();
        
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(){
        let path="/profile";
        this.props.history.push(path)
    }
    onLogout(e){
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render(){
        const textStyle = {
            color:"#ffffff", 
            fontSize:"20px"
        }
        const {isAuthenticated, user} = this.props.auth;
        
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a style={{color:"white", marginTop:"5px", marginRight:"5px", textDecoration:"none"}} onClick={this.routeChange} >
                    <p className="profile">{user.name}</p>
                </a>
                <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                            Logout
                </a>
            </ul> 
        )
        
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register" style={textStyle}>
                        <p>Register</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" style={textStyle}>
                        <p>Login</p>
                    </Link>
                </li>
            </ul>
        )
        
        return(
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <Link className="navbar-brand" to="/">
                    <p style={{fontSize:"30px"}}>Home</p>
                </Link>
                <Link className="navbar-brand" to="/rocknroll">
                    <p style={{fontSize:"30px"}}>Rock'n'Roll</p>
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));