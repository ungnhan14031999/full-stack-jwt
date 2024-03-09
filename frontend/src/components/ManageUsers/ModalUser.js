import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import _ from 'lodash';

import {fetchGroup, createNewUser, updateCurrentUser} from '../../services/userService';

const ModalUser = (props) => {
    const {action, dataModalUser, onHide, show} = props;

    const defaultUserData = {
        email: '', 
        phone: '', 
        userName: '', 
        password: '',
        address: '', 
        sex: '', 
        group: ''
    };
    const validInputsDefault = {
        email: true, 
        phone: true, 
        userName: true, 
        password: true,
        address: true, 
        sex: true, 
        group: true
    };
    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const [userGroup, setUserGroup] = useState([]);
    

    useEffect(() => { 
        getGroup();
    },[]);

    useEffect(() => {
        if(action === "UPDATE") {
            setUserData({
                ...dataModalUser,
                group: dataModalUser.Group ? dataModalUser.Group.id : ''
            });
        }

    }, [dataModalUser]);

    useEffect(() => {
        if(action === "CREATE") {
            if(userGroup && userGroup.lenght > 0) {
                setUserData({...userData, group: userGroup[0].id});
            }
        }
    }, [action]);

    const getGroup = async () => {
        let res = await fetchGroup();

        if(res && res.EC === 0) {
            setUserGroup(res.DT);

            if (res.DT && res.DT.length > 0) {
                let group = res.DT;
                setUserData({...userData, group: group[0].id});
            }
        } else {
            toast.error(res.EM)
        }
    }

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidInputs = () => {
        if(action === "UPDATE") return true;

        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        let regx = /\S+@\S+\.\S+/;

        let _validInputs = _.cloneDeep(validInputsDefault);

        setValidInputs(validInputsDefault);
        
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Emty input ${arr[i]}`);
                check = false;
                break;
            }
        }

        //Check valid email
        if(!regx.test(userData['email'])) {
            _validInputs['email'] = false;
            setValidInputs(_validInputs);

            toast.error("Please enter a valid email address");
            check = false;
        }

        return check;
    }

    const handleConfirmUser = async () => {
        let check = checkValidInputs();

        if(check === true) {
            let res = (action === "CREATE") 
                ? await createNewUser({...userData, groupId: userData["group"]}) 
                : await updateCurrentUser({...userData, groupId: userData["group"]});
            
            if(res && res.EC === 0) {
                setUserData({...defaultUserData, group: userGroup && userGroup.length > 0 ? userGroup[0].id : ''});
                
                onHide();
                toast.success(res.EM);
            } else {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    }

    const handleCloseModalUser = async () => {
        onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    }

    return (
        <>
            <Modal 
                className="modal-user" 
                size="lg" 
                show={show} 
                onHide={() => handleCloseModalUser()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {action === "CREATE" ? 
                            "Create new user" : 
                            'Edit a user'
                        }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="content-body">
                        <div className="row">
                            <div className="col-12 col-md-6 my-2 form-group">
                                <label>Email:</label>
                                <input
                                    className={validInputs.email ? 
                                        'form-control' : 
                                        'form-control is-invalid'
                                    }
                                    disabled={action === "UPDATE" ? true : false }
                                    type="email" 
                                    placeholder="Email"   
                                    value={userData.email}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'email')}
                                />
                            </div>
                            <div className="col-12 col-md-6 my-2 form-group">
                            <label>Phone number:</label>
                                <input 
                                    className={validInputs.phone ? 
                                        'form-control' : 
                                        'form-control is-invalid'
                                    }
                                    disabled={action === "UPDATE" ? true : false }
                                    type="text"    
                                    placeholder="Phone number" 
                                    value={userData.phone}  
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'phone')}
                                />
                            </div>
                            <div className="col-12 col-md-6 my-2 form-group">
                                <label>User name:</label>
                                <input
                                    className="form-control"
                                    type="text"    
                                    placeholder="User Name"
                                    value={userData.userName} 
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'userName')}
                                />
                            </div>
                            <div className="col-12 col-md-6 my-2 form-group">
                                {action === "CREATE" &&
                                    <>
                                        <label>Password:</label>
                                        <input
                                            className={validInputs.password ? 
                                                'form-control' : 
                                                'form-control is-invalid'
                                            }
                                            type="password"
                                            placeholder="Password"
                                            value={userData.password}   
                                            onChange={(event) => handleOnchangeInput(event.target.value, 'password')}
                                        />
                                    </>
                                }
                            </div>
                            <div className="col-12 my-2 form-group">
                                <label>Address:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Address"
                                    value={userData.address}   
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'address')}  
                                />
                            </div>
                            <div className="col-12 col-md-6 my-2 form-group">
                                <label>Gender:</label>
                                <select
                                    className="form-select"
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'sex')}
                                    value={userData.sex}
                                >
                                    <option selected={true} value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-6 my-2 form-group">
                                <label>Group:</label>
                                <select
                                    className={validInputs.group ? 
                                        'form-select' : 
                                        'form-control is-invalid'
                                    }
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'group')}
                                    value={userData.group}
                                >
                                    { userGroup.length > 0 && 
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
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={onHide}
                        onHide={() => handleCloseModalUser()}
                    >
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={() => handleConfirmUser()}
                    >
                        {action === "CREATE" ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;