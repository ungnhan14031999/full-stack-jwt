import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import {fetchAllUser, deleteUser} from '../../services/userService';

import ModalDelete from './ModalDelete';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);

        if(response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.users);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleClose = () => {
        setDataModal({});
        setIsShowModalDelete(false);
    };

    const handleDeleteUser = (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);   
    }

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);
        
        if (response && response.data.EC === 0) {
            await fetchUsers();
            
            setIsShowModalDelete(false); 
            toast.success(response.data.EM);
        } else {
            toast.error(response.data.EM);
        }
    }

    return (
        <>
            <div className='section-users mt-3'>
                <div className='container'>
                    <div className='users-header'>
                        <h3 className='users-header__title'>Table Users</h3>
                        <div className='users-header__action mb-2'>
                            <button className='action-refesh btn btn-success'>Refesh</button>
                            <button className='action-add btn btn-primary ms-2'>Add new user</button>
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
                                                    <td scope="row">{index + 1}</td>
                                                    <td>{user.id}</td>
                                                    <td>{user.userName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.sex}</td>
                                                    <td>{user.Group ? user.Group.description : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning'>Edit</button>
                                                        <button 
                                                            className='btn btn-danger ms-2'
                                                            onClick={() => handleDeleteUser(user)}
                                                        >
                                                            Delete
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
                dataModal={dataModal}
            />
        </>
    );
};

export default Users;