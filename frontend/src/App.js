import { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Nav from './components/Navigation/Nav';
import AppRoutes from './routes/AppRoutes';


function App() {
  const [account, setAccount] = useState('');

  useEffect(() => {
    let sessionAccount = sessionStorage.getItem('account');
    if(sessionAccount) {
      setAccount(JSON.parse(sessionAccount));
    }
  }, []);

  return (
    <>
      <Router>
        <div className='app-header'>
          <Nav />
        </div>

        <div className="app-container">
          <AppRoutes />
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </>
  );
}

export default App;
