import { Routes, Route, Navigate } from "react-router";
import './App.css'
import HomePage from "./pages/HomePage";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { checkAuth } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function App() {

  // check if the user is authenticated or not 
  // if yes then take him directly to home page 
  // else take him to login or signup page

  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=>state.auth);
  useEffect(()=>{
    dispatch(checkAuth());
  }, [])

  return (
    <Routes>
      <Route path="/" element={isAuthenticated?<HomePage/>:<Navigate to="/signup"/>}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/"/>:<Login/>}></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/"/>:<Signup/>}></Route>
    </Routes>
  )
}

export default App
