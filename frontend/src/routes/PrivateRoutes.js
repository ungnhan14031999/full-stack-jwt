import { useContext, useEffect } from "react";
import {  BrowserRouter as Router, Route } from "react-router-dom";
import { useHistory, Redirect } from 'react-router-dom';
import { UserContext } from "../context/UserContext";


const PrivateRoutes = (props) => {
    const {user} = useContext(UserContext); 

    if(user && user.isAuthenticated === true) {
        return (
            <>
                <Router>
                    <Route
                        path={props.path}
                        component={props.component}
                    />
                </Router>
            </>
        ); 
    } else {
        return  <Redirect to="/login"></Redirect>
    }
}

export default PrivateRoutes;