import { useEffect } from "react";
import {  BrowserRouter as Router, Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';


const PrivateRoutes = (props) => {
    let history = useHistory();

    useEffect(() => {
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