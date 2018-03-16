<template>
  <div>
    {{limpar}}
    <div class="row">
      <div class="col-lg-6 col-md-6">
        <label for="entrada">Entradas</label>
        <div class="form-group">
          <textarea v-model="casoDeTeste.entrada" class="form-control my_text_area" id="entrada" rows="3"></textarea>
        </div>
      </div>
      <div class="col-lg-6 col-md-6">
        <label for="saida">Saídas</label>
        <div class="form-group">
          <textarea v-model="casoDeTeste.saida" class="form-control my_text_area" id="saida" rows="3"></textarea>
        </div>
      </div>
    </div>
    <div class="row" style="margin-bottom: 15px">
      <div class="col-lg-12 col-md-12">
        <div class="text-center">
          <vuestic-switch v-model="casoDeTeste.exemplo">
            <span slot="trueTitle">COM EXEMPLO</span>
            <span slot="falseTitle">SEM EXEMPLO</span>
          </vuestic-switch>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <button @click="adicionarCaso" style="margin-bottom: 15px" class="btn btn-primary btn-micro pull-right">
          Enviar
        </button>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <caso-de-teste-listados @deletar="delCasos" @editCaso="editar" :casos="casosArray"></caso-de-teste-listados>
      </div>
    </div>
  </div>
</template>

<script>
  import CasoDeTesteListados from './CasosDeTesteListados'
  import CasoDeTeste from '../../model/CasoDeTeste'
  import http from 'axios'
  import CasoDeTesteDao from '../../dao/CasoDeTesteDao'
  import Problema from '../../model/Problema'
  /* eslint-disable comma-spacing */

  export default {
    name: 'caso-de-teste-form',
    props: {
      problema: {
        required: true
      },
      casosArray: {
        required: true
      },
      show: {
        required: true
      }
    },
    components: {
      CasoDeTesteListados
    },
    data () {
      return {
        saidaVetor: [],
        casoDeTeste: new CasoDeTeste(),
        entradaVetor: []
      }
    },
    computed: {
      limpar () {
        if (!this.show) {
          this.casoDeTeste = new CasoDeTeste()
        } else {
          console.log('Not Show')
        }
      }
    },
    mounted () {
      this.casoDeTeste = new CasoDeTeste()
      this.casoDeTeste.problema = Problema.BUILD_FORM(this.problema)
      this.casoDeTeste = new CasoDeTeste.BUILD_FORM(this.casoDeTeste)
    },
    methods: {
      adicionarCaso () {
        let problema = this.problema
        debugger
        console.log(problema)
        debugger
        this.casoDeTeste.problema = problema
        this.salvarCasoDeTeste(this.casoDeTeste)
      },
      editar (caso) {
        this.casoDeTeste = new CasoDeTeste.BUILD_FORM(caso)
      },
      // caso de teste salvar
      salvarCasoDeTeste (casoDeTeste) {
        debugger
        const data = CasoDeTesteDao.submitForm(casoDeTeste)
        if (data.id === 0) {
          http.post('http://localhost:8084/alg-judge/rest/casodeteste', data).then(
            response => {
              let data = response.data.data
              console.log('Casos De Teste Salvo', response.data.data)
              casoDeTeste.id = data.id
              this.casosArray.push(this.casoDeTeste)
              this.clean()
            }
          )
        } else {
          http.put('http://localhost:8084/alg-judge/rest/casodeteste', data).then(
            response => {
              console.log('Casos De Teste Atualizado', response.data.msg)
              this.delCasos(casoDeTeste)
              this.casosArray.push(casoDeTeste)
              this.clean()
            }
          ).catch(erro => {
            console.log('Erro', erro)
          })
        }
      },
      // sobre a lista
      delCasos (caso) {
        this.casosArray.splice(this.findIndexCasos(caso), 1)
      },
      findIndexCasos (index) {
        return this.casosArray.findIndex((_caso) => {
          return _caso.id === index.id
        })
      },
      clean () {
        this.casoDeTeste = new CasoDeTeste()
        this.casoDeTeste.problema = Problema.BUILD_FORM(this.problema)
        this.casoDeTeste = new CasoDeTeste.BUILD_FORM(this.casoDeTeste)
      }
    }
  }
</script>

<style scoped lang="scss">
   .my_text_area {
     border: solid 1px #65a977;
     padding: 15px;
   }
</style>
