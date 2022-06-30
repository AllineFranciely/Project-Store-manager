const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const routes = require('./routes');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routes.productsRoutes);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;