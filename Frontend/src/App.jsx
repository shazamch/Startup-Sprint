import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Home from "./pages/Home/Home";
import MyErrorBoundary, { NotFoundPage } from "./components/errorPage/ErrorBoundary"; 
import Layout from "./components/navigation/layout/Layout"
import Dashboard from "./pages/Dashboard/Dashoard";
import Startups from "./pages/Startups/Startups";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyInvestments from "./pages/MyProfile/MyInvestments";
import StartupProfile from "./components/Startup/StartupProfile/StartupProfile";
import AddPost from "./components/myProfile/posts/AddPost";
import AddStartup from "./components/Startup/AddStartup";
import Chat from "./pages/Chat/Chat";
import Requests from "./pages/Requests/Requests";
import { useDarkMode } from './context/DarkModeContext';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <MyErrorBoundary>
    <Router>
      {/* <Toast /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SplashScreen isLoggedIn={isAuthenticated}/>} />
        <Route path="/home" element={<Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>}/>
        <Route path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
            )
          }
        />
        <Route path="/signup" element={<SignupPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>}/>
        <Route path="/dashboard" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><Dashboard isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>

        <Route path="/startups" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><Startups isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>
        <Route path="/startups/startupprofile/:startupID" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><StartupProfile isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>
        <Route path="/addstartup" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><AddStartup isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>

        <Route path="/requests" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><Requests isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>

        <Route path="/myprofile" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><MyProfile isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>
        <Route path="/addpost" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><AddPost isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>

        <Route path="/myinvestments" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><MyInvestments isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>

        <Route path="/chat" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><Chat isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>

        <Route path="/requests" element={<PrivateRoute isLoggedIn={isAuthenticated}><Layout><Requests isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/></Layout></PrivateRoute>}/>
        
      </Routes>
    </Router>
    </MyErrorBoundary>
  );
}

// PrivateRoute ensures restricted access for authenticated users
function PrivateRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default App;
