const express = require('express');
const { signInRoute, userRoute, categoryRoute, postRoute } = require('./routes/index');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/', signInRoute);
app.use('/', userRoute);
app.use('/', categoryRoute);
app.use('/', postRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
