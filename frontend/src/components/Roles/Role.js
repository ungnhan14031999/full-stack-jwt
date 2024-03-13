import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4} from 'uuid';

const Role = () => {
    const [listChilds, setListChilds] = useState({
        item1: { url: '', description: '' }
    });

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);

        _listChilds[key][name] = value;
        setListChilds(_listChilds);
    }

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`item-${uuidv4()}`] = {
            url: '',
            description: ''
        };

        setListChilds(_listChilds);
    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);

        delete _listChilds[key];

        setListChilds(_listChilds);
    }

    return (
        <div className="section-role">
            <div className="container">
                <div className="mt-3">
                    <div className="role-title">
                        <h4>Add a new role....</h4>
                    </div>

                    <div className="role-content">
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
                                                    className="form-control" 
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
                            <button className="btn btn-primary">
                                <FontAwesomeIcon icon={faPlus} />
                                <span className='ps-2'>Add Role</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Role;