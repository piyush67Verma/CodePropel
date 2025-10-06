import { Routes, Route, Navigate } from "react-router";
import './App.css'
import HomePage from "./pages/HomePage";
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from "./pages/AdminPanel";
import { checkAuth } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function App() {

  // check if the user is authenticated or not 
  // if yes then take him directly to home page 
  // else take him to login or signup page

  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useSelector((state)=>state.auth);
  useEffect(()=>{
    dispatch(checkAuth());
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated?<HomePage/>:<Navigate to="/signup"/>}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/"/>:<Login/>}></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/"/>:<Signup/>}></Route>
      <Route path='/admin' element={<AdminPanel/>}></Route>
    </Routes>
  )
}

export default App
