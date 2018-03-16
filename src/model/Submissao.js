class Submissao {
  static BUILD_FORM (submissao) {
    const data = {
      id: submissao.id ? submissao.id : 0,
      usuario: submissao.usuario ? submissao.usuario : null,
      codigoFonte: submissao.codigoFonte ? submissao.codigoFonte : null,
      dataEnvio: submissao.dataEnvio ? submissao.dataEnvio : null,
      ativo: submissao.ativo ? submissao.ativo : true,
      tempoExecucao: submissao.tempoExecucao ? submissao.tempoExecucao : null,
      situacao: submissao.situacao ? submissao.situacao : null,
      problema: submissao.problema ? submissao.problema : null
    }
    return data
  }
}

export default Submissao
