<template>
  <div class="row">
    <div class="col-md-12">
      <div class="no-h-padding" :headerText="$t('forms.wizard.simple')">
        <vuestic-wizard :steps="hsSteps">
          <!-- Problema -->
          <div slot="page1" class="form-wizard-tab-content">
            <fieldset class="my_fieldset">
              <div class="form-group">
                <div class="input-group">
                  <input v-model="problema.titulo"
                         v-validate="'required'"
                         :class="{'input': true, 'is-danger': errors.has('titulo') }"
                         id="titulo"
                         name="titulo" required="required">
                  <label for="titulo" class="control-label">Título do Problema</label>
                  <i class="bar"></i>
                  <small v-show="errors.has('titulo')" class="help text-danger">{{ errors.first('titulo') }}</small>
                </div>
              </div>
              <div class="my_margin">
                <label><strong>Descrição do Problema</strong></label>
                <vue-editor
                  id="descricaoF"
                  v-model="problema.descricao"
                >
                </vue-editor>
              </div>

              <div class="my_margin">
                <label><strong>Descrição de Entrada do Problema</strong></label>
                <vue-editor
                  id="descricaoEntradaF"
                  v-model="problema.descricaoEntrada"
                >
                </vue-editor>
              </div>

              <div>
                <label><strong>Descrição de Saída do Problema</strong></label>
                <vue-editor
                  id="descricaoSaidaF"
                  v-model="problema.descricaoSaida"
                >
                </vue-editor>
              </div>

            </fieldset>
          </div>
          <!-- Caso de Teste -->
          <div slot="page2" class="form-wizard-tab-content">
            <div v-if="problemaId" class="my_fieldset">
              <caso-de-teste-list @editCaso="editarCasoDeTeste" :casos="casos"></caso-de-teste-list>
              <fieldset class="my_fieldset my_margin">
                <div class="form-group">
                  <div class="input-group">
                    <input v-model="casoDeTeste.saida"
                           v-validate="'required'"
                           :class="{'input': true, 'is-danger': errors.has('saida') }"
                           id="saida"
                           name="saida" required="required">
                    <label for="saida" class="control-label">DIGITE UMA SAÍDA PARA O CASO DE TESTE</label>
                    <i class="bar"></i>
                    <small v-show="errors.has('saida')" class="help text-danger">{{ errors.first('saida') }}</small>
                  </div>
                </div>

                <div class="form-group form-group-w-btn">
                  <div class="input-group">
                    <input id="input-w-btn-round"
                           v-model="caso"
                           required/>
                    <label class="control-label" for="input-w-btn-round">
                      DIGITE UMA ENTRADA PARA O CASO DE TESTE
                    </label>
                    <i class="bar"></i>
                  </div>
                  <div @click="addEntrada(caso)" class="btn btn-primary btn-with-icon btn-micro rounded-icon">
                    <div class="btn-with-icon-content">
                      <i aria-hidden="true"
                         class="fa fa-plus"
                         style="font-size: 26px; text-align: center;">
                      </i>
                    </div>
                  </div>
                </div>

                <div v-if="entradas.length > 0" class="text-center my_margin">
                  <span class="text-danger my_danger my_margin">CLICK PARA DELETAR ALGUMA ENTRADA</span> <br>
                  <b-button-group style="margin-top: 10px">
                    <b-button @click="delEntrada(e)" v-for="e in entradas" :key="e">{{e}}</b-button>
                  </b-button-group>
                </div>

                <div class="text-center">
                  <vuestic-switch v-model="casoDeTeste.exemplo">
                    <span slot="trueTitle">COM EXEMPLO</span>
                    <span slot="falseTitle">SEM EXEMPLO</span>
                  </vuestic-switch>
                </div>

              </fieldset>
              <button  @click="salvar" class="btn btn-primary btn-micro text-center">
                <div class="btn-with-icon-content">
                  <span aria-hidden="true" class="fa fa-plus" style="font-size: 12px;"></span>
                  adicionar
                </div>
              </button>
            </div>
            <div v-else>
              <spinner size="massive"></spinner>
            </div>
          </div>

          <div slot="page3" class="form-wizard-tab-content">
            <h3 class="text-center">{{problema.titulo}}</h3>

            <h5 class="text-center">Descrição Problema</h5>
            <div v-html="problema.descricao"></div>

            <h5 class="text-center">Descrição Entrada</h5>
            <div v-html="problema.descricaoEntrada"></div>

            <h5 class="text-center">Descrição Saída</h5>
            <div v-html="problema.descricaoSaida"></div>
            <h5 class="text-center">Casos de teste Relacionados</h5>
            <caso-de-teste-list :casos="casos"></caso-de-teste-list>
          </div>
        </vuestic-wizard>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable indent */

  import {VueEditor} from 'vue2-editor'
  import http from 'axios'
  import FormProblema from './formProblema'
  import Problema from '../../../../model/Problema'
  import ProblemaDao from '../../../../dao/ProblemaDao'
  import CasoDeTeste from '../../../../model/CasoDeTeste'
  import CasoDeTesteDao from '../../../../dao/CasoDeTesteDao'
  import FormSimple from './form-simple'
  import CasoDeTesteList from './caso-de-teste-list'
  import Spinner from 'vue-simple-spinner'

  export default {
    name: 'form-elements-problema',
    components: {
      FormSimple,
      FormProblema,
      VueEditor,
      Problema,
      Spinner,
      CasoDeTesteList
    },
    computed: {
      hsSteps () {
        return [
          {
            label: this.$t('forms.wizard.stepOne'),
            slot: 'page1',
            onNext: () => {
              this.validateFormField('titulo')
            },
            isValid: () => {
              this.saveProblema(this.problema)
              return this.isFormFieldValid('titulo')
            }
          },
          {
            label: this.$t('forms.wizard.stepTwo'),
            slot: 'page2',
            onNext: () => {
              this.validateFormField('saida')
            },
            isValid: () => {
              return true
            }
          },
          {
            label: this.$t('forms.wizard.stepThree'),
            slot: 'page3'
          }
        ]
      },
      hrSteps () {
        return [
          {
            label: this.$t('forms.wizard.stepOne'),
            slot: 'page1',
            onNext: () => {
              this.validateFormField('hrName')
            },
            isValid: () => {
              return this.isFormFieldValid('hrName')
            }
          },
          {
            label: this.$t('forms.wizard.stepTwo'),
            slot: 'page2',
            onNext: () => {
              this.$refs.hrCountrySelect.validate()
            },
            isValid: () => {
              return this.$refs.hrCountrySelect.isValid()
            }
          },
          {
            label: this.$t('forms.wizard.stepThree'),
            slot: 'page3'
          }
        ]
      },
      vrSteps () {
        return [
          {
            label: this.$t('forms.wizard.stepOne'),
            slot: 'page1',
            onNext: () => {
              this.validateFormField('vrName')
            },
            isValid: () => {
              return this.isFormFieldValid('vrName')
            }
          },
          {
            label: this.$t('forms.wizard.stepTwo'),
            slot: 'page2',
            onNext: () => {
              this.$refs.vrCountrySelect.validate()
            },
            isValid: () => {
              return this.$refs.vrCountrySelect.isValid()
            }
          },
          {
            label: this.$t('forms.wizard.stepThree'),
            slot: 'page3'
          }
        ]
      },
      vsSteps () {
        return [
          {
            label: this.$t('forms.wizard.stepOne'),
            slot: 'page1',
            onNext: () => {
              this.validateFormField('vsName')
            },
            isValid: () => {
              return this.isFormFieldValid('vsName')
            }
          },
          {
            label: this.$t('forms.wizard.stepTwo'),
            slot: 'page2',
            onNext: () => {
              this.$refs.vsCountrySelect.validate()
            },
            isValid: () => {
              return this.$refs.vsCountrySelect.isValid()
            }
          },
          {
            label: this.$t('forms.wizard.stepThree'),
            slot: 'page3'
          },
          this.goTO()
        ]
      }
    },
    data () {
      return {
        problemaId: false,
        entradas: [],
        problema: new Problema(),
        casoDeTeste: new CasoDeTeste(),
        caso: '',
        casos: []
      }
    },
    created () {
      this.problema = new Problema.BUILD_FORM(this.problema)
      this.casoDeTeste = new CasoDeTeste.BUILD_FORM(this.casoDeTeste)
    },
    methods: {
      isFormFieldValid (field) {
        let isValid = false
        if (this.formFields[field]) {
          isValid = this.formFields[field].validated && this.formFields[field].valid
        }
        return isValid
      },
      validateFormField (fieldName) {
        this.$validator.validate(fieldName, this[fieldName])
      },
      saveProblema (problema) {
        this.problema.id = 0
        const data = ProblemaDao.SUBMIT_FORM(problema)
        http.post('http://localhost:8084/alg-judge/rest/problema', data).then(response => {
          console.log('Problema', response.data)
          this.getProblema(response.data.data.id)
        })
      },
      addEntrada (entrada) {
        this.entradas.push(entrada)
        this.caso = ''
      },
      delEntrada (entrada) {
        this.entradas.splice(this.findIndex(entrada), 1)
      },
      findIndex (index) {
        return this.entradas.findIndex((_entrada) => {
          return _entrada === index
        })
      },
      editarCasoDeTeste (caso) {
        this.casoDeTeste = caso
        this.getEntradas(this.casoDeTeste.entrada)
      },
      getEntradas (entrada) {
        this.entradas = entrada.split('\n')
      },
      salvar () {
        this.casoDeTeste.entrada = ''

        for (let entrada in this.entradas) {
          if (entrada < this.entradas.length - 1) {
            this.casoDeTeste.entrada += this.entradas[entrada] + '\n'
          } else {
            this.casoDeTeste.entrada += this.entradas[entrada]
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
        this.entradas = []
        this.casoDeTeste = new CasoDeTeste()
        this.casoDeTeste.id = 0
        this.casoDeTeste = CasoDeTeste.BUILD_FORM(this.casoDeTeste)
        this.casoDeTeste.problema = this.problema
      },
      getProblema (id) {
        http.get('http://localhost:8084/alg-judge/rest/problema/' + id).then(response => {
          this.problema = ProblemaDao.SUBMIT_FORM(response.data.data)
          this.casoDeTeste.problema = this.problema
          this.problemaId = true
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
      goTO () {
        this.$router.replace('/problema')
      }
    }
  }
</script>

<style scoped>
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
</style>
