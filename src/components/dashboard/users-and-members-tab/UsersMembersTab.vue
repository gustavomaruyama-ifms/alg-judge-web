<template>
  <div class="users-members-tab dashboard-tab">
    <div class="row">
      <div class="col-md-3 d-flex justify-content-center align-items-center">
        <vuestic-profile-card
          :name="this.$store.state.userState.user.nome"
          :location="'Coxim, MS'"
          photoSource="https://ascurso.com/wp-content/uploads/2018/01/Blank_Club_Website_Avatar_Gray.jpg"
          :social="{}">
        </vuestic-profile-card>
      </div>
      <div class="col-md-9 d-flex">
        <vuestic-chat v-model="chatMessages"></vuestic-chat>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'users-members-tab',

    data () {
      return {
        chatMessages: [
          {
            text: 'Hello! So glad you liked my work. Do you want me to shoot you?',
            yours: false
          },
          {
            text: 'Yeah, that would be cool. Maybe this Sunday at 3 pm?',
            yours: true
          },
          {
            text: 'Sounds great! See you later!',
            yours: false
          },
          {
            text: 'Should I bring a lightbox with me?',
            yours: true
          },
          {
            text: 'No, thanks. There is no need. Can we set up a meeting earlier?',
            yours: false
          },
          {
            text: 'I\'m working on Vuestic, so let\'s meet at 3pm. Thanks!',
            yours: true
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";


  .vuestic-profile-card {
    margin-left: 1rem;

    @include media-breakpoint-up(md) {
      margin-top: -$tab-content-pt;
    }

    @include media-breakpoint-down(md) {
      margin-bottom: $tab-content-pt;
      margin-left: 0;
    }
  }


</style>
