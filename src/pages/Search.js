import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase";
import TextField from "@mui/material/TextField";
import { addDoc, collection } from "firebase/firestore";
import { IconButton, Typography } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";

function Search() {
  const [post, setPost] = React.useState(null);
  const inputRef = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const postsCollectionRef = collection(db, "posts");
  async function getBooks() {
    let query = "themartian";
    if (inputRef.current) {
      query = inputRef.current.value;
    }
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    const response = await axios.get(url);

    setPost(response.data);
  }

  function onClick() {
    getBooks();
  }

  React.useEffect(() => {
    getBooks();
  }, []);

  const imageLoaded = () => {
    setLoading(false);
    var loaded = true;
    console.log(loaded);
  };

  if (!post) return null;
  if (post.items[0].volumeInfo.imageLinks !== undefined) {
    var test = post.items[0].volumeInfo.imageLinks.thumbnail;
    var newText = test.replace("edge=curl", "");
    var finalImage = newText.replace("zoom=1", "zoom=1");
    var finalfinal = finalImage.replace("http://", "https://");
  } else {
    var newText =
      "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
  }
  const Srch = () => (
    <IconButton onClick={onClick}>
      <SearchSharpIcon />
    </IconButton>
  );
  const sendImg = async () => {
    await addDoc(postsCollectionRef, {
      title: post.items[0].volumeInfo.title,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      link: finalfinal,
    });
  };

  return (
    <>
      <div className="inputdiv">
        {isAuth && (
          <TextField
            id="hidden-label"
            placeholder="Search"
            size="small"
            InputProps={{ endAdornment: <Srch /> }}
            inputRef={inputRef}
            sx={{
              [`& fieldset`]: {
                borderRadius: 0,
              },

              mt: 3,
              maxWidth: 480,
              ml: 5,
            }}
          />
        )}
      </div>
      {!isAuth && (
        <Typography
          sx={{
            fontFamily: "Gilroy-Medium",
            fontSize: "30px",
            flexGrow: 1,
            textAlign: "center",
            pt: 20,
          }}
        >
          Please Log In to Access This Page
        </Typography>
      )}
      {isAuth && (
        <div className="imgdiv">
          <h1>{post.items[0].volumeInfo.title}</h1>
          <h2>{post.items[0].volumeInfo.authors}</h2>
          {/* <img className="aico" src={aico}></img> */}

          <IconButton onClick={sendImg} sx={{ ml: "60px" }}>
            <AddCircleOutlineSharpIcon />
          </IconButton>

          <img
            className="bookimage"
            src={
              post.items[0].volumeInfo.imageLinks === undefined
                ? "https://images-na.ssl-images-amazon.com/images/I/21Ck1GCd5jL.jpg"
                : `${finalfinal}`
            }
            onLoad={imageLoaded}
          />
        </div>
      )}
    </>
  );
}

export default Search;
