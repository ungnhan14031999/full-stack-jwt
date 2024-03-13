import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import {fetchAllUser, deleteUser} from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowsRotate, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    // Modal Delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModalDelete, setDataModalDelete] = useState({});

    //Modal Create/Update user
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModalUser, setDataModalUser] = useState({});
    const [actionModalUser, setActionModalUser] = useState("");    

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);

        if(response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModalDelete);
        
        if (response && response.EC === 0) {
            await fetchUsers();
            
            setIsShowModalDelete(false); 
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
    }

    const handleClose = () => {
        setDataModalDelete({});
        setIsShowModalDelete(false);
    };

    const handleDeleteUser = (user) => {
        setDataModalDelete(user);
        setIsShowModalDelete(true);   
    }

    const onHideModalUser = async () => {
        setDataModalUser({});
        setIsShowModalUser(false);
        await fetchUsers();
    }

    const handleCreatUser = () => {
        setActionModalUser("CREATE");
        setIsShowModalUser(true)
    }

    const handleEditUser = (user) => {
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShowModalUser(true);   
    }

    return (
        <>
            <div className='section-users mt-3'>
                <div className='container'>
                    <div className='users-header'>
                        <h3 className='users-header__title'>Table Users</h3>
                        <div className='users-header__action mb-2'>
                            <button 
                                className='action-refesh btn btn-success'
                            >
                                <FontAwesomeIcon icon={faArrowsRotate} />
                                <span className="ps-2">Refesh</span>
                            </button>
                            <button 
                                className='action-add btn btn-primary ms-2'
                                onClick={() => handleCreatUser()}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span className="ps-2">Add new user</span>
                            </button>
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
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((user, index) => {
                                            return(
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{user.id}</td>
                                                    <td>{user.userName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.sex}</td>
                                                    <td>{user.Group ? user.Group.name : ''}</td>
                                                    <td>
                                                        <button 
                                                            className='btn btn-warning'
                                                            onClick={() => handleEditUser(user)}
                                                        >   
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </button>
                                                        <button 
                                                            className='btn btn-danger ms-2'
                                                            onClick={() => handleDeleteUser(user)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </> 
                                    :
                                    <>
                                        <tr>
                                            <td>Not found users</td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>

                    {
                        totalPages > 0 &&
                            <div className='user-footer'>
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPages}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                    }
                </div>
            </div>
            
            <ModalDelete 
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModalDelete={dataModalDelete}
            />

            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
};

export default Users;