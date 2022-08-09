const Profissional = require('../../../inputs/profissional')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const profissional = express()

profissional.use(express.json())
profissional.use(cors())
profissional.use(logger('dev'))
profissional.enable('trust proxy') 
profissional.disable('x-powered-by')

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */

// ========================= GATEWAYs MÓDULO CADASTRO =========================


// GET ALL
profissional.get('/teste/cadastro/profissional', async (req, res) => {
  res.json({ message : 'módulo gatewey cadastro profissional rodando'})
})

// ========================= GATEWAYs PARA O OBJETO PROFISSIONAL =========================
  
// SAVE
profissional.post('/profissional', async (req, res) => {
  const token = req.header('token')
  const prof = new Profissional(req.body)
  const { data } = await axios.post('http://localhost:8080/regulacao/profissional', prof, 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)
})

// UPDATE
profissional.put('/profissional/edit', async (req, res) => {
  const token = req.header('token')
  const prof = new Profissional(req.body)
  const { data } = await axios.put('http://localhost:8080/regulacao/profissional', prof, 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)
})

// GET ALL
profissional.get('/profissionais', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.get('http://localhost:8080/regulacao/profissionais', 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)
  // res.json({ message : token})
})

// GET ID
profissional.get('/profissional/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.get('http://localhost:8080/regulacao/profissional'+id, 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)  
})

// DELETE ID
profissional.delete('/profissional/delete/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.delete('http://localhost:8080/regulacao/profissional'+id, 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)  
})


module.exports = { profissional }