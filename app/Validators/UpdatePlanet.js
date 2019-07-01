'use strict'

class UpdatePlanet {
  get rules () {
    const planet_id = this.ctx.params.id
    return {
      name: 'required|min:4|max:100|unique:planets,name,id,'+planet_id,
      climate: 'required|min:4|max:200',
      terrain: 'required|min:4|max:200',
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = UpdatePlanet
