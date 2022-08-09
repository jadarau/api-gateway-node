const Pessoa = require('./inputs/pessoa')
const Agendamento = require('./inputs/agendamento')
const Profissional = require('./inputs/profissional')
const Procedimento = require('./inputs/procedimento')
const Agenda = require('./inputs/agenda')
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
// app.get('/agendamento', async (req, res) => {
//   const { data } = await axios.get('http://localhost:8095/regulacao/agendamento')
//   res.json(data)
// })

// ========================= GATEWAYs PARA O OBJETO AGENDAMENTO =========================

// SAVE
app.post('/agendamento', async (req, res) => {
  const token = req.header('token')
  const agendamento = new Agendamento(req.body)
  const { data } = await axios.post('http://localhost:8095/regulacao/agendamento', agendamento, 
    { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)
})

// GET ALL
app.get('/agendamentos', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.get('http://localhost:8095/regulacao/agendamentos', { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// GET ID
app.get('/agendamento/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.get('http://localhost:8095/regulacao/agendamento/'+id, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// ========================= GATEWAYs PARA O OBJETO PESSOA =========================

// SAVE
app.post('/pessoa', async (req, res) => {
  const token = req.header('token')  
  const pessoa = new Pessoa(req.body)
  const { data } = await axios.post('http://localhost:8080/regulacao/pessoa', pessoa, 
    {
      headers: { 'Authorization': `Bearer ${token}` }
    })
  res.json(data)
  // res.json(pessoa)
})

// UPDATE
app.put('/pessoa/edit', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.put('http://localhost:8080/regulacao/pessoa', { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// GET ALL
app.get('/pessoas', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.get('http://localhost:8080/regulacao/pessoas', { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
  // res.json({ message : token})
})

// GET ID
app.get('/pessoa/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.get('http://localhost:8080/regulacao/pessoa'+id, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)  
})

// DELETE ID
app.delete('/pessoa/delete/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.delete('http://localhost:8080/regulacao/pessoa'+id, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)  
})

// ========================= GATEWAYs PARA O OBJETO PROFISSIONAL =========================

// SAVE
app.post('/profissional', async (req, res) => {
  const token = req.header('token')
  const profissional = new Profissional(req.body)
  const { data } = await axios.post('http://localhost:8080/regulacao/profissional', profissional, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// UPDATE
app.put('/profissional/edit', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.put('http://localhost:8080/regulacao/profissional', { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// GET ALL
app.get('/profissionais', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.get('http://localhost:8080/regulacao/profissionais', { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
  // res.json({ message : token})
})

// GET ID
app.get('/profissional/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.get('http://localhost:8080/regulacao/profissional'+id, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)  
})

// DELETE ID
app.delete('/profissional/delete/:id', async (req, res) => {
  const token = req.header('token')
  let id = req.params.id
  const { data } = await axios.delete('http://localhost:8080/regulacao/profissional'+id, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)  
})

// ========================= GATEWAYs PARA O OBJETO PROCEDIMENTO =========================

// SAVE
app.post('/procedimento', async (req, res) => {
  const token = req.header('token')
  const procedimento = new Procedimento(req.body)
  const { data } = await axios.post('http://localhost:8080/regulacao/procedimento', procedimento, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// UPDATE
app.put('/procedimento/edit', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.put('http://localhost:8080/regulacao/procedimento/alterar', { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// GET ALL
app.get('/procedimentos', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.get('http://localhost:8080/regulacao/procedimentos', { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
  // res.json({ message : token})
})

// ========================= GATEWAYs PARA O OBJETO AGENDA =========================

// SAVE
app.post('/agenda', async (req, res) => {
  const token = req.header('token')
  const agenda = new Agenda(req.body)
  const { data } = await axios.post('http://localhost:8080/regulacao/agenda', agenda, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// UPDATE
app.put('/agenda/:id', async (req, res) => {
  const token = req.header('token')
  const id = req.params.id
  const { data } = await axios.put('http://localhost:8080/regulacao/agenda/'+id, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// GET ID
app.get('/agenda/:id', async (req, res) => {
  const token = req.header('token')
  const id = req.params.id
  const { data } = await axios.get('http://localhost:8080/regulacao/agenda/'+id, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// GET POR PROCEDIMENTO ID
app.get('/agenda/procedimento/:id', async (req, res) => {
  const token = req.header('token')
  const id = req.params.id
  const { data } = await axios.get('http://localhost:8080/regulacao/agenda/procedimento/'+id, { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
})

// GET ALL
app.get('/agendas', async (req, res) => {
  const token = req.header('token')
  const { data } = await axios.get('http://localhost:8080/regulacao/agendas', { headers: { 'Authorization': `Bearer ${token}` }})
  res.json(data)
  // res.json({ message : token})
})



module.exports = { app }
