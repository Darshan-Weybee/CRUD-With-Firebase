import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { Navigate, Routes, Route, HashRouter } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { Provider } from "react-redux";
import {store} from "./redux/rootReducer/store";
import { connect } from 'react-redux';

function App({signInDetail}) {
  const { darkMode } = useContext(DarkModeContext);

  const RequireAuth = ({children}) => {
    return signInDetail.isSignedIn ? children : <Navigate to="/login"/>
  }

  useEffect(() => {

    function unloadFun(){
      localStorage.setItem("user", JSON.stringify(signInDetail));
    }

    window.addEventListener("beforeunload" , unloadFun);

    return () => window.removeEventListener("beforeunload", unloadFun);
  },[signInDetail])

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <HashRouter>
        <Provider store={store}>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="users">
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route path=":userId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<RequireAuth><New inputs={userInputs} title="Add New User" /></RequireAuth>}
              />
            </Route>
            <Route path="products">
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route path=":productId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<RequireAuth><New inputs={productInputs} title="Add New Product" /></RequireAuth>}
              />
            </Route>
          </Route>
        </Routes>
        </Provider>
      </HashRouter>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    signInDetail : state.userSignInDetail
  }
}

export default connect(mapStateToProps)(App);
