const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@proshop.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@proshop.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@proshop.com',
    password: bcrypt.hashSync('12345', 10),
  },
];

module.exports = users;