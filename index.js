const express = require('express')
require('dotenv').config();
const cors = require('cors')
const routerApi = require('./routes/indexRouter')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')
const {checkApiKey}= require('./middlewares/auth.handler')

const app = express();
app.use(express.json());
require('./utils/auth')

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
} // limita la conexión

app.get('/my', (req, res)=> {
  res.send('hi, welcome to my Api')
})

routerApi(app)

app.use(cors()) //habilita la conexión desde cualquier origen
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(process.env.PORT, ()=>{
  console.log('Server on port', process.env.PORT);
});
