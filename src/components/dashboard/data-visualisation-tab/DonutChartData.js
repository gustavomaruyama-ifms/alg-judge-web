import store from 'vuex-store'

let palette = store.getters.palette

export default {
  labels: ['Erros', 'Erro de Sintax', 'Aceitos'],
  datasets: [{
    label: 'Population (millions)',
    backgroundColor: [palette.danger, palette.warning, palette.primary],
    data: [2, 2, 2]
  }]
}
