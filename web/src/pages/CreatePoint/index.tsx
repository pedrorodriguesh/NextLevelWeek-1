import { FormEvent, useEffect, useState } from "react"; // hooks

import { FiArrowLeft } from "react-icons/fi"; // icon import
import { Link } from "react-router-dom";

import Dropzone from "../../components/Dropzone";

// ### Leaflet => Map API.
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import axios from "axios";
import api from "../../services/api";

import logo from "../../assets/logo.svg";
import "./styles.css";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Uf {
  id: number;
  nome: string;
  sigla: string;
}

interface Cities {
  id: number;
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [uf, setUf] = useState<Uf[]>([]);
  const [city, setCities] = useState<Cities[]>([]);

  // Estados para cadastro na API =>
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [entityName, setEntityName] = useState("");
  const [entityEmail, setEntityEmail] = useState("");
  const [entityWpp, setEntityWpp] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [userPosition, setUserPosition] = useState<[number, number]>([0, 0]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const [selectedFile, setSelectedFile] = useState<File>();

  // pegando os items da api
  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
      console.log(items);
    });
  }, []);

  // pegando os estados pela api do ibge
  useEffect(() => {
    axios
      .get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => {
        setUf(response.data);
      });
  }, []);

  // pegando as cidades de acordo com o estado selecionado, roda dnv toda vez que troca o estado.
  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      });
  }, [selectedUf]);

  // localização inicial do mapa no local do usuário.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setInitialPosition([
        Number(position.coords.latitude.toFixed(2)),
        Number(position.coords.longitude.toFixed(2)),
      ]);
    });
  }, []);

  // componente que pega a localização que o usuário clica.
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setUserPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return (
      <Marker position={userPosition}>
        <Popup>Você está aqui!</Popup>
      </Marker>
    );
  }

  // função dos itens selecionados.
  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  // submit do formulário, criar registro no banco de dados.
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const name = entityName;
    const email = entityEmail;
    const whatsapp = entityWpp;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = userPosition;
    const items = selectedItems;

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("whatsapp", whatsapp);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("city", city);
    data.append("uf", uf);
    data.append("items", items.join(","));

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    await api.post("points", data);

    alert("Ponto cadastrado com sucesso!");
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="ecoleta logo" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setEntityName(e.target.value)}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEntityEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="whataspp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={(e) => setEntityWpp(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <MapContainer
            center={[-22.222541067339215, -49.940111339092255]}
            zoom={15}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado</label>
              <select
                name="uf"
                id="uf"
                onChange={(e) => setSelectedUf(e.target.value)}
              >
                <option value="0">Selecione um estado</option>
                {uf.map((state) => (
                  <option value={state.sigla} key={state.id}>
                    {state.sigla}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="0">Selecione uma cidade</option>
                {city.map((city) => (
                  <option key={city.nome} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de Coleta</h2>
            <span>Selecione 1 ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
