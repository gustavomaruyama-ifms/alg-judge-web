<template>
  <div>
    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs :names="[$t('Gerenciar'), $t('Cadastrar Problema')]" ref="tabs">
        <div :slot="$t('Gerenciar')">
          <submissao @voltar="listar" v-if="problema" :problema="problema">Submissão</submissao>
          <problema-list v-else @submeterProblema="submeter"></problema-list>
        </div>
        <div :slot="$t('Cadastrar Problema')">
          <problema-form></problema-form>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

  </div>
</template>

<script>
  import ProblemaForm from '../problema-form/ProblemaForm'
  import FormElementsProblema from '../problema-form/form-elements/form-elements-problema'
  import ProblemaList from '../problema-list/ProblemaList'
  import Submissao from '../aluno/submissao/Submissao'
  import PainelSubmissao from '../aluno/submissao/painelSubmissao'
  export default {
    name: 'professor',
    components: {
      ProblemaForm,
      ProblemaList,
      FormElementsProblema,
      Submissao,
      PainelSubmissao
    },
    data () {
      return {
        problema: null
      }
    },
    computed: {
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
