
import './App.css';
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import Login from "./pages/Login";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Search from "./pages/Search";
import { IconButton } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import React, { useEffect, useState } from "react";
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
    <nav>
    
      <Link to="/"> Home </Link>
      <IconButton component={Link} to="/" >
  <HomeRoundedIcon sx={{color: 'white'}}/>
</IconButton>
      {!isAuth ? (
        <Link to="/login"> Login </Link>
      ) : (
        <>
          <Link to="/search">Search</Link>
          <button onClick={signUserOut}> Log Out</button>
        </>
      )}
      <h4>{}</h4>
    </nav>
    <Routes>
      <Route path="/" element={<Home isAuth={isAuth} />} />
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="/search" element={<Search isAuth={setIsAuth} />} />
    </Routes>
  </Router>
  );
}

export default App;
