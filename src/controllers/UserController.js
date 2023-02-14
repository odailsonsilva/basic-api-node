let users = require('../mocks/users')

module.exports = {
    listUsers(request, response) {
        const { order } = request.query;

        const sortedUser = users.sort((a, b) => {
            if (order === 'desc') {
                return a.id < b.id ? 1 : -1;
            }

            return a.id > b.id ? 1 : -1;
        })

        response.send(200, sortedUser)
        // response.writeHead(200, { 'Content-Type': 'application/json' });
        // response.end(JSON.stringify(sortedUser));
    },
    getUserById(req, res) {
        const { id } = req.params;

        const user = users.find((user) => user.id === Number(id));

        if (!user) {
            return res.send(400, { error: 'User not found' })
        }

        res.send(200, user)
    },
    createUser(request, response) {
        const { body } = request;

        const lastUserId = users[users.length - 1].id;
        const newUser = {
            ...body,
            id: lastUserId + 1
        }

        users.push(newUser)

        response.send(201, newUser)
    },
    updateUser(request, response) {
        const { name } = request.body;
        let { id } = request.params

        id = Number(id)

        const userExists = users.find((user) => user.id === id)

        if (!userExists) {
            response.send(400, { error: 'user not found' })
        }

        users = users.map((user) => {
            if (user.id === id) {
                return {
                    ...user,
                    name
                }
            }

            return user
        })

        response.send(200, users)
    },
    deleteUser(request, response) {
        let { id } = request.params

        id = Number(id)

        users = users.filter((user) => user.id !== id)

        response.send(200, users)
    },
}