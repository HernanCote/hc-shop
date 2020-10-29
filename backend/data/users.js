const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@proshop.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'Hernan Cote',
    email: 'hernan@proshop.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'Karen Arias',
    email: 'karen@proshop.com',
    password: bcrypt.hashSync('12345', 10),
  },
];

module.exports = users;