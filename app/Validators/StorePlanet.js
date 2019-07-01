'use strict'

class StorePlanet {
  get rules () {
    return {
      name: 'required|min:4|max:100|unique:planets,name',
      climate: 'required|min:4|max:200',
      terrain: 'required|min:4|max:200',
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = StorePlanet
