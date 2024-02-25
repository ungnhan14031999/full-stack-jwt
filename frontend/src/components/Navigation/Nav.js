import React from 'react';
import './Nav.scss';
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="topnav">
            <NavLink to="home" exact>Home</NavLink>
            <NavLink to="news">News</NavLink>
            <NavLink to="contact">Contact</NavLink>
            <NavLink to="about">About</NavLink>
            <NavLink to="login">Login</NavLink>
        </div>
    );
};

export default Nav;