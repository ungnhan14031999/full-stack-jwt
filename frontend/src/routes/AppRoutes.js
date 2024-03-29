import { Route, Switch } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import Role from '../components/Roles/Role';
import Home from "../components/Home/Home";
import About from "../components/About/About";
import GroupRole from "../components/GroupRole/GroupRole";

const AppRoutes = () => {

    const Projects = () => {
        return (
            <>Projects</>
        );
    }

    return (
        <>
            <Switch>
                <PrivateRoutes 
                    path="/users"
                    component={Users}
                />
                <PrivateRoutes 
                    path="/projects"
                    component={Projects}
                />
                <PrivateRoutes 
                    path="/roles"
                    component={Role}
                />
                <PrivateRoutes 
                    path="/group-role"
                    component={GroupRole}
                />
                <PrivateRoutes 
                    path="/about"
                    component={About}
                />

                
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="*">
                    404 Not Found
                </Route>
            </Switch> 
        </>
    )
}

export default AppRoutes;