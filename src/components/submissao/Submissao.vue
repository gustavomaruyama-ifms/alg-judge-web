<template>
  <div>
    <div class="users-members-tab dashboard-tab">
      <div class="row">
        <div class="col-md-3 d-flex justify-content-center align-items-center">
          <vuestic-profile-card :name="'Veronique Lee'" :location="'Coxim, MS'"
                                photoSource="http://i.imgur.com/NLrdqsk.png"
                                :social="{}">
          </vuestic-profile-card>
        </div>
        <div class="col-md-9 my_background">
          <div class="row">
            <div class="col-md-4 col-lg-4">
              <strong>Problema</strong>
              <b-card class="text-center my_margin">
                <span>NOME DO PROBLEMA</span>
              </b-card>
            </div>
            <div class="col-md-8 col-lg-8">
              <b-nav class="pull-right">
                <b-nav-item active>Active</b-nav-item>
                <b-nav-item>Link</b-nav-item>
                <b-nav-item>Another Link</b-nav-item>
                <b-nav-item disabled>Disabled</b-nav-item>
              </b-nav>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-lg-12">
              <textarea v-model="submissao.codigoFonte" class="submissao_area" wrap="off" cols="30" rows="5"></textarea>
              <button @click="submeter(submissao)" class="btn btn-success pull-right">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import Submissao from '../../model/Submissao'
  import SubmissaoDao from '../../dao/SubmissaoDao'
  import swal from 'sweetalert'
  import User from '../../model/User'
  import http from 'axios'
  import ProblemaList from './problema-list/problema-list'
  export default {
    name: 'submissao',
    components: {
      ProblemaList,
      DashboardInfoWidgets
    },
    data () {
      return {
        view: true,
        problemaView: false,
        submissao: new Submissao()
      }
    },
    created () {
      this.submissao = new Submissao.BUILD_FORM(this.submissao)
    },
    computed: {
      dateConverter: (value) => {
        let dateString = window.moment.unix(value / 1000).format('MM/DD/YYYY')
        return dateString
      }
    },
    methods: {
      mouseOver () {
        this.view = false
      },
      titulo () {
        if (this.submissao.problema === null) {
          return 'Listagem de Problemas'
        } else {
          return 'Voltar á Lista, Título: ' + this.submissao.problema.titulo
        }
      },
      mouseOut () {
        this.view = true
      },
      problemaViewDiv () {
        this.problemaView = true
      },
      problemaViewYes () {
        this.problemaView = false
      },
      submissaoProblema (problema) {
        this.submissao.problema = problema
      },
      submeter (submissao) {
        submissao.usuario = User.BUILD_USER()
        this.submissao = SubmissaoDao.submitForm(submissao)
        http.post('http://localhost:8084/alg-judge/rest/submissao', this.submissao).then((response) => {
          console.log('Submetido', response)
          let icon
          if (response.data.msg === 'ACEITO') {
            icon = 'success'
          } else {
            response.data.msg = response.data.msg.replace('_', ' ')
            icon = 'warning'
          }
          swal('Código Enviado', response.data.msg, icon)
        })
      },
      voltarALista () {
        this.submissao.problema = null
      }
    }
  }
</script>

<style scoped>
  hr {
    color: #4ae387;
    border: solid;
    height: 1px;
    border-radius: 50px 50px 50px 50px;
    margin: 5px 0px 20px 0px;
  }
  .my_margin {
    margin-bottom: 15px;
  }

  i:hover {
    color: #4ae387;
  }

  .desabilitado {
    color: #77797a;
  }
</style>
