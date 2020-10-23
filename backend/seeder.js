const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

const users = require('./data/users.js');
const products = require('./data/products.js');

const User = require('./models/user.js');
const Product = require('./models/product.js');
const order = require('./models/order.js');

const connectDB = require('./config/db.js');
const Order = require('./models/order.js');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return {
        ...product,
        user: adminUser,
      }
    });

    await Product.insertMany(sampleProducts);
    console.log('Data imported successfully'.green.inverse);
    process.exit();
  }
  catch (err) {
    console.error(`Error: ${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully'.red.inverse);
    process.exit();
  }
  catch (err) {
    console.error(`Error: ${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}