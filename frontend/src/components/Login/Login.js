import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
    let history = useHistory();

    // useEffect(() => {
        // axios.get('http://localhost:8000/api/test-api')
        //     .then(data => {
        //         console.log(">>>check data api:", data);
        //     })
    // }, []);

    const handleCreateNewAccout = () => {
        history.push('/register');
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
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email address" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </div>
                            <div className="mb-3 text-center">
                                <Link to="/forgot-password" className="text-uppercase">Forgot your password?</Link>
                            </div>
                            <div className="mb-3">
                                <button onClick={() => handleCreateNewAccout()}  type="submit" className="btn btn-light w-100 btn-outline-secondary">Create new accout</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;