const { pessoa } = require('./componentes/pessoa')
const { profissional } = require('./componentes/profissional')
const { procedimento } = require('./componentes/procedimento')
const { agenda } = require('./componentes/agenda')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const cadastro = express()

cadastro.use(express.json())
cadastro.use(cors())
cadastro.use(logger('dev'))
cadastro.enable('trust proxy') 
cadastro.disable('x-powered-by')
cadastro.use(pessoa)
cadastro.use(profissional)
cadastro.use(procedimento)
cadastro.use(agenda)

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */

// ========================= GATEWAYs MÓDULO CADASTRO =========================

// GET ALL
cadastro.get('/teste/cadastro', async (req, res) => {
  res.json({ message : 'módulo gatewey cadastro rodando'})
})


module.exports = { cadastro }