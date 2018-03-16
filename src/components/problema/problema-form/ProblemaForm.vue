<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <form-wizard></form-wizard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Problema from '../../../model/Problema'
  import FormWizard from './form-elements/form-elements-problema'

  export default {
    name: 'problema-form',

    components: {
      FormWizard
    },

    data () {
      return {
        problema: new Problema()
      }
    },

    created () {},

    methods: {}
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
