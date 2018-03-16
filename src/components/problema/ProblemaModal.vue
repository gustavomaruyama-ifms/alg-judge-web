<template>
  <transition name="modal" :duration="duration">
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
              <fieldset class="my_fieldset">
                <input type="hidden" v-model="problema.id" value="0">
                <div class="form-group">
                  <div class="input-group">
                    <input v-model="problema.titulo"
                           v-validate="'required'"
                           :class="{'input': true, 'is-danger': errors.has('titulo') }"
                           id="simple-input"
                           name="titulo" required="required">
                    <label for="simple-input" class="control-label">Título do Problema</label>
                    <i class="bar"></i>
                    <small v-show="errors.has('titulo')" class="help text-danger">{{ errors.first('titulo') }}</small>
                  </div>
                </div>
                <h6>Descrição</h6>
                <wysiwyg class="my_margin" v-model="problema.descricao" />
                <h6>Descrição Entrada</h6>
                <wysiwyg class="my_margin" v-model="problema.descricaoEntrada" />
                <h6>Descrição Saída</h6>
                <wysiwyg v-model="problema.descricaoSaida" />

              </fieldset>
            </div>
            <!--Footer-->
            <div class="modal-footer">
              <slot name="footer">
                <button type="button" :class="okClass" @click="ok">{{okText}}</button>
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
  import ProblemaDao from '../../dao/ProblemaDao'
  import Problema from '../../model/Problema'
  import http from 'axios'
  import swal from 'sweetalert'
  import {VueEditor} from 'vue2-editor'

  export default {
    name: 'problema-modal',
    props: {
      transition: {
        type: String,
        default: 'modal'
      },
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
      VueEditor
    },
    data () {
      return {
        show: false,
        problemaRequisicao: new Problema(),
        duration: 500
      }
    },
    computed: {
      modalClass () {
        return {
          'modal-lg': this.large,
          'modal-sm': this.small
        }
      }
    },
    created () {
      if (this.show) {
        document.body.className += ' modal-open'
      }
      this.verificarProblema()
    },
    mounted () {
      this.verificarProblema()
    },
    beforeDestroy () {
      document.body.className = document.body.className.replace(/\s?modal-open/, '')
    },
    watch: {
      show (value) {
        if (value) {
          document.body.className += ' modal-open'
          this.verificarProblema()
        } else {
          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '')
          }, this.duration)
        }
      }
    },
    methods: {
      ok () {
        this.problemaRequisicao = ProblemaDao.SUBMIT_FORM(this.problema)
        http.put('http://localhost:8084/alg-judge/rest/problema', this.problema).then(response => {
          this.$emit('ok')
          swal({
            title: 'Problema atualizado!',
            text: 'O problema foi editado com sucesso!!',
            icon: 'success',
            button: 'OK'
          }).then(() => {
            window.location.reload()
          })
          this.show = false
        })
      },
      verificarProblema () {
        console.log('Problema Verificado')
        this.problemaRequisicao = Problema.BUILD_FORM(this.problema)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
  @import "../../../node_modules/bootstrap/scss/functions";
  @import "../../../node_modules/bootstrap/scss/variables";

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
  .my_margin {
    margin-bottom: 15px;
  },
  .modal-dialog {
    box-shadow: $modal-content-box-shadow-sm-up;
  }
</style>
