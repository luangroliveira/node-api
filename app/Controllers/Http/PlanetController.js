'use strict'

const Planet = use('App/Models/Planet')

class PlanetController {
  async index ({request}) {
    const page = request.get().page || 1
    const name = request.input('search') ? request.input('search') : '' ;
      return await Planet.query()
        .leftJoin('users', 'planets.user_id', 'users.id')
        .where('planets.name', 'like', '%'+name+'%')
        .select('planets.id','planets.name','planets.climate','planets.terrain','planets.exhibition','users.name as editor')
        .paginate(page)
  }
  async store ({ request, auth }) {
    const name = request.input('name')
    const exhibition =  await this.callSwapiApi(name)
    const data = request.only(['name', 'climate', 'terrain'])
    return await Planet.create({ user_id : auth.user.id , exhibition: exhibition, ...data})
  }
  async show ({ params }) {
    return await Planet.find(params.id)
  }
  async update ({ params, request, response }) {
    const planet = await Planet.find(params.id)
    const data = request.only(['name', 'climate', 'terrain'])
    const name = request.input('name')
    if(name){
      data.exhibition =  await this.callSwapiApi(name)
    }
    planet.merge( data )
    await planet.save()
    return planet
  }
  async delete ({ params, auth, response }) {
    const planet = await Planet.find(params.id)
    if(!planet){
      return response.status(404).json()
    }
    if(planet.user_id != auth.user.id){
      return response.status(401).json()
    }
    return await planet.delete()
  }

  async callSwapiApi(name){
    let exhibition =0
    const planetSeach = require('querystring').stringify({ 'search': name })
    const swapi = await require('axios').get('http://swapi.co/api/planets?'+ planetSeach)
    swapi.data.results.forEach(element => {
      if(name == element.name){
        exhibition = element.films.length
      }
    })
    return exhibition
  }
}

module.exports = PlanetController
