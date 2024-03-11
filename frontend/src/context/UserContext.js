import React, { useState } from "react";

const UserContext = React.createContext({name: '', auth: false});

const UserProvider = ({children}) => {
    const [user, setUser] = useState({
            isAuthenticated: false, 
            token: "",
            account: {}
        });

    const loginContext = (nameData) => {
        setUser(nameData);
    }

    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false
        }));
    }

    return (
        <UserContext.Provider value={{user, loginContext, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};