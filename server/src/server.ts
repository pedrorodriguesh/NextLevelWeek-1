import express from "express";

const app = express();

/* 
  GET => buscar UMA ou MAIS informações do back-end
  POST => criar uma nova informação no back-end
  PUT => atualizar uma informação existente no back-end
  DELETE => deletar uma informação do back-end
*/

// Request Param => Parâmetros que vem na própria rota que identificam um recurso.

const users = [
  'diego',
  'cleiton',
  'robson',
  'pedro'
]

app.get("/users", (request, response) => {
  console.log("Listagem de Usuários");

  return response.json(users);
});

app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id);
  const user = users[id]

  return response.json(user)
})

app.post('/users', (request, response) => {
  const user = {
    name: 'Diego',
    email: 'diego@email.com'
  }

  return response.json(user)
})

app.listen(3333);
