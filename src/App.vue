<template>
  <div id="app" class="app">
    {{isAuth}}
    <layout v-if="token"></layout>
    <auth-layout v-else class="body_login" @logado="login" @cadastro="singUP"></auth-layout>
  </div>
</template>

<script>
  import Layout from 'components/layout/Layout'
  import http from 'axios'
  import User from './model/User'
  import swal from 'sweetalert'
  import AuthLayout from './components/layout/AuthLayout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      AuthLayout,
      Layout
    },
    data () {
      return {
        token: this.$store.state.userState.user.token,
        user: {}
      }
    },
    computed: {
      isAuth () {
        if (!this.$store.state.userLogado) {
          this.$router.match('Login')
        }
      }
    },
    watch: {
      token: () => {
        if (this.token) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      login (user) {
        http.get('http://localhost:8084/alg-judge/rest/usuario/login',
          {headers: {'Authorization': 'Basic ' + btoa(user.email + ':' + user.senha)}}
        ).then(response => {
          this.$router.replace('dashboard')
          sessionStorage.setItem('token', response.data.token)
          let jsonAux = JSON.stringify(response.data)
          sessionStorage.setItem('user', jsonAux)
          this.token = response.data.token
          this.usuarioLogado(response.data)
        })
      },
      usuarioLogado (user) {
        const payload = User.LOGIN(user)
        this.$store.commit('USER_LOGADO', payload)
        this.$store.commit('USER_LOGIN')
        this.setToken()
      },
      singUP (user) {
        http.post('http://localhost:8084/alg-judge/rest/usuario/signup', user,
        {headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Cache-Control': 'no-cache'}}
        ).then(response => {
          console.log('User ', response.data)
          swal({
            title: 'OK!',
            text: response.data.msg,
            icon: 'success'
          })
        }).catch(error => {
          swal({
            title: 'Há um Erro!',
            text: 'possivelmente há um usuário cadastrado com esse mesmo email',
            icon: 'warning'
          })
          console.log('Error ', error)
        })
      },
      setToken () {
        http.defaults.headers.common = {
          'Authorization': 'Bearer ' + this.token
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  .body_login {
    background: linear-gradient(-45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url("./assets/img/background.jpg");
    background-size: cover;
    height: 100%;
  }
  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>
