import React, { useState } from "react";
import "./addposts.css";
import firebase from "./firebase";
import Navbar from "./navbar";
import Backdrop from "./backdrop";
import SideDrawer from "./sideMenu";
import FileUploader from "react-firebase-file-uploader";
import { TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const options = [
  { value: "", label: "" },
  { value: "Aleksandrów Kujawski", label: "Aleksandrów Kujawski" },
  { value: "Aleksandrów Łódzki", label: "Aleksandrów Łódzki" },
  { value: "Alwernia", label: "Alwernia" },
  { value: "Andrychów", label: "Andrychów" },
  { value: "Annopol", label: "Annopol" },
  { value: "Augustów", label: "Augustów" },
  { value: "Babimost", label: "Babimost" },
  { value: "Baborów", label: "Baborów" },
  { value: "Baranów Sandomierski", label: "Baranów Sandomierski" },
  { value: "Barcin", label: "Barcin" },
  { value: "Barczewo", label: "Barczewo" },
  { value: "Bardo", label: "Bardo" },
  { value: "Barlinek", label: "Barlinek" },
  { value: "Bartoszyce", label: "Bartoszyce" },
  { value: "Barwice", label: "Barwice" },
  { value: "Bełchatów", label: "Bełchatów" },
  { value: "Bełżyce", label: "Bełżyce" },
  { value: "Będzin", label: "Będzin" },
  { value: "Biała", label: "Biała" },
  { value: "Biała Piska", label: "Biała Piska" },
  { value: "Biała Podlaska", label: "Biała Podlaska" },
  { value: "Biała Rawska", label: "Biała Rawska" },
  { value: "Białobrzegi", label: "Białobrzegi" },
  { value: "Białogard", label: "Białogard" },
  { value: "Biały Bór", label: "Biały Bór" },
  { value: "Białystok", label: "Białystok" },
  { value: "Biecz", label: "Biecz" },
  { value: "Bielawa", label: "Bielawa" },
  { value: "Bielsk Podlaski", label: "Bielsk Podlaski" },
  { value: "Bielsko-Biała", label: "Bielsko-Biała" },
  { value: "Bieruń", label: "Bieruń" },
  { value: "Bierutów", label: "Bierutów" },
  { value: "Bieżuń", label: "Bieżuń" },
  { value: "Biłgoraj", label: "Biłgoraj" },
  { value: "Biskupiec", label: "Biskupiec" },
  { value: "Bisztynek", label: "Bisztynek" },
  { value: "Blachownia", label: "Blachownia" },
  { value: "Błaszki", label: "Błaszki" },
  { value: "Błażowa", label: "Błażowa" },
  { value: "Błonie", label: "Błonie" },
  { value: "Bobolice", label: "Bobolice" },
  { value: "Bobowa", label: "Bobowa" },
  { value: "Bochnia", label: "Bochnia" },
  { value: "Bodzentyn", label: "Bodzentyn" },
  { value: "Bogatynia", label: "Bogatynia" },
  { value: "Boguchwała", label: "Boguchwała" },
  { value: "Boguszów-Gorce", label: "Boguszów-Gorce" },
  { value: "Bojanowo", label: "Bojanowo" },
  { value: "Bolesławiec", label: "Bolesławiec" },
  { value: "Bolków", label: "Bolków" },
  { value: "Borek Wielkopolski", label: "Borek Wielkopolski" },
  { value: "Borne Sulinowo", label: "Borne Sulinowo" },
  { value: "Braniewo", label: "Braniewo" },
  { value: "Brańsk", label: "Brańsk" },
  { value: "Brodnica", label: "Brodnica" },
  { value: "Brok", label: "Brok" },
  { value: "Brusy", label: "Brusy" },
  { value: "Brwinów", label: "Brwinów" },
  { value: "Brzeg", label: "Brzeg" },
  { value: "Brzeg Dolny", label: "Brzeg Dolny" },
  { value: "Brwinów", label: "Brwinów" },
  { value: "Brzesko", label: "Brzesko" },
  { value: "Brzeszcze", label: "Brzeszcze" },
  { value: "Brześć Kujawski", label: "Brześć Kujawski" },
  { value: "Brzeziny", label: "Brzeziny" },
  { value: "Brzostek", label: "Brzostek" },
  { value: "Brzozów", label: "Brzozów" },
  { value: "Buk", label: "Buk" },
  { value: "Bukowno", label: "Bukowno" },
  { value: "Busko-Zdrój", label: "Busko-Zdrój" },
  { value: "Bychawa", label: "Bychawa" },
  { value: "Byczyna", label: "Byczyna" },
  { value: "Bydgoszcz", label: "Bydgoszcz" },
  { value: "Bystrzyca Kłodzka", label: "Bystrzyca Kłodzka" },
  { value: "Bytom", label: "Bytom" },
  { value: "Bytom Odrzański", label: "Bytom Odrzański" },
  { value: "Bytów", label: "Bytów" },
  { value: "Cedynia", label: "Cedynia" },
  { value: "Chełm", label: "Chełm" },
  { value: "Chełmek", label: "Chełmek" },
  { value: "Chełmno", label: "Chełmno" },
  { value: "Chełmża", label: "Chełmża" },
  { value: "Chęciny", label: "Chęciny" },
  { value: "Chmielnik", label: "Chmielnik" },
  { value: "Chocianów", label: "Chocianów" },
  { value: "Chociwel", label: "Chociwel" },
  { value: "Chocz", label: "Chocz" },
  { value: "Chodecz", label: "Chodecz" },
  { value: "Chodzież", label: "Chodzież" },
  { value: "Chojna", label: "Chojna" },
  { value: "Chojnice", label: "Chojnice" },
  { value: "Chojnów", label: "Chojnów" },
  { value: "Choroszcz", label: "Choroszcz" },
  { value: "Chorzele", label: "Chorzele" },
  { value: "Chorzów", label: "Chorzów" },
  { value: "Choszczno", label: "Choszczno" },
  { value: "Chrzanów", label: "Chrzanów" },
  { value: "Ciechanowiec", label: "Ciechanowiec" },
  { value: "Ciechanów", label: "Ciechanów" },
  { value: "Ciechocinek", label: "Ciechocinek" },
  { value: "Cieszanów", label: "Cieszanów" },
  { value: "Cieszyn", label: "Cieszyn" },
  { value: "Ciężkowice", label: "Ciężkowice" },
  { value: "Cybinka", label: "Cybinka" },
  { value: "Czaplinek", label: "Czaplinek" },
  { value: "Czarna Białostocka", label: "Czarna Białostocka" },
  { value: "Czarna Woda", label: "Czarna Woda" },
  { value: "Czarne", label: "Czarne" },
  { value: "Czarnków", label: "Czarnków" },
  { value: "Czchów", label: "Czchów" },
  { value: "Czechowice-Dziedzice", label: "Czechowice-Dziedzice" },
  { value: "Czeladź", label: "Czeladź" },
  { value: "Czempiń", label: "Czempiń" },
  { value: "Czerniejewo", label: "Czerniejewo" },
  { value: "Czersk", label: "Czersk" },
  { value: "Czerwieńsk", label: "Czerwieńsk" },
  { value: "Czerwionka-Leszczyny", label: "Czerwionka-Leszczyny" },
  { value: "Czerwińsk nad Wisłą", label: "Czerwińsk nad Wisłą" },
  { value: "Częstochowa", label: "Częstochowa" },
  { value: "Człopa", label: "Człopa" },
  { value: "Człuchów", label: "Człuchów" },
  { value: "Czyżew", label: "Czyżew" },
  { value: "Daleszyce", label: "Daleszyce" },
  { value: "Darłowo", label: "Darłowo" },
  { value: "Dąbie", label: "Brwinów" },
  { value: "Dąbrowa Białostocka", label: "Dąbrowa Białostocka" },
  { value: "Dąbrowa Górnicza", label: "Dąbrowa Górnicza" },
  { value: "Warszawa", label: "Warszawa" },
  { value: "Kraków", label: "Kraków" },
  { value: "Łódź", label: "Łódź" },
  { value: "Wrocław", label: "Wrocław" },
  { value: "Poznań", label: "Poznań" },
  { value: "Gdańsk", label: "Gdańsk" },
  { value: "Szczecin", label: "Szczecin" },
  { value: "Bydgoszcz", label: "Bydgoszcz" },
  { value: "Lublin", label: "Lublin" },
  { value: "Białystok", label: "Białystok" },
  { value: "Katowice", label: "Katowice" },
  { value: "Gdynia", label: "Gdynia" },
  { value: "Częstochowa", label: "Częstochowa" },
  { value: "Radom", label: "Radom" },
  { value: "Sosnowiec", label: "Sosnowiec" },
  { value: "Toruń", label: "Toruń" },
  { value: "Kielce", label: "Kielce" },
  { value: "Rzeszów", label: "Rzeszów" },
  { value: "Gliwice", label: "Gliwice" },
  { value: "Zabrze", label: "Zabrze" },
  { value: "Olsztyn", label: "Olsztyn" },
  { value: "Bielsko-Biała", label: "Bielsko-Biała" },
  { value: "Bytom", label: "Bytom" },
  { value: "Zielona Góra", label: "Zielona Góra" },
  { value: "Rybnik", label: "Rybnik" },
  { value: "Ruda Śląska", label: "Ruda Śląska" },
  { value: "Tychy", label: "Tychy" },
  { value: "Opole", label: "Opole" },
  { value: "Gorzów Wielkopolski", label: "Gorzów Wielkopolski" },
];

const rams = [
  { value: "", label: "" },
  { value: "1GB", label: "1GB" },
  { value: "2GB", label: "2GB" },
  { value: "3GB", label: "3GB" },
  { value: "4GB", label: "4GB" },
  { value: "5GB", label: "5GB" },
  { value: "6GB", label: "6GB" },
  { value: "7GB", label: "7GB" },
  { value: "8GB", label: "8GB" },
  { value: "9GB", label: "9GB" },
  { value: "10GB", label: "10GB" },
  { value: "11GB", label: "11GB" },
  { value: "12GB", label: "12GB" },
];

const screenSizes = [
  { value: "", label: "" },
  { value: "2.4'-4'", label: "2.4'-4'" },
  { value: "5'-6'", label: "5'-6'" },
  { value: "6'+", label: "6'+" },
];

const brands = [
  { value: "", label: "" },
  { value: "Alcatel", label: "Alcatel" },
  { value: "Amoi", label: "Amoi" },
  { value: "Apple", label: "Apple" },
  { value: "Asus", label: "Asus" },
  { value: "BenQ", label: "BenQ" },
  { value: "BlackBerry", label: "BlackBerry" },
  { value: "CECT", label: "CECT" },
  { value: "Fujitsu", label: "Fujitsu" },
  { value: "Haier", label: "Haier" },
  { value: "Huawei", label: "Huawei" },
  { value: "Kruger&Matz", label: "Kruger&Matz" },
  { value: "Lenovo", label: "Lenovo" },
  { value: "LG", label: "LG" },
  { value: "Manta", label: "Manta" },
  { value: "Motorola", label: "Motorola" },
  { value: "MyPhone", label: "MyPhone" },
  { value: "Nokia", label: "Nokia" },
  { value: "OnePlus", label: "OnePlus" },
  { value: "Oppo", label: "Oppo" },
  { value: "Panasonic", label: "Panasonic" },
  { value: "Philips", label: "Philips" },
  { value: "Qualcomm", label: "Qualcomm" },
  { value: "Sagem", label: "Sagem" },
  { value: "Samsung", label: "Samsung" },
  { value: "Sendo", label: "Sendo" },
  { value: "Siemens", label: "Siemens" },
  { value: "Sony", label: "Sony" },
  { value: "Thuraya", label: "Thuraya" },
  { value: "Toshiba", label: "Toshiba" },
  { value: "Vivo", label: "Vivo" },
  { value: "Vordon", label: "Vordon" },
  { value: "Xiaomi", label: "Xiaomi" },
  { value: "ZTE", label: "ZTE" },
];

const defaultProps = {
  options: options,
  getOptionLabel: (option) =>
    typeof option === "string" ? option : option.label,
};
const AddPosts = (props) => {
  let defaultValueEmail = "";
  let defaultValueName = "";

  if (firebase.getCurrentUserName()) {
    defaultValueEmail = firebase.auth.currentUser.email;
    defaultValueName = firebase.getCurrentUserName();
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [sizeScreen, setSizeScreen] = useState("");
  const [ram, setRam] = useState("");
  const [price, setPrice] = useState("");
  const [descritpion, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const [city, setCity] = useState("");
  const [email, setEmail] = useState(defaultValueEmail);
  const [phone, setPhone] = useState(0);
  const [userName, setUserName] = useState(defaultValueName);

  if (!firebase.getCurrentUserName()) {
    alert("Proszę zaloguj się aby dodać post");
    props.history.replace("/login");
    return null;
  }

  let sideDrawer;
  let backdrop;

  if (isMenuOpen) {
    sideDrawer = <SideDrawer />;
    backdrop = <Backdrop click={() => setIsMenuOpen(!isMenuOpen)} />;
  }

  function onSubmit(e) {
    e.preventDefault();
    firebase.db
      .collection("posts")
      .add({
        title,
        brand,
        model,
        sizeScreen,
        ram,
        price: parseInt(price),
        descritpion,
        imgUrl,
        city,
        email,
        phone,
        userName,
      })
      .then(() => {
        setTitle("");
        setBrand("");
        setModel("");
        setSizeScreen("");
        setRam("");
        setPrice("");
        setDescription("");
        setImgUrl("");
        setCity("");
        setEmail("");
        setPhone(0);
        setUserName(firebase.getCurrentUserName());
      })
      .then(() => {
        alert("Pomyślnie dodano post!");
        props.history.push("/");
      });
  }
  return (
    <div className="flex-container-addpost">
      <Navbar drawerClickHandler={() => setIsMenuOpen(!isMenuOpen)} />
      {sideDrawer}
      {backdrop}
      <div className="add-post-container">
        <h1>Dodaj ogłoszenie!</h1>
        <hr />
        <form className="form-container" onSubmit={onSubmit}>
          <TextField
            id="outlined-basic"
            label="Podaj tytuł ogłoszenia"
            variant="outlined"
            type="Text"
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          ></TextField>
          <br />

          <TextField
            id="outlined-select-currency-native"
            select
            label="Wybierz producenta twojego smartfona"
            value={brand}
            onChange={(e) => setBrand(e.currentTarget.value)}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {brands.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <br />

          <TextField
            id="outlined-basic"
            label="Wpisz model telefonu"
            variant="outlined"
            type="Text"
            onChange={(e) => setModel(e.currentTarget.value)}
            required
          ></TextField>
          <br />
          <TextField
            id="outlined-select-currency-native"
            select
            label="Podaj wielkość wyświetlacza smartfona"
            value={sizeScreen}
            onChange={(e) => {
              setSizeScreen(e.currentTarget.value);
            }}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {screenSizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <br />
          <TextField
            id="outlined-select-currency-native"
            select
            label="Wybierz ilość posiadanej pamięci RAM"
            value={ram}
            onChange={(e) => {
              setRam(e.currentTarget.value);
            }}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {rams.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <br />
          <TextField
            id="outlined-basic"
            label="Podaj cenę"
            variant="outlined"
            type="number"
            onChange={(e) => setPrice(e.currentTarget.value)}
            required
          ></TextField>
          <br />
          <label>Dodaj opis produktu</label>
          <hr />
          <br />
          <TextField
            id="outlined-multiline-flexible"
            label="Opis"
            multiline
            rowsMax={12}
            variant="outlined"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <br />
          <label>Dodaj zdjęcia</label>
          <hr />
          <br />
          <FileUploader
            accept="image/*"
            name="image-uploader-multiple"
            randomizeFilename
            storageRef={firebase.im.ref("images")}
            onUploadStart={() => setIsUploading(!isUploading)}
            onUploadError={() => setIsUploading(false)}
            onUploadSuccess={(filename) =>
              firebase.im
                .ref("images")
                .child(filename)
                .getDownloadURL()
                .then((url) => {
                  //setFileName(url);
                  setImgUrl((oldArray) => [...oldArray, url]);
                })
            }
            multiple
          />

          <br />

          <label>Dane kontaktowe</label>
          <hr />
          <br />
          <TextField
            id="outlined-basic"
            label="Adres e-mail*"
            variant="outlined"
            type="email"
            value={email}
            InputProps={{
              readOnly: true,
            }}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Podaj numer telefonu (Format: 123456789)"
            variant="outlined"
            type="tel"
            name="phone"
            pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
          <br />
          <Autocomplete
            {...defaultProps}
            id="auto-select"
            value={city}
            onChange={(e, newValue) => {
              newValue === null ? setCity("") : setCity(newValue.value);
            }}
            autoSelect
            renderInput={(params) => (
              <TextField {...params} label="Wybierz miasto" margin="normal" />
            )}
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Dodaj ogłoszenie
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPosts;
