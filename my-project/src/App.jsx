import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useState, useEffect } from "react";
import Home from './pages/landing-page/Home';
import SignIn from './pages/landing-page/SignIn';
import SignUp from './pages/landing-page/SignUp';
import 'aos/dist/aos.css';
import './css/style.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userToken = localStorage.getItem('token'); // Example: check for token in local storage
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
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
