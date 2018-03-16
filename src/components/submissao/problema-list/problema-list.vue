<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="container">
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="problemas"
              :list="problemas"
              :per="pageTotal"
            >
              <table class="table text-center table-striped first-td-padding">
                <thead>
                <tr>
                  <td>Título</td>
                  <td class="text-center">Enviar</td>
                  <td></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="problema in paginated('problemas')">
                  <td>{{problema.titulo}}</td>
                  <td>
                    <button @click="problemaParaSubmissao(problema)" class="btn btn-primary btn-micro">
                      <div class="btn-with-icon-content">
                        <span aria-hidden="true" class="fa fa-upload" style="font-size: 12px;"></span>
                        ENVIAR
                      </div>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </paginate>
            <div role="group" aria-label="First group" class="btn-group pull-right">
              <button @click="anterior()" :disabled="pageA" type="button" class="btn btn-info">Anterior</button>
              <button @click="proximo()" :disabled="pageP" type="button" class="btn btn-info">Próximo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import http from 'axios'
  import Problema from '../../../model/Problema'

  export default {
    name: 'problema-list',
    components: {
    },
    data () {
      return {
        problemas: [],
        paginate: ['problemas'],
        page: 1,
        pageTotal: 5,
        pageP: false,
        pageA: true,
        total: 0,
        problema: new Problema()
      }
    },
    created () {
      this.getAll()
    },
    methods: {
      getAll () {
        http.get('http://localhost:8084/alg-judge/rest/problema/list/10'
        ).then(response => {
          this.problemas = response.data
          this.quantidadeDePag()
        })
      },
      proximo () {
        if (this.page <= this.total) {
          this.page++
          this.pageA = false
          this.$refs.paginator.goToPage(this.page)
        } else {
          this.pageP = true
        }
      },
      anterior () {
        if (this.page > 1) {
          this.page--
          this.pageP = false
          this.$refs.paginator.goToPage(this.page)
        } else {
          this.pageA = true
        }
      },
      quantidadeDePag () {
        this.total = (this.problemas.length) / this.pageTotal
      },
      problemaParaSubmissao (problema) {
        this.problema = Problema.BUILD_FORM(problema)
        this.$emit('problemaParaSubmissao', this.problema)
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
</style>
