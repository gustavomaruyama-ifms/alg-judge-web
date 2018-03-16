import http from 'axios'
import swal from 'sweetalert'
class ProblemaDao {
  static SUBMIT_FORM (form) {
    const data = {
      id: form.id ? form.id : 0,
      ativo: form.ativo ? form.ativo : null,
      descricao: form.descricao ? form.descricao : null,
      descricaoEntrada: form.descricaoEntrada ? form.descricaoEntrada : null,
      descricaoSaida: form.descricaoSaida ? form.descricaoSaida : null,
      titulo: form.titulo ? form.titulo : null

    }

    return data
  }

  static update (problema) {
    http.put('http://localhost:8084/alg-judge/rest/problema', problema).then(response => {
      this.$emit('ok')
      swal({
        title: 'Problema atualizado!',
        text: 'O problema foi editado com sucesso!!',
        icon: 'success',
        button: 'OK'
      })
    })
  }

  static salvar (problema) {
    http.post('http://localhost:8084/alg-judge/rest/problema', problema).then(response => {
      this.$emit('ok')
      swal({
        title: 'Problema salvo com sucesso!',
        text: 'O problema foi salvo com sucesso!!',
        icon: 'success',
        button: 'OK'
      })
    })
  }
}

export default ProblemaDao
