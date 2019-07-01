'use strict'

const Route = use('Route')

Route.group(() => {
  // show all planets/search by name
  Route.get('/', 'PlanetController.index')
  // show all planets/search by name
  Route.get('/:id', 'PlanetController.show')
  // save planet
  Route.post('/store', 'PlanetController.store').middleware(['auth']).validator('StorePlanet')
  // update planet
  Route.put('/update/:id', 'PlanetController.update').middleware(['auth']).validator('UpdatePlanet')
  //delete planet by id
  Route.delete('/delete/:id', 'PlanetController.delete').middleware(['auth'])

  //auth routes
  Route.post('/register', 'AuthController.register').validator('RegisterAuth')
  Route.post('/login', 'AuthController.login').validator('LoginAuth')
  Route.post('/refresh', 'AuthController.refresh')
  Route.post('/logout', 'AuthController.logout')
}).prefix('api')
