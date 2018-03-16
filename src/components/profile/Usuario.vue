<template>
  <div class="users-members-tab dashboard-tab">
    <div class="row">
      {{userLogado}}
      <div class="col-md-3 d-flex justify-content-center align-items-start">
        <div class="card" style="width: 50rem;">
          <img src="../../assets/img/avatar1.png" class="card-img-top" width="100%" />
          <div class="card-block" style="padding: 20px">
            <h5 class="card-title"><i class="fa fa-user-circle-o"></i>{{'  ' + user.nome}}</h5>
            <span class="card-text"><i class="fa fa-envelope-o"></i>{{'  ' + user.email}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-9 d-flex my_dashboard">
         <user-form></user-form>
      </div>
    </div>
  </div>
</template>

<script>
  import UserForm from './user-form/UserForm'
  export default {
    name: 'profile',
    components: {
      UserForm
    },
    computed: {
      userLogado () {
        this.user = this.$store.state.userState.user
      }
    },
    data () {
      return {
        user: {}
      }
    }
  }
</script>

<style scoped>
  .my_dashboard{
    padding: 50px;
    margin-top: 2px;
    background-color: white;
  }
</style>
