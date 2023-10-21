import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import api from "../../services/api";
import axios from "axios";

import "./styles.css";
import logo from "../../assets/logo.svg";

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
  const [entityName, setEntityName] = useState("")
  const [entityEmail, setEntityEmail] = useState("")
  const [entityWpp, setEntityWpp] = useState("")

  const [userPosition, setUserPosition] = useState<[number, number]>([0, 0]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  // pegando os items da api
  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
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


  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="ecoleta logo" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" onChange={(e) => setEntityName(e.target.value)} />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" onChange={(e) => setEntityEmail(e.target.value)} />
            </div>

            <div className="field">
              <label htmlFor="whataspp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" onChange={(e) => setEntityWpp(e.target.value)}/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <MapContainer
            center={initialPosition}
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
              <li key={item.id}>
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
