const VALID = { email: 'usuario1@mitienda.com', password: 'password' }

export const Auth = {
  login({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === VALID.email && password === VALID.password) {
          resolve({ id: 1, name: 'Usuario Demo', email })
        } else {
          reject(new Error('Credenciales inválidas'))
        }
      }, 500)
    })
  }
}