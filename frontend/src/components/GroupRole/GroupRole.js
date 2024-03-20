import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from 'lodash';

import { fetchGroup } from '../../services/userService';
import { getAllRole, fetchRolesByGroup, assignRolesToGroup } from '../../services/roleService';

const GroupRole = () => {
    const [userGroup, setUserGroup] = useState([]);
    const [listRole, setListRole] = useState([]);
    const [selectGroup, setSelectGroup] = useState('');
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

    useEffect(() => { 
        getGroup();
        getDataRoles();
    },[]);

    const getDataRoles = async () => {
        let response = await getAllRole();
        let data = response.DT;
        setListRole(data);
    }
    
    const getGroup = async () => {
        let res = await fetchGroup();
    
        if(res && res.EC === 0) {
            setUserGroup(res.DT);
        } else {
            toast.error(res.EM)
        }
    }

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value);
        
        if(value) {
            let data = await fetchRolesByGroup(value);

            if(data && +data.EC === 0) {
                let result = buildDataRoleByGroup(data.DT.Roles, listRole);
                setAssignRolesByGroup(result);
            }
        }
    }

    const buildDataRoleByGroup = (groupRoles, allRoles) => {
        let result = [];

        if(allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {}
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;

                if(groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url);
                }

                result.push(object);
            });
        }
        return result;
    }

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => item.id === +value);
        
        if(foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
        }

        setAssignRolesByGroup(_assignRolesByGroup);
    }

    const buildDataToSave = () => {
        let result = {}

        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);

        result.groupId = selectGroup;

        let groupRoles = _assignRolesByGroup.filter(item => item.isAssigned === true);
        let finalGroupRoles = groupRoles.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id };
            return data;
        });

        result.groupRoles = finalGroupRoles;

        return result;
    }

    const handleSave = async () => {
        let data = buildDataToSave();

        let res = await assignRolesToGroup(data);
        if(res && res.EC === 0) {
            toast.success(res.EM);
        }
    }

    return(
        <div className="section-group-role">
            <div className="container">
                <div className="group-role__title mt-3">
                    <h3>Group Role:</h3>
                </div>
                
                <div className="group-role__assign">
                    <div className="col-12 col-md-6 my-2 form-group">
                        <label>Group:</label>
                        <select 
                            className="form-select"
                            onChange={(event) => handleOnchangeGroup(event.target.value)}    
                        >
                            <option value="">Please, Choose group</option>

                            { userGroup && userGroup.length > 0 && 
                                userGroup.map((item, index) => {
                                    return (
                                        <option 
                                            key={`group-${index}`} 
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <hr />
                    {selectGroup && 
                        <div className="assign-roles">
                            <h5>Assign Roles:</h5>
                            <div className="row">
                                {
                                    assignRolesByGroup && assignRolesByGroup.length > 0 
                                    && assignRolesByGroup.map((role, index) => {
                                        return (
                                            <div className="col-6 col-lg-3">
                                                <div className="form-check" key={`list-role-${index}`}>
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        value={role.id}
                                                        id={`list-role-${index}`} 
                                                        checked={role.isAssigned}
                                                        onChange={(event) => handleSelectRole(event.target.value)}
                                                    />
                                                    <label className="form-check-label" for={`list-role-${index}`}>
                                                        {role.url}
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="mt-3">
                                    <button 
                                        className="btn btn-warning"
                                        onClick={() => handleSave()}
                                    >Save</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default GroupRole;