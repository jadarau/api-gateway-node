const Agendamento = require('../../../inputs/agendamento')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const vagas = express()

vagas.use(express.json())
vagas.use(cors())
vagas.use(logger('dev'))
vagas.enable('trust proxy') 
vagas.disable('x-powered-by')

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */

// ========================= GATEWAYs MÓDULO CADASTRO =========================


// GET ALL
vagas.get('/teste/agendamento/vagas', async (req, res) => {
  res.json({ message : 'módulo gatewey agendamento vagas rodando'})
})


module.exports = { vagas }