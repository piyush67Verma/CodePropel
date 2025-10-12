import { Routes, Route, Navigate } from "react-router";
import './App.css'
import HomePage from "./pages/HomePage";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from "./pages/Admin";
import AdminCreate from './components/AdminCreate';
import AdminDelete from './components/AdminDelete';
import { checkAuth } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProblemPage from "./pages/ProblemPage";
import AdminUpdate from "./components/AdminUpdate";
import UpdateProblem from "./components/UpdateProblem";
function App() {

  // check if the user is authenticated or not 
  // if yes then take him directly to home page 
  // else take him to login or signup page

  const dispatch = useDispatch();
  const {isAuthenticated, loading, user} = useSelector((state)=>state.auth);
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
      <Route path='/admin' element={isAuthenticated && user?.role=='admin'?<Admin/>:<Navigate to="/" />}></Route>
      <Route path='/admin/create' element={isAuthenticated && user?.role=='admin'?<AdminCreate/>:<Navigate to="/" />}></Route>
      <Route path='/admin/delete' element={isAuthenticated && user?.role=='admin'?<AdminDelete/>:<Navigate to="/" />}></Route>
      <Route path='/admin/update' element={isAuthenticated && user?.role=='admin'?<AdminUpdate/>:<Navigate to="/" />}></Route>
      <Route path='/admin/update/problemById/:problemId' element={isAuthenticated && user?.role=='admin'?<UpdateProblem/>:<Navigate to="/" />}></Route>
      <Route path='/problem/:problemId' element={<ProblemPage/>}></Route>
    </Routes>
  )
}

export default App
