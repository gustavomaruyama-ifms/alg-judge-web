class SubmissaoDao {
  static submitForm (form) {
    const data = {
      id: form.id ? form.id : 0,
      usuario: JSON.parse(sessionStorage.getItem('user')),
      codigoFonte: replaceCodigo(form.codigoFonte) ? form.codigoFonte : null,
      dataEnvio: form.dataEnvio ? form.dataEnvio : null,
      ativo: form.ativo ? form.ativo : true,
      tempoExecucao: 33,
      situacao: 'Em Execução',
      problema: form.problema ? form.problema : null
    }
    return data
  }
}

function replaceCodigo (codigo) {
  codigo = codigo.replace(/"/g, '\\"')
  return codigo
}

export default SubmissaoDao
