import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
    const [isShow, setIsShow] = useState(true);

    let location = useLocation();

    useEffect(() => {
        let sessionAccount = sessionStorage.getItem('account');
        if(location.pathname === '/login' || !sessionAccount) {
            setIsShow(false);
        }
    }, []);

    return (
        <>
            {
                isShow && 
                    <div className="section-nav topnav">
                        <NavLink to="home" exact>Home</NavLink>
                        <NavLink to="users">Users</NavLink>
                        <NavLink to="projects">Projects</NavLink>
                    </div>
            }
            
        </>
    );
};

export default Nav;