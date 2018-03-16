<template>
  <div>
    <fieldset>
      <!--nome-->
      <div class="form-group with-icon-left">
        <div class="input-group">
          <input
            id="nome"
            v-model="user.nome"
            v-validate="'required'"
            :class="{'input': true, 'is-danger': errors.has('nome') }"
            name="nome"
            required="required">
          <i class="entypo entypo-user icon-left input-icon"></i>
          <label for="nome" class="control-label">
            DIGITE AQUI SEU NOME
          </label>
          <i class="bar"></i>
          <small v-show="errors.has('nome')" class="help text-danger">{{ errors.first('nome') }}</small>
        </div>
      </div>
      <!--email-->
      <div class="form-group with-icon-left">
        <div class="input-group">
          <input
            v-model="user.email"
            v-validate="'required|email'"
            :class="{'input': true, 'is-danger': errors.has('email') }"
            id="email"
            name="email"
            required="required">
          <i class="fa fa-envelope-o icon-left input-icon"></i>
          <label
            for="email"
            role="button"
            class="control-label">
            DIGITE AQUI SEU EMAIL
          </label>
          <i class="bar"></i>
          <small v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</small>
        </div>
      </div>
      <!--senha-->
      <div class="form-group">
       <div class="input-group">
        <input
          v-model="user.senha"
          v-validate="'required'"
          :class="{'input': true, 'is-danger': errors.has('senha') }"
          id="senha"
          type="password"
          name="senha"
          class="text-center text_password"
          required="required" title="">
        <label for="senha" class="control-label">
          DIGITE AQUI SUA SENHA
        </label>
        <i class="bar"></i>
         <small v-show="errors.has('senha')" class="help text-danger">{{ errors.first('senha') }}</small>
        <small class="help text_color">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </small>
      </div>
      </div>
    </fieldset>
    <button
      @click="atualizar()"
      type="button"
      class="btn btn-success pull-right">
      ATUALIZAR
    </button>
  </div>
</template>

<script>
  import Usuario from '../../../model/User'
  import http from 'axios'
  import swal from 'sweetalert'
  export default {
    name: 'user-form',
    data () {
      return {
        user: new Usuario()
      }
    },
    created () {
      let senha = this.user.senha
      this.user = Usuario.BUILD_FORM(this.$store.state.userState.user)
      this.user.senha = senha
    },
    methods: {
      atualizar () {
        this.user = Usuario.BUILD_FORM(this.user)
        http.put('http://localhost:8084/alg-judge/rest/usuario', this.user).then((response) => {
          this.userAtualizado(response.data)
          swal({
            title: 'OK!',
            text: 'Usuário atualizado com sucesso',
            icon: 'success'
          })
        }).catch((error) => {
          console.log('Error', error)
        })
      },
      userAtualizado (dados) {
        sessionStorage.setItem('token', dados.token)
        let jsonAux = JSON.stringify(dados)
        sessionStorage.setItem('user', jsonAux)
        const payload = Usuario.LOGIN(dados)
        this.$store.commit('USER_LOGADO', payload)
        this.user = dados
      }
    }
  }
</script>

<style scoped>
  .text_password {
    letter-spacing: 15px;
  }
  .text_color {
    color: white;
  }
</style>
