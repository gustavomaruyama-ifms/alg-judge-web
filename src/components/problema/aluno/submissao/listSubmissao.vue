<template>
  <div>
       <!-- painel de submições -->
      <dashboard-info-widgets
        v-show="mostrar"
        :sintax="sintax"
        :erro="erro"
        :aceito="aceito"
        :envios="list.length"
      >
        {{situacaoSubmissao}}
      </dashboard-info-widgets>
       <!-- tabela de submições -->
       <div class="row">
       <div class="col-lg-12 col-md-12">
         <paginate
           ref="paginator"
           name="submissoes"
           :list="list"
           :per="pageTotal"
         >
          <table class="table table-striped text-center">
           <thead>
            <tr>
              <td>Nome do Problema</td>
              <td>Resposta</td>
              <td>Data de Envio</td>
            </tr>
           </thead>
           <tbody>
            <tr v-for="item in paginated('submissoes')">
              <td>{{item.problema.titulo}}</td>
              <td><strong :class="situacao(item)">{{item.situacao}}</strong></td>
              <td>{{dataDeEnvio(item.dataEnvio)}}</td>
            </tr>
           </tbody>
         </table>
         </paginate>
       </div>
     </div>
       <div class="row">
           <div class="col-lg-6 col-md-6 pull-left">
             <button v-show="mostrar" @click="voltar" class="btn btn-info">
               VOLTAR
             </button>
           </div>
           <div class="col-md-6 col-lg-6">
             <div role="group" aria-label="First group" class="btn-group pull-right">
               <button @click="anterior()" :disabled="pageA" type="button" class="btn btn-primary">Anterior</button>
               <button @click="proximo()" :disabled="pageP" type="button" class="btn btn-primary">Próximo</button>
             </div>
           </div>
       </div>
  </div>
</template>

<script>
    import moment from 'moment'
    import DashboardInfoWidgets from './DashboardInfoWidgets'
    export default {
      name: 'list-submissao',
      props: {
        list: {required: true, type: Array},
        mostrar: {required: false, default: true}
      },
      components: {
        DashboardInfoWidgets
      },
      data () {
        return {
          paginate: ['submissoes'],
          page: 1,
          pageTotal: 7,
          pageP: false,
          pageA: true,
          total: 0,
          aceito: 0,
          sintax: 0,
          erro: 0
        }
      },
      computed: {
        situacaoSubmissao () {
          for (let item of this.list) {
            switch (item.situacao) {
              case 'Aceito':
                this.aceito++
                break
              case 'Erro de Sintax':
                this.sintax++
                break
              default:
                this.erro++
                break
            }
          }
        }
      },
      mounted () {
        this.quantidadeDePag()
      },
      methods: {
        situacao (item) {
          if (item.situacao === 'Aceito') {
            return 'text_aceito'
          } else {
            return 'text-danger'
          }
        },
        dataDeEnvio (value) {
          let dateString = moment.unix(value / 1000)
            .locale('pt-br')
            .format('DD/MM/YYYY  HH:mm')
          return dateString
        },
        voltar () {
          window.location.reload()
        },
        proximo () {
          this.quantidadeDePag()
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
            this.quantidadeDePag()
          } else {
            this.pageA = true
          }
        },
        quantidadeDePag () {
          this.total = (this.list.length) / this.pageTotal
          console.log('Total', this.total)
        }
      }
    }
</script>

<style lang="scss" scoped>
  .box {
    padding: 20px;
    text-align: center;
    width: 100px;
    border-radius: 15px 15px 15px 15px;
    padding-top: 10px;
    padding-bottom: 15px;
  }
  .aceito {
    background-color: #39803f;
    color: white
  }
  .bg-danger {
    color: white
  }
  .box h2 {
      margin-bottom: 0px;
  }
  .text_aceito {
    color: #128000;
  }
</style>
