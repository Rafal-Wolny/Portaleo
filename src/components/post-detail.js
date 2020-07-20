import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import "./post-detail.css";
import Navbar from "./navbar";
import SideDrawer from "./sideMenu";
import Backdrop from "./backdrop";
import Slider from "infinite-react-carousel";
import { useParams, withRouter } from "react-router-dom";
import Image from "./sliderimages";

function GetPost(id) {
  const [post, setPost] = useState("");

  useEffect(() => {
    firebase.db
      .collection("posts")
      .doc(id)
      .onSnapshot((snapshot) => {
        const newPosts = snapshot.data();
        setPost(newPosts);
      });
  }, [id]);

  return post;
}

const PostDetail = () => {
  let { id } = useParams();
  const snapshot = GetPost(id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let sideDrawer;
  let backdrop;

  if (isMenuOpen) {
    sideDrawer = <SideDrawer />;
    backdrop = <Backdrop click={() => setIsMenuOpen(!isMenuOpen)} />;
  }

  let slider;

  if (snapshot !== "") {
    const arrayOfImages = [];
    snapshot.imgUrl.map((e) => arrayOfImages.push(e));

    slider = (
      <Slider className="caorusel" cancelable="false">
        {arrayOfImages.map((e) => {
          return <Image key={e} img={e} />;
        })}
      </Slider>
    );

    console.log(arrayOfImages);
  }

  return (
    <div className="detail-post-container">
      <Navbar drawerClickHandler={() => setIsMenuOpen(!isMenuOpen)} />
      {sideDrawer}
      {backdrop}
      <div className="container-detailed-post">
        {slider}

        <div className="primary-details-post">
          <span>
            <p className="fb-info">Informacje</p>
          </span>
          <span>
            <p>Tytuł: </p>
            <p className="fb-info">{snapshot.title}</p>
          </span>
          <span>
            <p>Marka telefonu: </p> <p className="fb-info">{snapshot.brand}</p>
          </span>
          <span>
            <p>Nazwa użytkownika: </p>
            <p className="fb-info">{snapshot.userName}</p>
          </span>
          <span>
            <p>Cena:</p> <p className="fb-info">{snapshot.price}</p>
          </span>
        </div>

        <div className="content-spacer"></div>

        <div className="primary-details-post">
          <span className="fb-info">
            <p>Szczegóły</p>
          </span>
          <span>
            <p>Nazwa modelu: </p> <p className="fb-info">{snapshot.model}</p>
          </span>
          <span>
            <p>Wielkość wyświetlacza:</p>{" "}
            <p className="fb-info">{snapshot.sizeScreen}</p>
          </span>
          <span>
            <p>Ilość pamięci RAM: </p> <p className="fb-info">{snapshot.ram}</p>
          </span>
        </div>

        <div className="content-spacer"></div>

        <div className="description-post">
          <span>
            <p className="fb-info">Opis</p>{" "}
          </span>
          <span>
            <p>{snapshot.descritpion}</p>
          </span>
        </div>

        <div className="content-spacer"></div>

        <div className="primary-details-post">
          <span>
            <p className="fb-info">Dane kontaktowe</p>
          </span>
          <span>
            <p>Miasto:</p>
            <p className="fb-info"> {snapshot.city}</p>
          </span>
          <span>
            <p>Email:</p> <p className="fb-info"> {snapshot.email}</p>
          </span>
          <span>
            <p>Telefon:</p>
            <p className="fb-info"> {snapshot.phone}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PostDetail);
