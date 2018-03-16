export default {

  'USER_LOGADO' (state, payload) {
    state.userState.user = payload
  },

  'USER_LOGIN' (state) {
    state.userState.userLogado = true
  },

  'SUBMETIDO' (state, payload) {
    state.userState.submissoes = payload
  }
}
