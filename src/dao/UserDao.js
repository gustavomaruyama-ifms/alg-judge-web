class UserDao {
  static submitForm (user) {
    const data = {
      nome: user.nome ? user.nome : null,
      senha: user.senha ? user.senha : null,
      email: user.email ? user.email : null
    }
    return data
  }
}
export default UserDao
