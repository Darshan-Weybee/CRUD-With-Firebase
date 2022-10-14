import React, {  useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInFailure, signInSuccess } from "../../redux/reducer/userSignIn";
import { connect } from "react-redux";
import { auth } from "../../firebase";
import {  useNavigate } from "react-router-dom";

function Login({ signInFailure, signInSuccess, signInDetail }) {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        signInSuccess(true, user);
        navigate("/")
      })
      .catch((error) => {
        signInFailure(false, error.message)
      });
  }


  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {signInDetail?.error && <span>{signInDetail?.error}</span>}
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    signInDetail: state.userSignInDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInSuccess: (status, data) => dispatch(signInSuccess(status, data)),
    signInFailure: (status, err) => dispatch(signInFailure(status, err))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)