import './App.scss';
import Header from '../Header/Header';
import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import Profile from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import Table from '../Table/Table';
import Err404 from '../Err404/Err404';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="*" element={<Err404 />} />
      </Routes>
    </div>
  );
}

export default App;
