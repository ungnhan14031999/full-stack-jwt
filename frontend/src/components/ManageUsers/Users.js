import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Users = (props) => {

    let history = useHistory();

    useEffect(() => {
        let sessionAccount = sessionStorage.getItem('account');
        if(!sessionAccount) {
            history.push('/login');
        }
    }, []);

    return (
        <div>
            Michi check user page 
        </div>
    );
};

export default Users;