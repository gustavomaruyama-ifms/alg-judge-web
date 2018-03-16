<template>
    <div>
        <submissao @voltar="listar" v-if="problema" :problema="problema">Submissão</submissao>
        <problema-list v-else @submeterProblema="submeter"></problema-list>
    </div>
</template>

<script>
    import ProblemaList from '../problema-list/ProblemaList'
    import Submissao from './submissao/Submissao'
    import PainelSubmissao from './submissao/painelSubmissao'

    export default {
      name: 'aluno',
      components: {
        ProblemaList,
        Submissao,
        PainelSubmissao
      },
      data () {
        return {
          problema: null
        }
      },
      methods: {
        submeter (problema) {
          this.problema = problema
        },
        listar () {
          this.problema = null
        }
      }
    }
</script>

<style scoped>

</style>
