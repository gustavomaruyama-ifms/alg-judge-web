class CasoDeTesteDao {
  static submitForm (form) {
    const data = {
      id: form.id ? form.id : 0,
      ativo: true,
      entrada: form.entrada ? form.entrada : null,
      exemplo: form.exemplo ? form.exemplo : false,
      saida: form.saida ? form.saida : null,
      problema: form.problema ? form.problema : null
    }
    return data
  }
}
export default CasoDeTesteDao
