const mongoose = require("mongoose");
async function connectdb() {
<<<<<<< HEAD
  const connection = await mongoose.connect(
    "mongodb+srv://devi:zmnIOEbjCosOUFoE@cluster0.o6kj3mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database sucessfully connected");
}
=======
  try {
    await mongoose.connect(
      "mongodb+srv://devi:zmnIOEbjCosOUFoE@cluster0.o6kj3mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database successfully connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}

>>>>>>> dd64dc6 (Add project files)
module.exports = connectdb;
