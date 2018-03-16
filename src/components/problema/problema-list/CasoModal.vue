<template>
  <transition name="modal" :duration="duration">
    {{verificarCasos}}
    <div v-show="show" class="modal-container">
      <div class="modal" @click.self="clickMask">
        <div class="modal-dialog" :class="modalClass">
          <div class="modal-content">
            <!--Header-->
            <div class="modal-header">
              <slot name="header">
                <div class="modal-title">
                  <slot name="title"></slot>
                </div>
              </slot>
            </div>
            <!--Container-->
            <div class="modal-body">
              <caso-de-teste-form v-show="problema" :show="show" :casos-array="casos" :problema="problema"></caso-de-teste-form>
            </div>
            <!--Footer-->
            <div class="modal-footer">
              <slot name="footer">
                <button type="button" :disabled="vetorDeEntradas.length = 0" :class="okClass" @click="ok">{{okText}}</button>
                <button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop"></div>
    </div>
  </transition>
</template>

<script>
  import http from 'axios'
  import CasoDeTeste from '../../../model/CasoDeTeste'
  import CasoDeTesteDao from '../../../dao/CasoDeTesteDao'
  import CasoDeTesteForm from '../../casos/CasoDeTesteForm'
  import ProblemaDao from '../../../dao/ProblemaDao'
  import CasoDeTesteList from '../problema-form/form-elements/caso-de-teste-list'

  export default {
    name: 'caso-modal',
    props: {
      transition: {
        type: String,
        default: 'modal'
      },
      problemaId: {required: true},
      problema: {required: true},
      small: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      force: {
        type: Boolean,
        default: false
      },
      okText: {
        type: String,
        default: 'CONFIRM'
      },
      cancelText: {
        type: String,
        default: 'CANCEL'
      },
      okClass: {
        type: String,
        default: 'btn btn-primary'
      },
      cancelClass: {
        type: String,
        default: 'btn btn-secondary'
      }
    },
    components: {
      CasoDeTesteList,
      CasoDeTesteForm
    },
    data () {
      return {
        show: false,
        casos: [],
        caso: '',
        vetorDeEntradas: [],
        casoDeTeste: new CasoDeTeste(),
        duration: 500
      }
    },
    computed: {
      modalClass () {
        return {
          'modal-lg': this.large,
          'modal-sm': this.small
        }
      },
      verificarCasos () {
        if (this.show) {
          this.casoDeTeste = CasoDeTeste.BUILD_FORM(this.casoDeTeste)
          this.getCasos(this.problema.id)
        }
      }
    },
    created () {
      if (this.show) {
        document.body.className += ' modal-open'
      }
    },
    beforeDestroy () {
      document.body.className = document.body.className.replace(/\s?modal-open/, '')
    },
    watch: {
      show (value) {
        if (value) {
          document.body.className += ' modal-open'
        } else {
          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '')
          }, this.duration)
        }
      }
    },
    methods: {
      ok () {
        this.casoDeTeste = CasoDeTesteDao.submitForm(this.casoDeTeste)
        this.salvar()
        this.cancel()
      },
      cancel () {
        this.$emit('cancel')
        this.show = false
      },
      clickMask () {
        if (!this.force) {
          this.cancel()
        }
      },
      open () {
        this.show = true
      },
      addEntrada (entrada) {
        this.vetorDeEntradas.push(entrada)
        this.caso = ''
      },
      delEntrada (entrada) {
        this.vetorDeEntradas.splice(this.findIndex(entrada), 1)
      },
      findIndex (index) {
        return this.vetorDeEntradas.findIndex((_entrada) => {
          return _entrada === index
        })
      },
      editarCasoDeTeste (caso) {
        this.casoDeTeste = caso
        this.getEntradas(this.casoDeTeste.entrada)
      },
      getEntradas (entrada) {
        this.vetorDeEntradas = entrada.split('\n')
      },
      salvar () {
        this.casoDeTeste.entrada = ''

        for (let entrada in this.vetorDeEntradas) {
          if (entrada < this.vetorDeEntradas.length - 1) {
            this.casoDeTeste.entrada += this.vetorDeEntradas[entrada] + '\n'
          } else {
            this.casoDeTeste.entrada += this.vetorDeEntradas[entrada]
          }
        }
        this.casoDeTeste.problema = ProblemaDao.SUBMIT_FORM(this.casoDeTeste.problema)
        this.salvarCasoDeTeste(this.casoDeTeste)
      },
      salvarCasoDeTeste (casoDeTeste) {
        const data = CasoDeTesteDao.submitForm(casoDeTeste)
        if (data.id === 0) {
          http.post('http://localhost:8084/alg-judge/rest/casodeteste', data).then(
            response => {
              console.log('Casos De Teste Salvo', response.data.data)
              casoDeTeste.id = response.data.data.id
              this.casos.push(casoDeTeste)
              this.clean()
            }
          )
        } else {
          http.put('http://localhost:8084/alg-judge/rest/casodeteste', data).then(
            response => {
              console.log('Casos De Teste Atualizado', response.data.msg)
              this.delCasos(casoDeTeste)
              this.casos.push(casoDeTeste)
              this.clean()
            }
          ).catch(erro => {
            console.log('Erro', erro)
          })
        }
      },
      clean () {
        this.vetorDeEntradas = []
        this.casoDeTeste = new CasoDeTeste()
        this.casoDeTeste.id = 0
        this.casoDeTeste = CasoDeTeste.BUILD_FORM(this.casoDeTeste)
        this.casoDeTeste.problema = this.problema
      },
      getProblema (id) {
        http.get('http://localhost:8084/alg-judge/rest/problema/' + id).then(response => {
          this.problema = ProblemaDao.SUBMIT_FORM(response.data.data)
          this.casoDeTeste.problema = this.problema
          this.getCasos(this.problema.id)
          console.log('Get Problema', this.problema)
        })
      },
      delCasos (caso) {
        this.casos.splice(this.findIndexCasos(caso), 1)
      },
      findIndexCasos (index) {
        return this.casos.findIndex((_caso) => {
          return _caso.id === index.id
        })
      },
      getCasos (id) {
        http.get('http://localhost:8084/alg-judge/rest/casodeteste/listarcasos/' + id)
          .then(response => {
            this.casos = response.data.data
            console.log('Casos De Teste', response.data.data)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";

  // For Transitioning
  .modal {
    display: block;
  }

  .modal-dialog, .modal-backdrop {
    transition: all .5s ease;
  }

  .modal-enter .modal-dialog, .modal-leave-active .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }

  .modal-enter .modal-backdrop, .modal-leave-active .modal-backdrop {
    opacity: 0;
  }

  .modal-backdrop {
    opacity: 0.5;
  }

  //Modal styles

  .modal-header {
    height: $modal-header-height;
    padding: $modal-header-padding-y $modal-header-padding-x;
    border-bottom: $modal-header-border;
    font-size: $font-size-larger;
    display: flex;
    align-items: center;
  }

  .modal-content {
    border-radius: $modal-content-border-radius;
  }

  .modal-footer {
    justify-content: center;
    padding: 0 $modal-inner-padding;
    padding-bottom: calc(#{$modal-inner-padding} - #{$modal-footer-btns-padding-bottom});
    flex-wrap: wrap;
    .btn {
      margin: 0 $modal-footer-btns-margin-x $modal-footer-btns-padding-bottom $modal-footer-btns-margin-x;
    }
  }

  .my_fieldset {
    width: 100%;
  }

  .my_margin {
    margin-bottom: 25px;
  }

  .my_danger {
    font-weight: bold;
    font-size: 0.8em;
  }

  .modal-dialog {
    box-shadow: $modal-content-box-shadow-sm-up;
  }
</style>
