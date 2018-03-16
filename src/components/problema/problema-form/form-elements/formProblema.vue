<template>
    <div>
      <fieldset class="my_fieldset">
        <div class="form-group">
          <input type="hidden" v-model="problema.id"/>
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
</template>

<script>
    import ProblemaDao from '../../../../dao/ProblemaDao'
    import http from 'axios'
    import { VueEditor } from 'vue2-editor'
    export default {
      name: 'form-problema',
      props: {
        problema: {required: true}
      },
      components: {
        VueEditor
      },
      methods: {
        submit () {
          const data = ProblemaDao.SUBMIT_FORM(this.problema)
          http.post('http://localhost:8084/alg-judge/rest/problema', data).then(response => {
            console.log('Problema', response.data.data)
            this.$emit('ProblemaSalvo ', response.data.data)
          })
        }
      }
    }
</script>

<style scoped>

</style>
