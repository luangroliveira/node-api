'use strict'

class LoginAuth {
  get rules () {
    return {
      email: 'required|email|min:4|max:254',
      password: 'required|min:4|max:60',
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = LoginAuth
