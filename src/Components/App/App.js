import './App.scss';
import Header from '../Header/Header';
import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Dashboard from '../Dashboard/Dashboard';
import Table from '../Table/Table';
import Err404 from '../Err404/Err404';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userCheckToken } from "../../feature/users.slice";
import SuccesModal from '../SuccesModal/SuccesModal';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return
    }
    dispatch(userCheckToken(token))

  }, []);

  return (
    <div className="App">
      <Header />
      <SuccesModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="*" element={<Err404 />} />
        <Route path="/succesModal" element={<SuccesModal />} />
      </Routes>
    </div>
  );
}

export default App;
