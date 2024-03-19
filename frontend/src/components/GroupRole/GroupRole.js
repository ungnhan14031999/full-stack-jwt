import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchGroup } from '../../services/userService';
import { getAllRole, fetchRolesByGroup } from '../../services/roleService';

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

    const getRolesByGroup = async (groupId) => {
        let data = await fetchRolesByGroup(groupId);
        
        if(data && data +data.EC === 0) {

        }
    }

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value);
        
        if(value) {
            await getRolesByGroup(value);
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
                                    listRole && listRole.length > 0 
                                    && listRole.map((role, index) => {
                                        return (
                                            <div className="col-6 col-lg-3">
                                                <div class="form-check" key={`list-role-${index}`}>
                                                    <input class="form-check-input" type="checkbox" value="" id={`list-role-${index}`} />
                                                    <label class="form-check-label" for={`list-role-${index}`}>
                                                        {role.url}
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default GroupRole;