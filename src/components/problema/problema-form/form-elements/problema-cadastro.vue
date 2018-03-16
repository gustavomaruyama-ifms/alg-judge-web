<template>
  <div>
    <fieldset class="my_fieldset">
      {{verificarProblema}}
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

      <div class="my_margin">
        <label><strong>Descrição do Problema</strong></label>
        <vue-editor
          id="descricao"
          v-model="problema.descricao"
          required="required"
        >
        </vue-editor>
      </div>

      <div class="my_margin">
        <label><strong>Descrição de Entrada do Problema</strong></label>
        <vue-editor
          id="descricaoEntrada"
          v-model="problema.descricaoEntrada"
        >
        </vue-editor>
      </div>
      {{verificarProblema}}
      <div>
        <label><strong>Descrição de Saída do Problema</strong></label>
        <vue-editor
          id="descricaoSaida"
          v-model="problema.descricaoSaida"
        >
        </vue-editor>
      </div>

    </fieldset>
  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  import Problema from '../../../../model/Problema'

  export default {
    name: 'problema-cadastro',
    props: {
      problemaForm: {required: true}
    },

    components: {
      VueEditor
    },

    computed: {
      verificarProblema () {
        this.problema = new Problema.BUILD_FORM(this.problemaForm)
      }
    },
    data () {
      return {
        problema: new Problema(),
        validateForm: false
      }
    },
    methods: {
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
</style>
