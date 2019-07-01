'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Planet extends Model {
  static get hidden () {
    return ['user_id']
  }
}

module.exports = Planet
