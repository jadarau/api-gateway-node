function Pessoa(pessoa){    
    this.id = pessoa.id,
    this.plano = pessoa.plano,
    this.cpf = pessoa.cpf,
    this.rg = pessoa.rg,
    this.cnh = pessoa.cnh,
    this.nome = pessoa.nome,
    this.sobrenome = pessoa.sobrenome,
    this.nasc = pessoa.nasc,
    this.mae = pessoa.mae,
    this.pai = pessoa.pai, 
    this.telefones = pessoa.telefones,
    this.emails = pessoa.emails,
    this.enderecos = pessoa.enderecos,
    this.atendimentos = pessoa.atendimentos,
    this.profissional = pessoa.profissional
}

module.exports = Pessoa 