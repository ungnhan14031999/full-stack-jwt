import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    let history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    }

    const isValidInputs = () => {
        let regx = /\S+@\S+\.\S+/;

        if(!email) {
            toast.error("Email is required");
            return false;
        }
        if(!phoneNumber) {
            toast.error("Phone number is required");
            return false;
        }
        if(!userName) {
            toast.error("User name is required");
            return false;
        }
        if(!password) {
            toast.error("Password is required");
            return false;
        }

        if(password != confirmPassword) {
            toast.error("Your password is not the same");
            return false;
        }
        
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        return true;
    }
    
    const handleRegister = () => {
        let check = isValidInputs();

        let formData = {email, phoneNumber, userName, password, confirmPassword};

        console.log('>>check form data', formData);
    }

    return(
        <div className="login-container container">
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
                                className="form-control" 
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
                                className="form-control" 
                                id="inputPhoneNumber" 
                                placeholder="Phone" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputUserName" className="form-label">User Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
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
                                className="form-control" 
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
                                className="form-control" 
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