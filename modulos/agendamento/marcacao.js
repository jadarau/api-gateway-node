const { agendamento } = require('./componentes/agendamento')
const { vagas } = require('./componentes/vagas')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const marcacao = express()

marcacao.use(express.json())
marcacao.use(cors())
marcacao.use(logger('dev'))
marcacao.enable('trust proxy') 
marcacao.disable('x-powered-by')
marcacao.use(agendamento)
marcacao.use(vagas)

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */

// ========================= GATEWAYs MÓDULO CADASTRO =========================


// GET ALL
marcacao.get('/teste/marcacao', async (req, res) => {
  res.json({ message : 'módulo gatewey marcacao rodando'})
})


module.exports = { marcacao }