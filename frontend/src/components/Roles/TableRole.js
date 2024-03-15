import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAllRole } from '../../services/roleService';

const TableRole = (porps) => {
    const [listRole, setListRole] = useState([]);

    const fetchDataRoles = async () => {
        let response = await getAllRole();

        if(response && +response.EC === 0) {
            setListRole(response.DT);
        }
    }

    useEffect( async () => {
        await fetchDataRoles();
    }, []);

    return (
        <>
            <div className="role-table__title">
                <h4>Table all role</h4>
            </div>

            <div className='role-table__content'>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Url</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRole && listRole.length > 0 ?
                            <> 
                                {listRole.map((item, index) => {
                                    return(
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.url}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button 
                                                    className='btn btn-danger'
                                                    // onClick={() => handleDeleteUser(user)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </>
                            :
                            <>
                                <tr>
                                    <td colSpan={5}>Not found roles</td>
                                </tr>
                            </>
                        }

                        
                    </tbody>
                </table>
            </div>
        </> 
    );
};

export default TableRole;