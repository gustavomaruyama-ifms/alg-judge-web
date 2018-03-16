<template>
      <div class="d-flex flex-row justify-content-center align-items-center">
        <div class="box align-self-center p-2 bd-highlight">
          <login
            v-show="!cadastro"
            @logado="login"
            @criarConta="cadastrar"
          >
          </login>
          <signup
            v-show="cadastro"
            @cadastro="cadastrado"
          >
          </signup>
        </div>
      </div>
</template>

<script>
  import User from '../../model/User'
  import Login from '../auth/login/Login'
  import Signup from '../auth/signup/Signup'
  import UserDao from '../../dao/UserDao'

  export default {
    name: 'AuthLayout',
    components: {
      Login,
      Signup
    },
    data () {
      return {
        user: new User(),
        cadastro: false
      }
    },
    computed: {
    },
    created () {
      this.user = User.BUILD_FORM(this.user)
    },
    methods: {
      login (user) {
        this.cadastroRealizado = false
        this.user = UserDao.submitForm(user)
        this.$emit('logado', this.user)
      },
      cadastrado (user) {
        this.cadastro = false
        this.$emit('cadastro', user)
      },
      cadastrar () {
        this.cadastro = true
      }
    }
  }
</script>

<style scoped lang="scss">
    .box {
      background-color: rgba(255, 255, 255, 0.9);
      margin-top: 21vh;
      border-radius: 8px 8px 8px 8px;
      width: 40%;
      margin-bottom: auto;
    }

    @media screen and (max-width: 900px){
      .box {
        width: 50%;
      }
    }


    @media screen and (max-width: 700px){
      .box {
        width: 70%;
      }
    }

    @media screen and (max-width: 500px){
      .box {
        width: 90%;
      }
    }
</style>
