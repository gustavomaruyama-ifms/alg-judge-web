<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <h6 class="text-center problema_margin" style="">Alg Judge | {{problema.id}}</h6>
        <h2 class="text-center" style="">{{problema.titulo}}</h2>
        <hr>
      </div>
    </div>
    <!-- Descrição -->
    <div class="row problema_margin">
      <div class="col-md-12 col-lg-12">
        <div style="margin: auto" v-html="problema.descricao"></div>
      </div>
    </div>
    <!-- Entrada -->
    <div class="row problema_margin">
      <div class="col-md-12 col-lg-12">
        <h5 class="pull-left">Entrada</h5>
      </div>
      <div class="col-md-12 col-lg-12">
        <div style="margin: auto" v-html="problema.descricaoEntrada"></div>
      </div>
    </div>
    <!-- Saída -->
    <div class="row problema_margin">
      <div class="col-md-12 col-lg-12">
        <h5 class="pull-left">Saída</h5>
      </div>
      <div class="col-md-12 col-lg-12">
        <div style="margin: auto" v-html="problema.descricaoSaida"></div>
      </div>
      <hr>
    </div>
    <!-- Saída -->
    <div class="row problema_margin">
      <div class="col-md-12 col-lg-12">
        <table class="table table-bordered table-striped text-center">
          <thead>
          <tr>
            <td>Exemplo Entrada</td>
            <td>Exemplo Saída</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="exemplo in problema.exemplos">
            <td><div v-html="repleceEntrada(exemplo.entrada)"></div></td>
            <td><div v-html="getSaidas(exemplo.saida)"></div></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Submeter -->
    <div class="row problema_margin">
      <div class="col-md-12 col-lg-12">
        <b-button @click="enviar()" class="btn btn-success pull-right">Submeter</b-button>
        <b-button @click="voltarParaListagem()" class="btn btn-info pull-left">Voltar</b-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'view-problema',
      props: {
        problema: {required: true}
      },
      data () {
        return {
          saidas: [],
          entradas: []
        }
      },
      created () {
        console.log('Problema View')
      },
      methods: {
        getSaida (entrada) {
          this.saidas = entrada.split('\n')
          return this.saidas
        },
        getEntrada (entrada) {
          this.entradas = entrada.split('\n')
          return this.entradas
        },
        repleceEntrada (saida) {
          console.log(saida.replace(/\n/g, '<br>'))
          return saida.replace(/\n/g, '<br>')
        },
        getSaidas (saida) {
          console.log(saida.replace(/\n/g, '<br>'))
          return saida.replace(/\n/g, '<br>')
        },
        enviar () {
          this.$emit('showPanel')
        },
        voltarParaListagem () {
          this.$emit('voltarParaListagem')
        }
      }
    }
</script>

<style scoped>

</style>
