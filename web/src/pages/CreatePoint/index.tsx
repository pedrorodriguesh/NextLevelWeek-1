import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

import "./styles.css";
import logo from "../../assets/logo.svg";

const CreatePoint = () => {
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
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="field">
              <label htmlFor="whataspp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <MapContainer
            center={[-22.226, -49.92]}
            zoom={15}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-22.226, -49.92]}>
              <Popup>
                Você está aqui!
              </Popup>
            </Marker>
          </MapContainer>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
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
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/lampadas.svg"
                alt="teste"
              />
              <span>Óleo de Cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;