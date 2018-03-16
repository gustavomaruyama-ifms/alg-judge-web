<template>
  <div>
    <div
      v-if="listSubmissao"
    >
    <list-submissao :list="submissoes"></list-submissao>
    </div>
    <div v-else>
      <painel-submissao
        @voltarParaListagem="voltar"
        @submetido="listarSubmissoes"
        @vizualizarProblema="showProblema"
        :problema="problema"
        v-if="painel"
      >
      </painel-submissao>
      <view-problema
        @voltarParaListagem="voltar"
        @showPanel="mostrarPainel"
        :problema="problema"
        v-else
      >
      </view-problema>
    </div>
  </div>
</template>

<script>
    import ViewProblema from './viewProblema'
    import PainelSubmissao from './painelSubmissao'
    import ListSubmissao from './listSubmissao'
    import http from 'axios'
    export default {
      name: 'submissao',
      components: {
        ViewProblema,
        PainelSubmissao,
        ListSubmissao
      },
      props: {
        problema: {required: true}
      },
      data () {
        return {
          painel: false,
          submissoes: [],
          listSubmissao: false
        }
      },
      methods: {
        repleceEntrada (entrada) {
          console.log(entrada.replace(/\n/g, '<br>'))
          return entrada.replace(/\n/g, '<br>')
        },
        mostrarPainel () {
          this.painel = true
        },
        showProblema () {
          this.painel = false
        },
        voltar () {
          this.$emit('voltar')
        },
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
