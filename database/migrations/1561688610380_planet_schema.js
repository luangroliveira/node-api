'use strict'

const Schema = use('Schema')

class PlanetSchema extends Schema {
  up () {
    this.create('planets', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('climate', 200).notNullable()
      table.string('terrain', 200).notNullable()
      table.integer('exhibition', 2).notNullable().unsigned()
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('planets')
  }
}

module.exports = PlanetSchema
