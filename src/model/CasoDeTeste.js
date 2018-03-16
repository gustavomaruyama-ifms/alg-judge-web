class CasoDeTeste {
  static BUILD_FORM (casoDeTeste) {
    const data = {
      id: casoDeTeste.id ? casoDeTeste.id : 0,
      exemplo: casoDeTeste.exemplo ? casoDeTeste.exemplo : false,
      entrada: casoDeTeste.entrada ? casoDeTeste.entrada : null,
      saida: casoDeTeste.saida ? casoDeTeste.saida : null,
      ativo: casoDeTeste.ativo ? casoDeTeste.ativo : true,
      problema: casoDeTeste.problema ? casoDeTeste.problema : null
    }
    return data
  }
}

export default CasoDeTeste
