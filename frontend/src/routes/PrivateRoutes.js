import { useContext, useEffect } from "react";
import {  BrowserRouter as Router, Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/UserContext";


const PrivateRoutes = (props) => {
    let history = useHistory();

    const {user} = useContext(UserContext); 

    useEffect(() => {
        console.log(">>>Check context user", user);

        let sessionAccount = sessionStorage.getItem('account');
        if(!sessionAccount) {
            history.push('/login');
            window.location.reload();
        }
    }, []);

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
}

export default PrivateRoutes;