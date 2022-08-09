const { cadastro } = require('./modulos/cadastro/cadastro')
const { marcacao } = require('./modulos/agendamento/marcacao')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const app = express()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.enable('trust proxy') 
app.disable('x-powered-by')
app.use(cadastro)
app.use(marcacao)

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */


// ========================= VEIO NO PROJETO MODELO BAIXADO ORIGINAL, ANTES DAS ADAPTAÇÕES FEITAS =========================
// app.get('/api/v2/users', async (req, res) => {
//   const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
//   res.json(data)
// })

// ========================= EXEMPLO PARA CHAMADAS SEM TOKEN =========================
app.get('/teste', async (req, res) => {
//   const { data } = await axios.get('http://localhost:8095/regulacao/agendamento')
  res.json({message : 'server is running'})
})


module.exports = { app }
