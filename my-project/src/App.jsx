import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useState, useEffect } from "react";
import Home from './pages/landing-page/Home';
import SignIn from './pages/landing-page/SignIn';
import SignUp from './pages/landing-page/SignUp';
import PatientReg from './pages/landing-page/PatientRegForm';
import Appointment from './pages/appointment/available-appointment/AvailableAppointment'

import 'aos/dist/aos.css';
import AOS from 'aos';
import './css/style.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userToken = localStorage.getItem('token'); // Example: check for token in local storage
    if (true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change


  return (
   <>
     <Routes>
        {isLoggedIn ? (
          <>
            {/* Routes for authenticated users */}
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
          </>
        ) : (
          <>
            {/* Routes for unauthenticated users */}
            <Route exact path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="patient-regform" element={<PatientReg />} />
          
            {/* Redirect to sign-in page if user tries to access dashboard */}
            <Route path="/dashboard/*" element={<Navigate to="/signin" replace />} />
          </>
        )}
      </Routes>
   </>
  );
}
/* */
export default App;
