import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";

const config = {
  apiKey: "AIzaSyB-i3ejQaaIZ0oFx88X7Ha3teTeNtwAYVc",
  authDomain: "portaleo-be2d8.firebaseapp.com",
  databaseURL: "https://portaleo-be2d8.firebaseio.com",
  projectId: "portaleo-be2d8",
  storageBucket: "portaleo-be2d8.appspot.com",
  messagingSenderId: "386141356361",
  appId: "1:386141356361:web:28fe3eb8e3f9a2ccce9a98",
  measurementId: "G-0Q0ENKVKFS",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.im = app.storage();
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth
      .signOut()
      .then(() => {
        alert("wylogowano pomyślnie");
      })
      .catch((error) => {
        alert("coś poszło nie tak");
      });
  }
  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUserName() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
