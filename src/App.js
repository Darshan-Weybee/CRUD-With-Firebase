import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Page/Home/Home';
import Login from "./Page/Login/Login";
import New from './Page/New/New';


function App({ signInDetail}) {

  const RequireAuth = ({ children }) => {
    if(!signInDetail?.isSignedIn) {
      return <Navigate to="/login" />
    }
    return  children
  }

  useEffect(() => {
    function unloadFun(){
      localStorage.setItem("user", JSON.stringify(signInDetail));
    }

    window.addEventListener("beforeunload", unloadFun);

    return () => window.removeEventListener("beforeunload", unloadFun);

  },[signInDetail])

  return (
    <div className='App'>
       <Routes>
        <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/new' element={<RequireAuth><New/></RequireAuth>}/>
      </Routes> 
    </div>
  )

}

const mapStateToProps = state => {
  return {
    signInDetail: state.userSignInDetail
  }
}

export default connect(mapStateToProps)(App);

