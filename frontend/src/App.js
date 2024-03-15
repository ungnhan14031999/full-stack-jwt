import './App.scss';
import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {InfinitySpin} from 'react-loader-spinner';

import { UserContext } from "./context/UserContext";
import NavHeader from './components/Navigation/NavHeader';
import AppRoutes from './routes/AppRoutes';

require('dotenv').config();

function App() {
  const {user} = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading 
          ? 
            <div className='loading-container'>
              <InfinitySpin
                visible={true}
                width="200"
                color="#1877f2"
                ariaLabel="infinity-spin-loading"
              />
              <h4>Loading...</h4>
            </div>
          : 
            <div className='app-container'>
              <div className='app-header'>
                <NavHeader />
              </div>
              <div className="app-content">
                <AppRoutes />
              </div>
            </div>
        }
        

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
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
