<template>
  <div class="table-responsive">
    <table class="table table-striped first-td-padding text-center">
      <thead>
        <tr>
          <td>Entradas</td>
          <td>Saída</td>
          <td>exemplo</td>
          <td>Editar</td>
          <td>Deletar</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="caso in casos">
          <td>{{caso.entrada}}</td>
          <td>{{caso.saida}}</td>
          <td>{{caso.exemplo}}</td>
          <td>
            <button @click="editCaso(caso)" class="btn btn-info btn-micro">
              <div class="btn-with-icon-content">
                <span aria-hidden="true" class="fa fa-edit" style="font-size: 12px;"></span>
              </div>
            </button>
          </td>
          <td>
            <button @click="deleteCaso(caso)" class="btn btn-danger btn-micro">
              <div class="btn-with-icon-content">
                <span aria-hidden="true" class="fa fa-trash" style="font-size: 12px;"></span>
              </div>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import swal from 'sweetalert'
  import http from 'axios'

  export default {
    name: 'caso-de-teste-list',
    props: {
      casos: {required: true}
    },
    methods: {
      deleteCaso (caso) {
        swal({
          title: 'Você tem certeza disto?',
          text: 'Este caso de Entrada Será Deletado, clique em ok para executar esta ação!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              this.deletarCasoBanco(caso)
              swal('O Caso de Teste foi deletado com sucesso!', {
                icon: 'success'
              })
            } else {
              swal('O Caso de teste esta seguro em nossos arquivos!')
            }
          })
      },
      editCaso (caso) {
        this.$emit('editCaso', caso)
      },
      deletarCasoBanco (caso) {
        http.put('http://localhost:8084/alg-judge/rest/casodeteste/deletecasos', caso)
          .then(response => {
            this.delCasos(caso)
          })
      },
      delCasos (caso) {
        this.casos.splice(this.findIndex(caso), 1)
      },
      findIndex (index) {
        return this.casos.findIndex((_caso) => {
          return _caso.id === index.id
        })
      }
    }
  }
</script>

<style scoped>

</style>
