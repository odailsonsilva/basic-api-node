const UserController = require('./controllers/UserController')

module.exports = [
    {
        endpoint: '/users',
        method: 'GET',
        handler: UserController.listUsers // methodo q vou usar para quando usar a funcao -> onde aqui passo somente a referencia nao a chamada da funcao
    },
    {
        endpoint: '/users/:id',
        method: 'GET',
        handler: UserController.getUserById
    },
    {
        endpoint: '/users',
        method: 'POST',
        handler: UserController.createUser
    },
    {
        endpoint: '/users/:id',
        method: 'PUT',
        handler: UserController.updateUser
    },
    {
        endpoint: '/users/:id',
        method: 'DELETE',
        handler: UserController.deleteUser
    }
]