function Agenda(agenda){
    this.diasemana = agenda.diasemana,
    this.inicio = agenda.inicio,
    this.fim = agenda.fim,
    this.vagas = agenda.vagas,
    this.status = agenda.status,
    this.profissionais = agenda.profissionais,
    this.procedimentos = agenda.procedimentos
}

module.exports = Agenda