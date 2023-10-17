// start do servidor.
import express from "express";
import routes from './routes'
import path from 'path'

const app = express();

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))) // express.static para servir as imagens estáticas da aplicação.

app.listen(3333);
