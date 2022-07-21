import "./App.css";
import Avatar from '@mui/material/Avatar';
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import Login from "./pages/Login";
import Search from "./pages/Search";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useLocation } from "react-router-dom";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const history = createBrowserHistory();
  const location = useLocation();

  console.log(location.pathname);

  const signUserOut = () => {
    signOut(auth).then(() => {
      window.location.pathname = "/";
      localStorage.clear();
      setIsAuth(false);
    });
  };

  console.log(history.location.pathname);
  const profilepic = localStorage.getItem('profile');
  return (
    <div className="Main">
      <div className="navContainer">
        <nav>
        {isAuth && (
          <IconButton component={Link} to="/search">
            <SearchSharpIcon
              sx={{
                color:
                  history.location.pathname === "/search" ? "white" : "#858585",
                // color: "white",
                // stroke: "white",
                // strokeWidth: ".5",
                transform: "scale(1.3)",
              }}
            />
          </IconButton>
        )}
          <IconButton component={Link} to="explore">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31.972"
              height={25}
              viewBox="0 0 31.972 31.972"
            >
              <path
                id="Icon_material-explore"
                data-name="Icon material-explore"
                d="M18.986,17.228a1.758,1.758,0,1,0,1.758,1.758A1.753,1.753,0,0,0,18.986,17.228ZM18.986,3A15.986,15.986,0,1,0,34.972,18.986,15.992,15.992,0,0,0,18.986,3Zm3.5,19.487L9.394,28.578l6.091-13.093L28.578,9.394Z"
                transform="translate(-3 -3)"
                style={{
                  fill:
                    history.location.pathname === "/explore"
                      ? "white"
                      : "#858585",
                }}
              />
            </svg>
          </IconButton>

          {!isAuth ? (
            <Link to="/login"> Login </Link>
          ) : (
            <>
              <IconButton component={Link} to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28.702"
                  height={25}
                  viewBox="0 0 28.702 32.29"
                >
                  <path
                    id="home_FILL0_wght400_GRAD0_opsz48"
                    d="M8,37.165V16.388L21.938,6,35.7,16.388V37.165H25.574V24.829H18.085V37.165Zm2.6-2.6h4.891V22.232H28.171V34.568h4.934V17.687L21.938,9.246,10.6,17.687ZM21.851,21.885Z"
                    transform="translate(-7.5 -5.375)"
                    // fill="#858585"
                    stroke="#858585"
                    stroke-width="1"
                    style={{
                      fill:
                        history.location.pathname === "/" ? "white" : "#858585",
                    }}
                  />
                </svg>
              </IconButton>
        
            <Avatar component={Link} to="/profile" sx={{ width: 29, height: 29, backgroundSize: "300px" }} src={profilepic}></Avatar>
              {/* <button onClick={signUserOut}> Log Out</button> */}
            </>
          )}
        </nav>
      </div>


      <div className="nav2container">
        <nav2>
          <IconButton component={Link} to="/search">
          <SearchSharpIcon
              sx={{
               
                color: history.location.pathname === "/search" ? "black" : "#858585",
                transform: "scale(1.3)",
              }}
            />
          </IconButton>
          <IconButton component={Link} to="/explore">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31.972"
              height={25}
              viewBox="0 0 31.972 31.972"
            >
              <path
                id="Icon_material-explore"
                data-name="Icon material-explore"
                d="M18.986,17.228a1.758,1.758,0,1,0,1.758,1.758A1.753,1.753,0,0,0,18.986,17.228ZM18.986,3A15.986,15.986,0,1,0,34.972,18.986,15.992,15.992,0,0,0,18.986,3Zm3.5,19.487L9.394,28.578l6.091-13.093L28.578,9.394Z"
                transform="translate(-3 -3)"
                style={{
                  fill:
                    history.location.pathname === "/explore"
                      ? "black"
                      : "#BCBCBC",
                }}
              />
            </svg>
          </IconButton>
   

              <Avatar component={Link} to="/profile" sx={{ width: 29, height: 29, backgroundSize: "300px" }} src={profilepic}></Avatar>
        </nav2>
        </div>

      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/search" element={<Search isAuth={setIsAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
