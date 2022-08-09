const Agenda = require('../../../inputs/agenda')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const agenda = express()

agenda.use(express.json())
agenda.use(cors())
agenda.use(logger('dev'))
agenda.enable('trust proxy') 
agenda.disable('x-powered-by')

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */

// ========================= GATEWAYs MÓDULO CADASTRO =========================


// GET ALL
agenda.get('/teste/cadastro/agenda', async (req, res) => {
  res.json({ message : 'módulo gatewey cadastro agenda rodando'})
})

// ========================= GATEWAYs PARA O OBJETO AGENDA =========================
  
// SAVE
agenda.post('/agenda', async (req, res) => {
    const token = req.header('token')
    const ag = new Agenda(req.body)
    const { data } = await axios.post('http://localhost:8080/regulacao/agenda', ag, { headers: { 'Authorization': `Bearer ${token}` }})
    res.json(data)
})

// UPDATE
agenda.put('/agenda/:id', async (req, res) => {
    const token = req.header('token')
    const id = req.params.id
    const { data } = await axios.put('http://localhost:8080/regulacao/agenda/'+id, { headers: { 'Authorization': `Bearer ${token}` }})
    res.json(data)
})

// GET ID
agenda.get('/agenda/:id', async (req, res) => {
    const token = req.header('token')
    const id = req.params.id
    const { data } = await axios.get('http://localhost:8080/regulacao/agenda/'+id, { headers: { 'Authorization': `Bearer ${token}` }})
    res.json(data)
})

// GET POR PROCEDIMENTO ID
agenda.get('/agenda/procedimento/:id', async (req, res) => {
    const token = req.header('token')
    const id = req.params.id
    const { data } = await axios.get('http://localhost:8080/regulacao/agenda/procedimento/'+id, { headers: { 'Authorization': `Bearer ${token}` }})
    res.json(data)
})

// GET ALL
agenda.get('/agendas', async (req, res) => {
    const token = req.header('token')
    const { data } = await axios.get('http://localhost:8080/regulacao/agendas', { headers: { 'Authorization': `Bearer ${token}` }})
    res.json(data)
    // res.json({ message : token})
})


module.exports = { agenda }