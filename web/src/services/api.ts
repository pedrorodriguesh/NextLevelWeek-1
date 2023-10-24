// conexão com o back-end =>  Axios. 

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;
