import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/save.png';
import wallet from '../../assets/wallet.png';
import {    
        NavbarContainer, ImageContainer,
        ProfilePicContainer, UnOrderedListContainer, DropDownMenuContainer, ImageWalletContainer, WallletSpanContainer
    } from './header.styles.js';
import { googleAuthSignOut } from '../../redux/auth/auth.actions';

class Header extends React.Component{

    handleLogoutClick = () => {
        this.props.logout();
    }

    render(){
        const {title, isAuthenticated, image_url, first_name, last_name} = this.props;
        return(
            <NavbarContainer className="navbar navbar-expand-lg navbar-default">
                <Link className="navbar-brand" to="/">
                    <ImageContainer src={logo}/>
                    {title}
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <UnOrderedListContainer className="navbar-nav ml-auto mt-2 mt-lg-0">
                    {
                            isAuthenticated ? 
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <ProfilePicContainer src={image_url}/>
                                </NavLink>                                
                                <DropDownMenuContainer className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <h5 style = {{textAlign:"center"}}>{first_name} {last_name}</h5>
                                    <div className="dropdown-divider">
                                    </div>
                                    <NavLink className={`dropdown-item`} to="/dashboard">Dashboard</NavLink>
                                    <NavLink className={`dropdown-item`} to="/category">Category</NavLink>
                                    <NavLink className={`dropdown-item`} to="/report">Report</NavLink>
                                    <NavLink className={`dropdown-item`} to="/transaction">Transaction</NavLink>
                                    <button onClick={this.handleLogoutClick} className={`dropdown-item`} >Logout</button>
                                </DropDownMenuContainer>
                            </li>
                            : null
                        }

                        { 
                            isAuthenticated && this.props.balance!==null ? 
                            <li className="nav-item">
                                <ImageWalletContainer src={wallet}/>
                                <WallletSpanContainer balance = {this.props.balance}>₹{this.props.balance}</WallletSpanContainer> 
                            </li>
                            : null
                        }                           
                    </UnOrderedListContainer>
                </div>
            </NavbarContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    image_url : state.auth.image_url,
    first_name : state.auth.first_name,
    last_name : state.auth.last_name,
    balance : state.transaction.balance
})

const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(googleAuthSignOut())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));