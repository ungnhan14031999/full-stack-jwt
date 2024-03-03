import { useEffect, useState } from 'react';

import {fetchAllUser} from '../../services/userService';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let response = await fetchAllUser();

        if(response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT);
        }
    }

    return (
        <div className='section-users'>
            <div className='container'>
                <div className='users-header'>
                    <h3 className='users-header__title'>Table Users</h3>
                    <div className='users-header__action'>
                        <button className='action-refesh btn btn-success'>Refesh</button>
                        <button className='action-add btn btn-primary'>Add new user</button>
                    </div>
                </div>

                <div className='users-table'>
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((user, index) => {
                                        return(
                                            <tr key={`row-${index}`}>
                                                <td scope="row">{index + 1}</td>
                                                <td>{user.id}</td>
                                                <td>{user.userName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.sex}</td>
                                                <td>{user.Group ? user.Group.description : ''}</td>
                                            </tr>
                                        )
                                    })}
                                </> 
                                :
                                <>
                                    <span>Not found users</span>
                                </>
                            }
                        </tbody>
                    </table>
                </div>

                <div className='user-footer'>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Users;