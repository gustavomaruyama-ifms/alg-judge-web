<template>
  <div>
    <div class="row">
      <div class="col-md-7 col-lg-7 my_margin">
        <strong>Título do Problema</strong>
        <b-card class="text-center">
          <h4 class="no_margin">{{problema.titulo}}</h4>
        </b-card>
      </div>
      <div class="col-md-5 col-lg-5">
        <b-nav class="pull-right">
          <b-nav-item @click="voltarParaListagem()">Voltar Para Listagem</b-nav-item>
          <b-nav-item @click="vizualizarProblema()">Vizualizar Problema</b-nav-item>
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
</template>

<script>
    import Submissao from '../../../../model/Submissao'
    import SubmissaoDao from '../../../../dao/SubmissaoDao'
    import ProblemaDao from '../../../../dao/ProblemaDao'
    import swal from 'sweetalert'
    import http from 'axios'
    export default {
      name: 'painel-submissao',
      props: {
        problema: {required: true}
      },
      data () {
        return {
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
        submeter (submissao) {
          this.submissao.problema = new ProblemaDao.SUBMIT_FORM(this.problema)
          this.submissao = SubmissaoDao.submitForm(submissao)
          http.post('http://localhost:8084/alg-judge/rest/submissao', this.submissao).then((response) => {
            this.$emit('submetido')
            let icon
            if (response.data.msg === 'Aceito') {
              icon = 'success'
            } else {
              response.data.msg = response.data.msg.replace('_', ' ')
              icon = 'warning'
            }
            swal('Código Enviado', response.data.msg, icon)
          })
        },
        vizualizarProblema () {
          this.$emit('vizualizarProblema')
        },
        voltarParaListagem () {
          this.$emit('voltarParaListagem')
        }
      }
    }
</script>

<style scoped>
   .my_margin {
     margin-bottom: 15px;
   }
   .no_margin {
     margin-bottom: 0px;
   }
</style>
