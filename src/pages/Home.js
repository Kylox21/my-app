import React, { useEffect, useState, Component, Fragment } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

function Home({ isAuth }) {
  let navigate = useNavigate();
  var loader = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
  const [postLists, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const imageLoaded = () => {
    setLoading(false);
    console.log(loading);
  };


  return (
    <div className="homepage">
      {!loading && (
        <div className="homepage-container">
          <h3>Your</h3>
      <div className="ycontainer">
              
        <h4 className="ybkshlf">Bookshelf </h4>
       
      </div>
       </div>
      
       )}
      {loading && (
        <div className="loadingGifcontainer">
        <img className="loadingGif" src="https://i.giphy.com/media/xT77Y1T0zY1gR5qe5O/giphy.webp"></img>
        </div>
                    )}
      {postLists.map((post, key, index) => {
        return (
          <div className="Book">
            {isAuth && post.author.id === auth.currentUser.uid && (
              <div className="post">
                <div className="bookCont">
                  

                
                    <img
                      className="bookThumb"
                      src={post.link}
                      alt="book"
                     onLoad={imageLoaded}
                    />
                
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
