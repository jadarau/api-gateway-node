function Agendamento(agendamento){    
    this.cliId = agendamento.cliId,
    this.dia = agendamento.dia,
    this.hora = agendamento.hora,
    this.procedimentos = agendamento.procedimentos
}

module.exports = Agendamento 