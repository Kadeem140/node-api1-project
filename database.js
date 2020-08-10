const shortid = require("shortid")

let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane"      
    },
    {
        id: shortid.generate(),
        name: "John Doe",
        bio: "Jane's Husband"         
    },
    {
        id: shortid.generate(),
        name: "Joe Doe",
        bio: "John Doe's Brother"
    },
    {
        id: shortid.generate(),
        name: "Kadeem Beckford",
        bio: "Fullstack web developer"
          
    },
]

function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}