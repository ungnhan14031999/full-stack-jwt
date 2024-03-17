import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAllRole } from '../../services/roleService';
import ReactPaginate from 'react-paginate';

const TableRole = (porps) => {
    const [listRole, setListRole] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);

    const fetchDataRoles = async () => {
        let response = await getAllRole(currentPage, currentLimit);

        if(response && +response.EC === 0) {
            setListRole(response.DT.roles);
            setTotalPages(response.DT.totalPage);
        }
    }

    const handleDeleteRole = (role) => {
        console.log(">>>Check delete role", role);
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }

    useEffect( async () => {
        await fetchDataRoles();
    }, [currentPage]);

    return (
        <>
            <div className="role-table__title">
                <h4>Table all role</h4>
            </div>

            <div className='role-table__content'>
                <table className="table table-striped table-bordered table-hover">
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
                                {listRole.map((role, index) => {
                                    return(
                                        <tr key={`row-${index}`}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{role.url}</td>
                                            <td>{role.description}</td>
                                            <td>
                                                <button 
                                                    className='btn btn-danger'
                                                    onClick={() => handleDeleteRole(role)}
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

            <div className='role-table__pagination'>
                { totalPages > 0 &&
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
        </> 
    );
};

export default TableRole;