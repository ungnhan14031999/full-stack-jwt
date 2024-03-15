import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4} from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../services/roleService';

import TableRole from './TableRole';

const Role = () => {
    const dataChildDefaul = { url: '', description: '', isValidUrl: true };
    const [listChilds, setListChilds] = useState({item1: dataChildDefaul});
    
    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);

        _listChilds[key][name] = value;

        if(value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true;
        }

        setListChilds(_listChilds);
    }

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`item-${uuidv4()}`] = dataChildDefaul;

        setListChilds(_listChilds);
    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);

        delete _listChilds[key];

        setListChilds(_listChilds);
    }

    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];

        Object.entries(_listChilds).map(([ket, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            });
        });
        return result;
    }

    const handleSave = async () => {
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        });

        if(!invalidObj) {
            let data = buildDataToPersist();
            let res = await createRoles(data);
            if(res && res.EC === +0) {
                toast.success(res.EM);
            }
        } else {
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];

            _listChilds[key]['isValidUrl'] = false;
            setListChilds(_listChilds);

            toast.error("Input URL must not be emty...");
        }
    }

    return (
        <div className="section-role">
            <div className="container">
                <div className="role-add mt-3">
                    <div className="role-add__title">
                        <h4>Add a new role....</h4>
                    </div>

                    <div className="role-add__content">
                        {
                            Object.entries(listChilds).map(([key, child], index) => {
                                return (
                                    <div 
                                        className={`role-content__item mt-3 ${key}`} 
                                        key={`item-${key}`}
                                        
                                    >
                                        <div className="row">
                                            <div className="col-5 form-group">
                                                <label>Url:</label>
                                                <input 
                                                    type="text" 
                                                    className={child.isValidUrl ? "form-control" : "form-control is-invalid"}
                                                    value={child.url} 
                                                    onChange={(e) => handleOnchangeInput('url', e.target.value, key)}
                                                />
                                            </div>
                                            <div className="col-5 form-group">
                                                <label>Description:</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={child.description} 
                                                    onChange={(e) => handleOnchangeInput('description', e.target.value, key)}
                                                />
                                            </div>
                                            <div className="col-2 d-flex align-items-end">
                                                <button 
                                                    className="btn btn-warning w-100"
                                                    onClick={() => handleAddNewInput()}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                                {
                                                    index >=1 &&
                                                        <button 
                                                            className="btn btn-danger w-100 ms-2"
                                                            onClick={() => handleDeleteInput(key)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                        <div className='role-content__add mt-4'>
                            <button 
                                className="btn btn-primary"
                                onClick={() => handleSave()}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span className='ps-2'>Add Role</span>
                            </button>
                        </div>
                    </div>
                    
                </div>

                <div className='role-table mt-5'>
                    <TableRole />
                </div>
            </div>
        </div>
    );
}

export default Role;