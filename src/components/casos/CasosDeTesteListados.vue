<template>
   <div>
     <div class="row" v-for="caso in casos">
         <div class="casos_table col-lg-4 col-md-4">
           <div class="card" style="width: 100%; background-color: inherit">
             <div class="card-body">
               <h5 class="card-title" style="margin-top: 5px">Caso de Teste ID: {{caso.id}}</h5>
               <p class="card-text">Exemplo: {{caso.exemplo}}</p>
               <i class="sethings_icon fa fa-edit">
               </i><a @click="editCaso(caso)" href="#"><strong style="margin-right: 5px">Edit</strong></a>
               <i class="sethings_icon fa fa-trash">
               </i><a @click="deleteCaso(caso)" href="#"><strong class="text-danger">Delete</strong></a>
             </div>
           </div>
         </div>
         <div class="casos_table col-lg-4 col-md-4">
           <div class="card" style="width: 100% ">
             <div class="card-header">
               <strong>Entradas Esperadas</strong>
             </div>
             <ul class="list-group list-group-flush">
               <li class="list-group-item" v-for="entrada in adicionarEntradas(caso.entrada)" >{{entrada}}</li>
             </ul>
           </div>
         </div>
         <div class="casos_table col-lg-4 col-md-4">
           <div class="card" style="width: 100%;">
             <div class="card-header">
               <strong>Saídas Esperadas</strong>
             </div>
             <ul class="list-group list-group-flush">
               <li class="list-group-item" v-for="saida in adicionarSaidas(caso.saida)" >{{saida}}</li>
             </ul>
           </div>
         </div>
     </div>
   </div>
</template>

<script>
  import swal from 'sweetalert'
  import http from 'axios'
  export default {
    name: 'casos-de-teste-listados',
    props: {
      casos: {required: true}
    },
    data () {
      return {
        saidaVetor: [],
        entradaVetor: []
      }
    },
    methods: {
      adicionarSaidas (saida) {
        this.saidaVetor = saida.split('\n')
        for (var s in this.saidaVetor) {
          if (this.saidaVetor[s].length === 0) {
            this.saidaVetor.splice(s, 1)
          }
        }
        return this.saidaVetor
      },
      adicionarEntradas (entrada) {
        this.entradaVetor = entrada.split('\n')
        for (var s in this.entradaVetor) {
          if (this.entradaVetor[s].length === 0) {
            this.entradaVetor.splice(s, 1)
          }
        }
        return this.entradaVetor
      },
      deleteCaso (caso) {
        swal({
          title: 'Você tem certeza disto?',
          text: 'Este caso de Entrada Será Deletado, clique em ok para executar esta ação!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              this.deletarCasoBanco(caso)
              swal('O Caso de Teste foi deletado com sucesso!', {
                icon: 'success'
              })
            } else {
              swal('O Caso de teste esta seguro em nossos arquivos!')
            }
          })
      },
      editCaso (caso) {
        console.log('Edit')
        this.$emit('editCaso', caso)
      },
      deletarCasoBanco (caso) {
        http.put('http://localhost:8084/alg-judge/rest/casodeteste/deletecasos', caso)
          .then(response => {
            console.log('Deletou ', response.data)
            this.$emit('deletar', caso)
          }
        )
      }
    }
  }
</script>

<style scoped>
  div .row:nth-child(odd) {
    background-color: rgba(237, 255, 209, 0.38);
  }
  .casos_table {
    padding: 15px;
    border-radius: 5px 5px 5px 5px;
  }
  .sethings_icon {
    font-size: 20px;
    margin-right: 5px;
  }
  strong {
    font-size: 1.2em;
  }
</style>
