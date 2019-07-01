'use strict'

class RegisterAuth {
  get rules () {
    return {
      name: 'required|min:4|max:80|unique:users,name',
      email: 'required|email|min:4|max:254|unique:users,email',
      password: 'required|min:4|max:60',
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = RegisterAuth
