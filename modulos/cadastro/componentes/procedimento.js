const Procedimento = require('../../../inputs/procedimento')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const procedimento = express()

procedimento.use(express.json())
procedimento.use(cors())
procedimento.use(logger('dev'))
procedimento.enable('trust proxy') 
procedimento.disable('x-powered-by')

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */

// ========================= GATEWAYs MÓDULO CADASTRO =========================


// GET ALL
procedimento.get('/teste/cadastro/procedimento', async (req, res) => {
  res.json({ message : 'módulo gatewey cadastro procedimento rodando'})
})

// ========================= GATEWAYs PARA O OBJETO PROCEDIMENTO =========================
  
// SAVE
procedimento.post('/procedimento', async (req, res) => {
    const token = req.header('token')
    const proc = new Procedimento(req.body)
    const { data } = await axios.post('http://localhost:8080/regulacao/procedimento', proc, { headers: { 'Authorization': `Bearer ${token}` }})
    res.json(data)
})

// UPDATE
procedimento.put('/procedimento/edit', async (req, res) => {
    const token = req.header('token')    
    const proc = new Procedimento(req.body)
    const { data } = await axios.put('http://localhost:8080/regulacao/procedimento/alterar', proc, 
        { 
            headers: { 'Authorization': `Bearer ${token}` }
        })
    res.json(data)
})

// GET ALL
procedimento.get('/procedimentos', async (req, res) => {
    const token = req.header('token')
    const { data } = await axios.get('http://localhost:8080/regulacao/procedimentos', 
        {   
            headers: { 'Authorization': `Bearer ${token}` }
        })
    res.json(data)
    // res.json({ message : token})
})


module.exports = { procedimento }