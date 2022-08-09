const Pessoa = require('../../../inputs/pessoa')
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const pessoa = express()

pessoa.use(express.json())
pessoa.use(cors())
pessoa.use(logger('dev'))
pessoa.enable('trust proxy') 
pessoa.disable('x-powered-by')

/**
 * @description original request url http://localhost:3001/api/v2/users
 * @description proxy request url http://localhost:3000/v2/users
 */

// ========================= GATEWAYs MÓDULO CADASTRO =========================


// GET ALL
pessoa.get('/teste/cadastro/pessoa', async (req, res) => {
  res.json({ message : 'módulo gatewey cadastro pessoa rodando'})
})

// ========================= GATEWAYs PARA O OBJETO PESSOA =========================

// SAVE
pessoa.post('/pessoa', async (req, res) => {
  const token = req.header('token')  
  const pes = new Pessoa(req.body)
  const { data } = await axios.post('http://localhost:8080/regulacao/pessoa', pes, 
    {
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)
  // res.json(pessoa)
})

// UPDATE
pessoa.put('/pessoa/edit', async (req, res) => {
  const token = req.header('token') 
  const pes = new Pessoa(req.body)
  const { data } = await axios.put('http://localhost:8080/regulacao/pessoa', pes, 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)
})

// GET ALL
pessoa.get('/pessoas', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.get('http://localhost:8080/regulacao/pessoas', 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)
  // res.json({ message : token})
})

// GET ID
pessoa.get('/pessoa/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.get('http://localhost:8080/regulacao/pessoa'+id, 
  { 
    headers: { 'Authorization': `Bearer ${token}` }
  })
  res.json(data)  
})

// DELETE ID
pessoa.delete('/pessoa/delete/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.delete('http://localhost:8080/regulacao/pessoa'+id, 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)  
})


module.exports = { pessoa }