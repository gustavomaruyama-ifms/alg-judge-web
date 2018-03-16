<template>
  <div>
    <aluno-dashboard></aluno-dashboard>
  </div>
</template>

<script>
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import AlunoDashboard from './AlunoDashboard'
  import UsersMembersTab from './users-and-members-tab/UsersMembersTab.vue'
  import SetupProfileTab from './setup-profile-tab/SetupProfileTab.vue'
  import FeaturesTab from './features-tab/FeaturesTab.vue'
  import DataVisualisationTab from './data-visualisation-tab/DataVisualisation.vue'
  import DashboardBottomWidgets from './DashboardBottomWidgets.vue'

  export default {
    name: 'dashboard',
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
      papel () {
        return this.$store.state.userState.user.papel
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>
