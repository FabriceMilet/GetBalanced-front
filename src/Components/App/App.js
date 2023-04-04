import "./App.scss";
import Header from "../Header/Header";
import Home from "../Home/Home";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Dashboard from "../Dashboard/Dashboard";
import Table from "../Table/Table";
import Err404 from "../Err404/Err404";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userCheckToken } from "../../feature/user.slice";
import SuccesModal from "../SuccesModal/SuccesModal";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
    dispatch(userCheckToken(token));
  }, []);

  return (
    <div className="App">
      <Header />
      <SuccesModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={isLogged ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/dashboard"
          element={isLogged ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/table/:id"
          element={isLogged ? <Table /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Err404 />} />
        <Route path="/succesModal" element={<SuccesModal />} />
      </Routes>
    </div>
  );
}

export default App;
