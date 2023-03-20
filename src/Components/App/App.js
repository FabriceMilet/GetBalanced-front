import "./App.scss";
import Header from "../Header/Header";
import Home from "../Home/Home";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Dashboard from "../Dashboard/Dashboard";
import Table from "../Table/Table";
import Err404 from "../Error/Err404/Err404";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userCheckToken } from "../../feature/user.slice";
import SuccesModal from "../SuccesModal/SuccesModal";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClimbingBoxLoader";


export default function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const isLoadingUser = useSelector((state) => state.user.loading);
  console.log('isLoadingUser', isLoadingUser);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    dispatch(userCheckToken(token));
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <SuccesModal />
      {isLoadingUser ? (
        <ClipLoader  
        color="#00BFFF" 
        size={50}
        aria-label="Loading Spinner"
        cssOverride={{padding: "50%"}}
      />
      ) : (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {isLogged && <Route
          path="/user"
          element={isLogged ? <Profile /> : <Navigate to="/" replace />}
        />}
        {isLogged && <Route
          path="/dashboard"
          element={isLogged ? <Dashboard /> : <Navigate to="/" replace />}
        />}
        {isLogged && <Route
          path="/table/:id"
          element={isLogged ? <Table /> : <Navigate to="/" replace />}
        />}
        <Route path="*" element={<Err404 />} />
        <Route path="/succesModal" element={<SuccesModal />} />
      </Routes>
      )}
    </div>
  );
}
