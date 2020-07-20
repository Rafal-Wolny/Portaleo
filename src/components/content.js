import React, {useState, useEffect} from 'react';
import './content.css';
import PaginacionTabla from './pageination';
import image from '../assets/no-image.png';
import firebase from './firebase';
import {Link, withRouter} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const cities = [
  {value: 'Aleksandrów Kujawski', label: 'Aleksandrów Kujawski'},
  {value: 'Aleksandrów Łódzki', label: 'Aleksandrów Łódzki'},
  {value: 'Alwernia', label: 'Alwernia'},
  {value: 'Andrychów', label: 'Andrychów'},
  {value: 'Annopol', label: 'Annopol'},
  {value: 'Augustów', label: 'Augustów'},
  {value: 'Babimost', label: 'Babimost'},
  {value: 'Baborów', label: 'Baborów'},
  {value: 'Baranów Sandomierski', label: 'Baranów Sandomierski'},
  {value: 'Barcin', label: 'Barcin'},
  {value: 'Barczewo', label: 'Barczewo'},
  {value: 'Bardo', label: 'Bardo'},
  {value: 'Barlinek', label: 'Barlinek'},
  {value: 'Bartoszyce', label: 'Bartoszyce'},
  {value: 'Barwice', label: 'Barwice'},
  {value: 'Bełchatów', label: 'Bełchatów'},
  {value: 'Bełżyce', label: 'Bełżyce'},
  {value: 'Będzin', label: 'Będzin'},
  {value: 'Biała', label: 'Biała'},
  {value: 'Biała Piska', label: 'Biała Piska'},
  {value: 'Biała Podlaska', label: 'Biała Podlaska'},
  {value: 'Biała Rawska', label: 'Biała Rawska'},
  {value: 'Białobrzegi', label: 'Białobrzegi'},
  {value: 'Białogard', label: 'Białogard'},
  {value: 'Biały Bór', label: 'Biały Bór'},
  {value: 'Białystok', label: 'Białystok'},
  {value: 'Biecz', label: 'Biecz'},
  {value: 'Bielawa', label: 'Bielawa'},
  {value: 'Bielsk Podlaski', label: 'Bielsk Podlaski'},
  {value: 'Bielsko-Biała', label: 'Bielsko-Biała'},
  {value: 'Bieruń', label: 'Bieruń'},
  {value: 'Bierutów', label: 'Bierutów'},
  {value: 'Bieżuń', label: 'Bieżuń'},
  {value: 'Biłgoraj', label: 'Biłgoraj'},
  {value: 'Biskupiec', label: 'Biskupiec'},
  {value: 'Bisztynek', label: 'Bisztynek'},
  {value: 'Blachownia', label: 'Blachownia'},
  {value: 'Błaszki', label: 'Błaszki'},
  {value: 'Błażowa', label: 'Błażowa'},
  {value: 'Błonie', label: 'Błonie'},
  {value: 'Bobolice', label: 'Bobolice'},
  {value: 'Bobowa', label: 'Bobowa'},
  {value: 'Bochnia', label: 'Bochnia'},
  {value: 'Bodzentyn', label: 'Bodzentyn'},
  {value: 'Bogatynia', label: 'Bogatynia'},
  {value: 'Boguchwała', label: 'Boguchwała'},
  {value: 'Boguszów-Gorce', label: 'Boguszów-Gorce'},
  {value: 'Bojanowo', label: 'Bojanowo'},
  {value: 'Bolesławiec', label: 'Bolesławiec'},
  {value: 'Bolków', label: 'Bolków'},
  {value: 'Borek Wielkopolski', label: 'Borek Wielkopolski'},
  {value: 'Borne Sulinowo', label: 'Borne Sulinowo'},
  {value: 'Braniewo', label: 'Braniewo'},
  {value: 'Brańsk', label: 'Brańsk'},
  {value: 'Brodnica', label: 'Brodnica'},
  {value: 'Brok', label: 'Brok'},
  {value: 'Brusy', label: 'Brusy'},
  {value: 'Brwinów', label: 'Brwinów'},
  {value: 'Brzeg', label: 'Brzeg'},
  {value: 'Brzeg Dolny', label: 'Brzeg Dolny'},
  {value: 'Brwinów', label: 'Brwinów'},
  {value: 'Brzesko', label: 'Brzesko'},
  {value: 'Brzeszcze', label: 'Brzeszcze'},
  {value: 'Brześć Kujawski', label: 'Brześć Kujawski'},
  {value: 'Brzeziny', label: 'Brzeziny'},
  {value: 'Brzostek', label: 'Brzostek'},
  {value: 'Brzozów', label: 'Brzozów'},
  {value: 'Buk', label: 'Buk'},
  {value: 'Bukowno', label: 'Bukowno'},
  {value: 'Busko-Zdrój', label: 'Busko-Zdrój'},
  {value: 'Bychawa', label: 'Bychawa'},
  {value: 'Byczyna', label: 'Byczyna'},
  {value: 'Bydgoszcz', label: 'Bydgoszcz'},
  {value: 'Bystrzyca Kłodzka', label: 'Bystrzyca Kłodzka'},
  {value: 'Bytom', label: 'Bytom'},
  {value: 'Bytom Odrzański', label: 'Bytom Odrzański'},
  {value: 'Bytów', label: 'Bytów'},
  {value: 'Cedynia', label: 'Cedynia'},
  {value: 'Chełm', label: 'Chełm'},
  {value: 'Chełmek', label: 'Chełmek'},
  {value: 'Chełmno', label: 'Chełmno'},
  {value: 'Chełmża', label: 'Chełmża'},
  {value: 'Chęciny', label: 'Chęciny'},
  {value: 'Chmielnik', label: 'Chmielnik'},
  {value: 'Chocianów', label: 'Chocianów'},
  {value: 'Chociwel', label: 'Chociwel'},
  {value: 'Chocz', label: 'Chocz'},
  {value: 'Chodecz', label: 'Chodecz'},
  {value: 'Chodzież', label: 'Chodzież'},
  {value: 'Chojna', label: 'Chojna'},
  {value: 'Chojnice', label: 'Chojnice'},
  {value: 'Chojnów', label: 'Chojnów'},
  {value: 'Choroszcz', label: 'Choroszcz'},
  {value: 'Chorzele', label: 'Chorzele'},
  {value: 'Chorzów', label: 'Chorzów'},
  {value: 'Choszczno', label: 'Choszczno'},
  {value: 'Chrzanów', label: 'Chrzanów'},
  {value: 'Ciechanowiec', label: 'Ciechanowiec'},
  {value: 'Ciechanów', label: 'Ciechanów'},
  {value: 'Ciechocinek', label: 'Ciechocinek'},
  {value: 'Cieszanów', label: 'Cieszanów'},
  {value: 'Cieszyn', label: 'Cieszyn'},
  {value: 'Ciężkowice', label: 'Ciężkowice'},
  {value: 'Cybinka', label: 'Cybinka'},
  {value: 'Czaplinek', label: 'Czaplinek'},
  {value: 'Czarna Białostocka', label: 'Czarna Białostocka'},
  {value: 'Czarna Woda', label: 'Czarna Woda'},
  {value: 'Czarne', label: 'Czarne'},
  {value: 'Czarnków', label: 'Czarnków'},
  {value: 'Czchów', label: 'Czchów'},
  {value: 'Czechowice-Dziedzice', label: 'Czechowice-Dziedzice'},
  {value: 'Czeladź', label: 'Czeladź'},
  {value: 'Czempiń', label: 'Czempiń'},
  {value: 'Czerniejewo', label: 'Czerniejewo'},
  {value: 'Czersk', label: 'Czersk'},
  {value: 'Czerwieńsk', label: 'Czerwieńsk'},
  {value: 'Czerwionka-Leszczyny', label: 'Czerwionka-Leszczyny'},
  {value: 'Czerwińsk nad Wisłą', label: 'Czerwińsk nad Wisłą'},
  {value: 'Częstochowa', label: 'Częstochowa'},
  {value: 'Człopa', label: 'Człopa'},
  {value: 'Człuchów', label: 'Człuchów'},
  {value: 'Czyżew', label: 'Czyżew'},
  {value: 'Daleszyce', label: 'Daleszyce'},
  {value: 'Darłowo', label: 'Darłowo'},
  {value: 'Dąbie', label: 'Brwinów'},
  {value: 'Dąbrowa Białostocka', label: 'Dąbrowa Białostocka'},
  {value: 'Dąbrowa Górnicza', label: 'Dąbrowa Górnicza'},
  {value: 'Warszawa', label: 'Warszawa'},
  {value: 'Kraków', label: 'Kraków'},
  {value: 'Łódź', label: 'Łódź'},
  {value: 'Wrocław', label: 'Wrocław'},
  {value: 'Poznań', label: 'Poznań'},
  {value: 'Gdańsk', label: 'Gdańsk'},
  {value: 'Szczecin', label: 'Szczecin'},
  {value: 'Bydgoszcz', label: 'Bydgoszcz'},
  {value: 'Lublin', label: 'Lublin'},
  {value: 'Białystok', label: 'Białystok'},
  {value: 'Katowice', label: 'Katowice'},
  {value: 'Gdynia', label: 'Gdynia'},
  {value: 'Częstochowa', label: 'Częstochowa'},
  {value: 'Radom', label: 'Radom'},
  {value: 'Sosnowiec', label: 'Sosnowiec'},
  {value: 'Toruń', label: 'Toruń'},
  {value: 'Kielce', label: 'Kielce'},
  {value: 'Rzeszów', label: 'Rzeszów'},
  {value: 'Gliwice', label: 'Gliwice'},
  {value: 'Zabrze', label: 'Zabrze'},
  {value: 'Olsztyn', label: 'Olsztyn'},
  {value: 'Bielsko-Biała', label: 'Bielsko-Biała'},
  {value: 'Bytom', label: 'Bytom'},
  {value: 'Zielona Góra', label: 'Zielona Góra'},
  {value: 'Rybnik', label: 'Rybnik'},
  {value: 'Ruda Śląska', label: 'Ruda Śląska'},
  {value: 'Tychy', label: 'Tychy'},
  {value: 'Opole', label: 'Opole'},
  {value: 'Gorzów Wielkopolski', label: 'Gorzów Wielkopolski'},
];

const brands = [
  {value: 'Alcatel', label: 'Alcatel'},
  {value: 'Amoi', label: 'Amoi'},
  {value: 'Apple', label: 'Apple'},
  {value: 'Asus', label: 'Asus'},
  {value: 'BenQ', label: 'BenQ'},
  {value: 'BlackBerry', label: 'BlackBerry'},
  {value: 'CECT', label: 'CECT'},
  {value: 'Fujitsu', label: 'Fujitsu'},
  {value: 'Haier', label: 'Haier'},
  {value: 'Huawei', label: 'Huawei'},
  {value: 'Kruger&Matz', label: 'Kruger&Matz'},
  {value: 'Lenovo', label: 'Lenovo'},
  {value: 'LG', label: 'LG'},
  {value: 'Manta', label: 'Manta'},
  {value: 'Motorola', label: 'Motorola'},
  {value: 'MyPhone', label: 'MyPhone'},
  {value: 'Nokia', label: 'Nokia'},
  {value: 'OnePlus', label: 'OnePlus'},
  {value: 'Oppo', label: 'Oppo'},
  {value: 'Panasonic', label: 'Panasonic'},
  {value: 'Philips', label: 'Philips'},
  {value: 'Qualcomm', label: 'Qualcomm'},
  {value: 'Sagem', label: 'Sagem'},
  {value: 'Samsung', label: 'Samsung'},
  {value: 'Sendo', label: 'Sendo'},
  {value: 'Siemens', label: 'Siemens'},
  {value: 'Sony', label: 'Sony'},
  {value: 'Thuraya', label: 'Thuraya'},
  {value: 'Toshiba', label: 'Toshiba'},
  {value: 'Vivo', label: 'Vivo'},
  {value: 'Vordon', label: 'Vordon'},
  {value: 'Xiaomi', label: 'Xiaomi'},
  {value: 'ZTE', label: 'ZTE'},
];

const sorts = {
  PRICE_ASC: {column: 'price', direction: 'asc'},
  PRICE_DESC: {column: 'price', direction: 'desc'},
};

const sorts_lables = [
  {value: 'PRICE_ASC', label: 'Ceny rosnąco'},
  {value: 'PRICE_DESC', label: 'Ceny malejąco'},
];

function UsePost (sortBy, priceMin = 0, priceMax = 100000000, city, brand) {
  const [posts, setPosts] = useState ([]);

  let query = firebase.db.collection ('posts');
  if (priceMin !== 0) query = query.where ('price', '>=', parseInt (priceMin));

  if (priceMax !== 100000000)
    query = query.where ('price', '<=', parseInt (priceMax));
  if (brand !== '') query = query.where ('brand', '==', brand);
  console.log (brand);
  if (city !== '') query = query.where ('city', '==', city);
  console.log (city);

  useEffect (
    () => {
      query
        .orderBy (sorts[sortBy].column, sorts[sortBy].direction)
        .onSnapshot (snapshot => {
          const newPosts = snapshot.docs.map (doc => ({
            id: doc.id,
            ...doc.data (),
          }));
          setPosts (newPosts);
        });
    },
    [sortBy, priceMin, priceMax, city, brand, query]
  );
  return posts;
}

const Content = props => {
  const [sortBy, setSortBy] = useState ('PRICE_ASC');
  const [brand, setBrand] = useState ('');
  const [priceMin, setPriceMin] = useState (0);
  const [priceMax, setPriceMax] = useState (100000000);
  const [city, setCity] = useState ('');
  const posts = UsePost (
    sortBy,
    parseInt (priceMin),
    parseInt (priceMax),
    city,
    brand
  );

  const arrayOfPosts = [];

  posts.map (post =>
    arrayOfPosts.push (
      <tr key={post.id}>
        <td>
          <div className="container-post">
            <div className="image">
              <img
                src={post.imgUrl[0] !== '' ? post.imgUrl[0] : image}
                alt="miniaturka"
              />
            </div>
            <div className="details">
              <span className="title">{post.title}</span>
              <div className="details-price">
                <p className="price">{post.price} zł</p>
                <p className="brand">{post.brand}</p>
              </div>
            </div>
            <Link to={'/post-detail/' + post.id}>
              <Button variant="contained" color="primary">
                Czytaj więcej
              </Button>
            </Link>
          </div>
        </td>
      </tr>
    )
  );

  const defaultProps = {
    options: brands,
    getOptionLabel: option =>
      typeof option === 'string' ? option : option.label,
  };

  const defaultCities = {
    options: cities,
    getOptionLabel: option =>
      typeof option === 'string' ? option : option.label,
  };

  return (
    <div className="content">
      <div className="search-box">
        <h1 className="invitation-head">Portaleo</h1>
        <h2 className="invitation-head-2">
          znajdziesz tutaj smartfon jakiego szukasz
        </h2>
        <br />
        <div className="sort-manager">
          <form className="form-container">
            <h2>Filtruj ogłoszenia:</h2>
            <Autocomplete
              {...defaultProps}
              id="auto-select"
              value={brand}
              onChange={(e, newValue) => {
                newValue === null ? setBrand ('') : setBrand (newValue.value);
              }}
              autoSelect
              renderInput={params => (
                <TextField {...params} label="Wybierz markę" margin="normal" />
              )}
            />
            <br />

            <TextField
              id="outlined-basic"
              label="Cena od"
              variant="outlined"
              type="number"
              onChange={e => {
                e.currentTarget.value === ''
                  ? setPriceMin (0)
                  : setPriceMin (e.currentTarget.value);
              }}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Cena do"
              variant="outlined"
              type="number"
              onChange={e => {
                e.currentTarget.value === ''
                  ? setPriceMax (10000000)
                  : setPriceMax (e.currentTarget.value);
              }}
            />
            <br />
            <Autocomplete
              {...defaultCities}
              id="auto-select"
              value={city}
              onChange={(e, newValue) => {
                newValue === null ? setCity ('') : setCity (newValue.value);
              }}
              autoSelect
              renderInput={params => (
                <TextField {...params} label="Lokalizacja" margin="normal" />
              )}
            />
          </form>
        </div>
        <br />
        <div className="sort-box">
          <TextField
            id="outlined-select-currency-native"
            select
            label="Sortuj według"
            value={sortBy}
            onChange={e => {
              setSortBy (e.currentTarget.value);
            }}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {sorts_lables.map (option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
        <div className="posts-container">
          <table className="table table-hover">
            <PaginacionTabla
              itemsperpage={5}
              nocolumns={1}
              items={arrayOfPosts}
              pagesspan={1}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default withRouter (Content);
