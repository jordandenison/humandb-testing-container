import test from 'ava'
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')
const io = require('socket.io-client')

const url = 'http://hdb-dash-auth:3001/'

const email = 'test'
const password = 'test'

const socket = io(url, {
  path: '/auth/socket.io',
  transports: [ 'websocket' ]
})

const app = feathers()
  .configure(socketio(socket))
  .configure(auth({ path: '/auth/authentication' }))

test('login', async t => {
  const { accessToken } = await app.authenticate({ strategy: 'local', email, password })

  t.true(accessToken.length > 10)
})
