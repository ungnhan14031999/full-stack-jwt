import { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {loginUser} from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Login = () => {
    const { loginContext } = useContext(UserContext);
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidValuePassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    let history = useHistory();

    const handleCreateNewAccout = () => {
        history.push('/register');
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput)
        if(!valueLogin) {
            setObjValidInput({...defaultObjValidInput, isValidValueLogin: false});
            toast.error("Please enter your email or phone number");
            return ;
        }
        if(!password) {
            setObjValidInput({...defaultObjValidInput, isValidValuePassword: false});
            toast.error("Please enter your password");
            return;
        }

        let response = await loginUser(valueLogin, password);
        if(response && response.EC === 0) {
            toast.success(response.EM);
            
            let groupWithRoles = response.DT.data;
            let email = response.DT.email;
            let userName = response.DT.userName;
            let token = response.DT.access_token;
            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, userName }
            }
            
            localStorage.setItem('jwt', token);
            loginContext(data);

            history.push('/users');
        } else {
            toast.error(response.EM);
        }
    }

    const handlePressEnter = (e) => {
        if(e.charCode === 13 && e.code === "Enter" || e.code === "NumpadEnter") {
            handleLogin();
        }
    }

    return(
        <div className="section-login container">
            <div className="row my-5">
                <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
                    <div className="login-left text-center text-md-start">
                        <h3 className="fs-1 text-primary fw-bold">Michi</h3>
                        <p>Michi Dev help you connect and share with the people in your life</p>
                    </div>
                </div>

                <div className="col-md-6 col-12">
                    <div className="login-right border border-dark p-3 rounded-3">
                        <div className="mb-3">
                            <input 
                                type="email" 
                                className={objValidInput.isValidValueLogin ? "form-control" : "form-control is-invalid"} 
                                id="inputEmail" 
                                placeholder="Email address or phone number" 
                                value={valueLogin}
                                onChange={(e) => {setValueLogin(e.target.value)}}
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                className={objValidInput.isValidValuePassword ? "form-control" : "form-control is-invalid"}  
                                id="inputPassword" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                onKeyPress={(e) => handlePressEnter(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <button 
                                className="btn btn-primary w-100"
                                onClick={() => handleLogin()}
                            >Login</button>
                        </div>
                        <div className="mb-3 text-center">
                            <Link to="/forgot-password" className="text-uppercase">Forgot your password?</Link>
                        </div>
                        <div className="mb-3">
                            <button onClick={() => handleCreateNewAccout()}  type="submit" className="btn btn-light w-100 btn-outline-secondary">Create new accout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;