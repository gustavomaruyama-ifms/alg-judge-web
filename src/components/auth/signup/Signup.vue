<template>
  <div class="signup">
    <h2>Criar Conta</h2>
    <fieldset>
      <div class="form-group">
        <div class="input-group">
          <input v-model="user.nome" type="text" id="nome" required="required"/>
          <label class="control-label" for="nome">DIGITE SEU NOME</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input v-model="user.email" type="text" id="email-sg" required="required"/>
          <label class="control-label" for="email-sg">DIGITE SEU EMAIL</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input v-model="user.senha" type="password" id="password-sg" required="required"/>
          <label class="control-label" for="password-sg">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-end justify-content-end down-container">
        <button @click="singup" class="btn btn-primary" type="submit">
          Cadastrar
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
  import User from '../../../model/User'
  export default {
    name: 'signup',
    data () {
      return {
        user: new User()
      }
    },
    created () {
      this.user = User.BUILD_FORM(this.user)
    },
    methods: {
      singup () {
        this.$emit('cadastro', this.user)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import '../../../../node_modules/bootstrap/scss/variables';

  .signup {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
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
      margin-top: 2.6875rem;
    }
  }
</style>
