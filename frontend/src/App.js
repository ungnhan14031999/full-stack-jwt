import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Nav from './components/Navigation/Nav';
import AppRoutes from './routes/AppRoutes';

require('dotenv').config();

function App() {
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
