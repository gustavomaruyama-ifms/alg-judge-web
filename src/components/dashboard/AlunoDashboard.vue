<template>
  <div class="dashboard">
    {{situacaoSubmissao}}
    <dashboard-info-widgets
      :sintax="sintax"
      :erro="erro"
      :aceito="aceito"
      :envios="submissoes.length"
    >
    </dashboard-info-widgets>
    <div v-if="submissoes.length > 0" class="my_background">
      <data-visualisation-tab
        :dados="submissoes"
        :sintax="sintax"
        :erro="erro"
        :aceito="aceito"
      ></data-visualisation-tab>
    </div>
  </div>
</template>

<script>
    import http from 'axios'
    import DashboardInfoWidgets from './DashboardInfoWidgets'
    import AlunoDashboard from './AlunoDashboard'
    import UsersMembersTab from './users-and-members-tab/UsersMembersTab.vue'
    import SetupProfileTab from './setup-profile-tab/SetupProfileTab.vue'
    import FeaturesTab from './features-tab/FeaturesTab.vue'
    import DataVisualisationTab from './data-visualisation-tab/DataVisualisation.vue'
    import DashboardBottomWidgets from './DashboardBottomWidgets.vue'
    export default {
      name: 'aluno-dashboard',
      components: {
        DataVisualisationTab,
        AlunoDashboard,
        DashboardInfoWidgets,
        UsersMembersTab,
        SetupProfileTab,
        FeaturesTab,
        DashboardBottomWidgets
      },
      computed: {
        situacaoSubmissao () {
          for (let item of this.submissoes) {
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
      data () {
        return {
          submissoes: [],
          aceito: 0,
          sintax: 0,
          erro: 0
        }
      },
      mounted () {
        this.listarSubmissoes()
      },
      methods: {
        listarSubmissoes () {
          http.get('http://localhost:8084/alg-judge/rest/submissao/list').then(response => {
            console.log('Response ', response.data.data)
            this.submissoes = response.data.data
            this.$store.commit('SUBMETIDO', this.submissoes)
            this.listSubmissao = true
          })
        }
      }
    }
</script>

<style scoped>

</style>
