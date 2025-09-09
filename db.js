const mongoose = require("mongoose");
async function connectdb() {
  const connection = await mongoose.connect(
    "mongodb+srv://devi:zmnIOEbjCosOUFoE@cluster0.o6kj3mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database sucessfully connected");
}
module.exports = connectdb;
