<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-12">
        <div :class="papel === 'Aluno'?'my_background':''">
          <aluno v-if="papel === 'Aluno'"></aluno>
          <professor v-else></professor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Aluno from './aluno/Aluno'
  import Professor from './professor/Professor'
  import Admin from './admin/Admin'

  export default {
    name: 'problema',
    components: {
      Aluno,
      Professor,
      Admin
    },
    computed: {
      papel () {
        return this.$store.state.userState.user.papel
      }
    },
    data () {
      return {
        show: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>
