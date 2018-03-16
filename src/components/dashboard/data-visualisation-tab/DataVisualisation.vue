<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-md-6">
        {{situacaoSubmissao}}
        <div class="chart-container">
          <vuestic-chart :data="chart" type="donut">
          </vuestic-chart>
        </div>
      </div>
      <div class="col-md-6">
        <submissao-list :mostrar="false" :list="dados"></submissao-list>
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'vuex-store'
  import SubmissaoList from '../../problema/aluno/submissao/listSubmissao'

  export default {
    name: 'data-visualisation-tab',
    props: {
      dados: {required: true},
      aceito: {required: true},
      sintax: {required: true},
      erro: {required: true}
    },
    components: {
      SubmissaoList
    },
    data () {
      return {
        chart: {
          labels: ['Erros', 'Erro de Sintax', 'Aceitos'],
          datasets: [{
            label: 'Population (millions)',
            backgroundColor: [store.getters.palette.danger, store.getters.palette.warning, store.getters.palette.primary],
            data: [this.erro, this.sintax, this.aceito]
          }]
        }
      }
    },
    computed: {
      situacaoSubmissao () {
        this.zerarGrafico()
        for (let item of this.dados) {
          switch (item.situacao) {
            case 'Aceito':
              this.chart.datasets[0].data[2]++
              break
            case 'Erro de Sintax':
              this.chart.datasets[0].data[1]++
              break
            default:
              this.chart.datasets[0].data[0]++
              break
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      zerarGrafico () {
        this.chart.datasets[0].data[2] = 0
        this.chart.datasets[0].data[1] = 0
        this.chart.datasets[0].data[0] = 0
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
