import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import App from "../App";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

function Home({ isAuth }) {
  let navigate = useNavigate();
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);
 
  
  return postLists.map((post, key, index) => {
    return (
      <div className="App">
        {isAuth && post.author.id === auth.currentUser.uid && (
          <div className="post">
 
            <Paper sx={{ backgroundImage: `url(${post.link})`, height: "250px", width: "180px", backgroundRepeat: "no-repeat",  margin: "10px", backgroundSize: "cover", float : "left", borderRadius:"16px"}}></Paper>
          
          </div>
        )}
      </div>
    );
  });
}

export default Home;
