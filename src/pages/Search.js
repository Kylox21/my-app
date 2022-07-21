import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase";
import TextField from "@mui/material/TextField";
import { addDoc, collection } from "firebase/firestore";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import aico from "../assets/add_ico.svg";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { alpha, makeStyles, styled } from "@mui/material/styles";
import { height } from "@mui/system";

function Search({isAuth}) {
  const [post, setPost] = React.useState(null);
  const inputRef = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");
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
    <IconButton>
      <SearchSharpIcon onClick={onClick} />
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
        <TextField
          id="hidden-label"
          placeholder="Search"
          size="small"
          InputProps={{ endAdornment: <Srch /> }}
          disableAnimation={true}
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
      </div>
      
      <div className="imgdiv">
        <h1>{post.items[0].volumeInfo.title}</h1>
        <h2>{post.items[0].volumeInfo.authors}</h2>
        {/* <img className="aico" src={aico}></img> */}
        <IconButton onClick={sendImg} sx={{ml:"60px"}}>
        <AddCircleOutlineSharpIcon/>
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
    </>
  );
}

export default Search;
