<template>
  <div class="login">
    <h2>ALG JUDGE</h2>
    <fieldset>
      <div class="form-group">
        <div class="input-group">
          <input type="text" v-model="user.email" id="email" required="required"/>
          <label class="control-label" for="email">{{'auth.email' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" v-model="user.senha" id="password" required="required"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row flex-md-column  align-items-center justify-content-between down-container">
        <button class="btn btn-primary" @click="login()" type="submit">
          {{'auth.login' | translate}}
        </button>
        <button @click="criarConta" class="btn btn-dark btn-micro">Criar Conta</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
  import User from '../../../model/User'
  import UserDao from '../../../dao/UserDao'
  export default {
    name: 'login',
    data () {
      return {
        user: new User()
      }
    },
    created () {
      this.user = User.BUILD_FORM(this.user)
    },
    methods: {
      login () {
        this.user = UserDao.submitForm(this.user)
        this.$emit('logado', this.user)
      },
      criarConta () {
        this.$emit('criarConta')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import '../../../../node_modules/bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }
    h2 {
      text-align: center;
    }
    width: 100%;
    padding: 50px;
    .down-container {
      margin-top: 3.125rem;
    }
    .text_success{
      color: #169208;
    }
  }
</style>
