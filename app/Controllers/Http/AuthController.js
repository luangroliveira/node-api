'use strict'

const User = use('App/Models/User')

class AuthController {

  async register({ request }){
    const data = request.only(['name','email','password'])
    const user = await User.create(data)
    return user
  }

  async login({ request, auth }){
    const { email, password } = request.all()
    const token = await auth.withRefreshToken().attempt(email, password)
    return token
  }

  async refresh({ request, auth }){
    const refreshToken = request.input('refresh_token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    return token
  }

  async logout({ auth }){
    const user = await User.find(1)

    await auth
      .authenticator('jwt')
      .revokeTokensForUser(user)
  }
}

module.exports = AuthController
