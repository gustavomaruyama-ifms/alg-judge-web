<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="container">
          <div class="table-responsive">
            <table class="table table-striped text-center">
              <thead>
              <tr>
                <td>Título</td>
                <div class="pull-right" v-show="papel != 'Aluno'">
                  <td align="left"></td>
                  <td></td>
                  <td align="right">Adicionar um Caso de Teste</td>
                </div>
                <td align="right"></td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="problema in problemas">
                <td>{{problema.titulo}}</td>
                <div class="pull-right" v-show="papel != 'Aluno'">
                    <td>
                        <button @click="editProblema(problema)" class="btn btn-info btn-micro">
                          <div class="btn-with-icon-content">
                            <span aria-hidden="true" class="fa fa-edit" style="font-size: 12px;"></span>
                          </div>
                        </button>
                    </td>
                    <td>
                      <button @click="deleteProblema(problema)" class="btn btn-danger btn-micro">
                        <div class="btn-with-icon-content">
                          <span aria-hidden="true" class="fa fa-trash" style="font-size: 12px;"></span>
                        </div>
                      </button>
                    </td>
                    <td align="right" style="text-align:right">
                      <button @click="addCasoDeTeste(problema)" class="btn btn-primary btn-micro">
                        <div class="btn-with-icon-content">
                          <span aria-hidden="true" class="fa fa-plus" style="font-size: 12px;"></span>
                          adicionar
                        </div>
                      </button>
                    </td>
                </div>
                <td align="right" style="text-align:right">
                  <button @click="submeterProblema(problema.id)" class="btn btn-success btn-micro">
                    <div class="btn-with-icon-content">
                      <i class="fa fa-eye"></i>
                      <span class="">Visualizar</span>
                    </div>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <div role="group" aria-label="First group" class="btn-group pull-right">
              <button @click="anterior()" :disabled="pageA" type="button" class="btn btn-info">Anterior</button>
              <button @click="proximo()" :disabled="pageP" type="button" class="btn btn-info">Próximo</button>
            </div>
          </div>

           <problema-modal
              :show.sync="show"
              :problema="problema"
              v-bind:large="true"
              ref="largeModal"
              okText="CONFIRMAR" cancelText="CANCELAR"
            >
              <div slot="title">Edit Problema</div>
              <div>

              </div>
            </problema-modal>

           <caso-modal
              :show.sync="show"
              :problema-id="problemaId"
              :problema="problema"
              v-bind:large="true"
              ref="casoModal"
              okText="CONFIRMAR" cancelText="CANCELAR"
            >
            <div slot="title">Adicione um novo Caso de Teste</div>
            <div>

            </div>
          </caso-modal>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import http from 'axios'
  import Problema from '../../../model/Problema'
  import swal from 'sweetalert'
  import ProblemaModal from '../ProblemaModal'
  import CasoModal from './CasoModal'
  import ProblemaCadastro from '../problema-form/form-elements/problema-cadastro'

  export default {
    name: 'problema-list',
    components: {
      ProblemaModal,
      CasoModal,
      ProblemaCadastro
    },
    computed: {
      papel () {
        return this.$store.state.userState.user.papel
      }
    },
    data () {
      return {
        problemas: [],
        paginate: ['problemas'],
        page: 1,
        pageP: false,
        pageA: true,
        problema: '',
        problemaId: '',
        show: false
      }
    },
    mounted () {
      this.getAll(this.page)
    },
    methods: {
      getAll (page) {
        http.get('http://localhost:8084/alg-judge/rest/problema/list/' + page
        ).then(response => {
          console.log('Response Problem List', response.data.data)
          this.problemas = response.data.data
          console.log('page', this.page, this.problemas.length)
          if (this.problemas.length < 10) {
            this.pageP = true
            this.pageA = false
          } else {
            this.pageP = false
          }
        })
      },

      deleteProblema (problema) {
        swal({
          title: 'Você tem certeza disto?',
          text: 'O Problema ' + problema.titulo.toUpperCase() + ' será deletado, clique em ok para executar esta ação!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              this.delete(problema.id)
              swal('O Problema ' + problema.titulo + ', foi deletado!', {
                icon: 'success'
              })
            } else {
              swal('O Problema ' + problema.titulo + ', esta seguro em nossos arquivos!')
            }
          })
      },

      editProblema (problema) {
        this.problema = Problema.BUILD_FORM(problema)
        console.log('Problema Edit', this.problema)
        this.$refs.largeModal.open()
      },
      submeterProblema (id) {
        http.get('http://localhost:8084/alg-judge/rest/problema/' + id).then(response => {
          this.$emit('submeterProblema', response.data.data)
        })
      },
      addCasoDeTeste (id) {
        this.problemaId = id
        this.problema = id
        this.$refs.casoModal.open()
      },

      delete (id) {
        http.put('http://localhost:8084/alg-judge/rest/problema/delete/' + id).then(response => {
          this.getAll(this.page)
        })
      },
      proximo () {
        this.page ++
        console.log('Proximo', this.page)
        this.getAll(this.page)
      },
      anterior () {
        this.page--
        console.log('Anterior', this.page)
        if (this.page !== 0) {
          this.getAll(this.page)
        } else {
          this.page++
          this.pageA = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";

  .chart-container {
    padding: 0 2rem;
    height: 24rem;
  }
  .centralizar {
    text-align: right;
  }
</style>
