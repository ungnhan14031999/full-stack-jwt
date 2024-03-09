import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";

const Register = () => {
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let defaulValidInput = {
        isValidEmail: true,
        isValidPhoneNumber: true,
        isValidUserName: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    let [objCheckInput, setObjCheckInput] = useState(defaulValidInput); 
    

    let history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    }

    const isValidInputs = () => {
        let regx = /\S+@\S+\.\S+/;

        setObjCheckInput(defaulValidInput);

        if(!email) {
            toast.error("Email is required");
            setObjCheckInput({...defaulValidInput, isValidEmail: false});
            return false;
        }
        if(!phone) {
            toast.error("Phone number is required");
            setObjCheckInput({...defaulValidInput, isValidPhoneNumber: false});
            return false;
        }
        if(!userName) {
            toast.error("User name is required");
            setObjCheckInput({...defaulValidInput, isValidUserName: false});
            return false;
        }
        if(!password) {
            toast.error("Password is required");
            setObjCheckInput({...defaulValidInput, isValidPassword: false});
            return false;
        }
        if(password !== confirmPassword) {
            toast.error("Your password is not the same");
            setObjCheckInput({...defaulValidInput, isValidConfirmPassword: false});
            return false;
        }
        
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        return true;
    }

    const isValidServer = (serverData) => {
        if (+serverData.EC === 0) {
            toast.success(serverData.EM);
            history.push('/login');
        } else if(+serverData.EC === 1) {
            setObjCheckInput({...defaulValidInput, isValidEmail: false});
            toast.error(serverData.EM);
        } else if(+serverData.EC === 2) {
            setObjCheckInput({...defaulValidInput, isValidPhoneNumber: false});
            toast.error(serverData.EM);
        }else if(+serverData.EC === -2) {
            setObjCheckInput({...defaulValidInput, isValidPassword: false});
            setObjCheckInput({...defaulValidInput, isValidConfirmPassword: false});
            toast.error(serverData.EM);
        } else {
            toast.error(serverData.EM);
        }
    }
    
    const handleRegister = async () => {
        let check = isValidInputs();

        if(check === true) {
            let serverData = await registerNewUser(email, phone, userName, password);
            
            isValidServer(serverData);
        }
    }

    return(
        <div className="section-register container">
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
                            <label htmlFor="inputEmail" className="form-label">Email address:</label>
                            <input 
                                type="email" 
                                className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid"} 
                                id="inputEmail" 
                                placeholder="Email address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPhoneNumber" className="form-label">Phone Number:</label>
                            <input 
                                type="text" 
                                className={objCheckInput.isValidPhoneNumber ? "form-control" : "form-control is-invalid"} 
                                id="inputPhoneNumber" 
                                placeholder="Phone" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputUserName" className="form-label">User Name:</label>
                            <input 
                                type="text" 
                                className={objCheckInput.isValidUserName ? "form-control" : "form-control is-invalid"} 
                                id="inputUserName" 
                                placeholder="User Name" 
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}    
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password:</label>
                            <input 
                                type="password" 
                                className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid"} 
                                id="inputPassword" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}    
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputConfirmPassword" className="form-label">Re-enter Password:</label>
                            <input 
                                type="password" 
                                className={objCheckInput.isValidConfirmPassword ? "form-control" : "form-control is-invalid"} 
                                id="inputConfirmPassword" 
                                placeholder="Re-enter Password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}    
                            />
                        </div>
                        <div className="mb-3">
                            <button 
                                type="submit" 
                                className="btn btn-primary w-100"
                                onClick={() => handleRegister()}
                            >
                                Register
                            </button>
                        </div>
                        <div className="mb-3">
                            <button 
                                onClick={() => handleLogin()} 
                                type="submit" 
                                className="btn btn-light w-100 btn-outline-secondary"
                            >
                                Already've an accout. login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;