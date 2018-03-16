class User {
  static BUILD_FORM (user) {
    const data = {
      id: user.id ? user.id : 0,
      nome: user.nome ? user.nome : null,
      email: user.email ? user.email : null,
      senha: user.senha ? user.senha : null,
      papel: user.papel ? user.papel : null
    }
    return data
  }
  static LOGIN (user) {
    const data = {
      id: user.id ? user.id : 0,
      nome: user.nome ? user.nome : null,
      email: user.email ? user.email : null,
      papel: user.papel ? user.papel : null,
      token: user.token ? user.token : null
    }
    return data
  }
}
export default User
