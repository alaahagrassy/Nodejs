const mongoose = require('mongoose');
require('dotenv').config();
const passwordMongodbAtlas = process.env.passwordMongodbAtlas
async function main() {
  await mongoose.connect(`mongodb+srv://nodejs:XW3lXRPk5DDEaubO@cluster0.gbn4c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
  console.log("connected to database successfully");
}
main().catch(err => console.log(err));
