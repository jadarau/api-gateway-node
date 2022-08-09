const Agendamento = require('../../../inputs/agendamento')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const agendamento = express()

agendamento.use(express.json())
agendamento.use(cors())
agendamento.use(logger('dev'))
agendamento.enable('trust proxy') 
agendamento.disable('x-powered-by')

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */

// ========================= GATEWAYs MÓDULO CADASTRO =========================


// GET ALL
agendamento.get('/teste/agendamento', async (req, res) => {
  res.json({ message : 'módulo gatewey agendamento rodando'})
})


// ========================= GATEWAYs PARA O OBJETO AGENDAMENTO =========================

// SAVE
agendamento.post('/agendamento', async (req, res) => {
    const token = req.header('token')
    const agend = new Agendamento(req.body)
    const { data } = await axios.post('http://localhost:8095/regulacao/agendamento', agend, 
        { 
        headers: { 'Authorization': `Bearer ${token}` }
        })
    res.json(data)
})

// GET ALL
agendamento.get('/agendamentos', async (req, res) => {
    const token = req.header('token')
    const { data } = await axios.get('http://localhost:8095/regulacao/agendamentos', { headers: { 'Authorization': `Bearer ${token}` }})
    res.json(data)
})

// GET ID
agendamento.get('/agendamento/:id', async (req, res) => {
    const token = req.header('token')
    let id = req.params.id
    const { data } = await axios.get('http://localhost:8095/regulacao/agendamento/'+id, { headers: { 'Authorization': `Bearer ${token}` }})
    res.json(data)
})


module.exports = { agendamento }