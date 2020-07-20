import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Navbar from "./navbar";
import SideDrawer from "./sideMenu";
import Backdrop from "./backdrop";
import "./userposts.css";
import { Button } from "@material-ui/core";

function GetPosts() {
  const [posts, setPosts] = useState("");
  useEffect(() => {
    const user = firebase.auth.currentUser;
    let email = "";
    if (user) {
      email = user.email;
    }
    const query = firebase.db.collection("posts").where("email", "==", email);
    query.onSnapshot((snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(newPosts);
    });
  }, []);
  return posts;
}

const UserPosts = (props) => {
  const snapshot = GetPosts();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let sideDrawer;
  let backdrop;

  if (isMenuOpen) {
    sideDrawer = <SideDrawer />;
    backdrop = <Backdrop click={() => setIsMenuOpen(!isMenuOpen)} />;
  }
  let postList;
  if (snapshot !== "") {
    const arrayOfPosts = [];
    snapshot.forEach((e) => {
      arrayOfPosts.push({ title: e.title, brand: e.brand, id: e.id });
    });
    const deletePost = (id) => {
      firebase.db
        .collection("posts")
        .doc(id)
        .delete()
        .then(() => {
          alert("Post usunięty");
        });
    };
    postList = arrayOfPosts.map((e) => {
      return (
        <li>
          <p>Nazwa marki: {e.brand}</p>
          <p>Tytuł ogłoszenia: {e.title}</p>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => deletePost(e.id)}
          >
            Usuń ogłoszenie
          </Button>
        </li>
      );
    });
  }

  if (!firebase.getCurrentUserName()) {
    alert("Proszę zaloguj się aby przeglądać swoje ogłoszenia");
    props.history.replace("/login");
    return null;
  }

  return (
    <div className="user-post-container">
      <Navbar drawerClickHandler={() => setIsMenuOpen(!isMenuOpen)} />
      {sideDrawer}
      {backdrop}
      <div className="user-posts">
        <h1>Twoje ogłoszenia:</h1>
        <ul>{postList}</ul>
      </div>
    </div>
  );
};

export default UserPosts;
