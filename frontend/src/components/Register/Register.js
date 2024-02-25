import { useHistory } from "react-router-dom";

const Register = () => {
    let history = useHistory();

    const handleLogin = () => {
        history.push('/login');
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
                        <form>
                            <div className="mb-3">
                                <label for="inputEmail" className="form-label">Email address:</label>
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email address" />
                            </div>
                            <div className="mb-3">
                                <label for="inputPhoneNumber" className="form-label">Phone Number:</label>
                                <input type="text" className="form-control" id="inputPhoneNumber" placeholder="Phone" />
                            </div>
                            <div className="mb-3">
                                <label for="inputUserName" className="form-label">User Name:</label>
                                <input type="text" className="form-control" id="inputUserName" placeholder="User Name" />
                            </div>
                            <div className="mb-3">
                                <label for="inputPassword" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                            </div>
                            <div className="mb-3">
                                <label for="inputReEnterPassword" className="form-label">Re-enter Password:</label>
                                <input type="password" className="form-control" id="inputReEnterPassword" placeholder="Re-enter Password" />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary w-100">Register</button>
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;