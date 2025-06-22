const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Path to your User model
const Product = require("./models/Product"); // Path to your Product model

const mongoUrl = "mongodb://localhost:27017/api-forge"; // Change to your MongoDB URL

async function seed() {
  // Connect to MongoDB database
  await mongoose.connect(mongoUrl);
  console.log("Connected to MongoDB");

  // Create an admin user if not exists
  const adminEmail = "admin@demo.pl";
  const adminPass = "admin123";
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    // Hash the password before saving
    const hash = await bcrypt.hash(adminPass, 10);
    admin = new User({ email: adminEmail, password: hash, role: "admin" });
    await admin.save();
    console.log("Admin created:", adminEmail);
  } else {
    console.log("Admin already exists:", adminEmail);
  }

  // Create a normal user if not exists
  const userEmail = "user@demo.pl";
  const userPass = "user123";
  let user = await User.findOne({ email: userEmail });
  if (!user) {
    // Hash the password before saving
    const hash = await bcrypt.hash(userPass, 10);
    user = new User({ email: userEmail, password: hash, role: "user" });
    await user.save();
    console.log("User created:", userEmail);
  } else {
    console.log("User already exists:", userEmail);
  }

  // List of products (they will be assigned to admin user)
  const productsList = [
    { name: "Klawiatura mechaniczna", price: 299 },
    { name: "Mysz gamingowa", price: 129 },
    { name: 'Monitor 27"', price: 899 },
    { name: "Podkładka XXL", price: 49 },
    { name: "Słuchawki bezprzewodowe", price: 199 },
  ];

  // Check if products already exist in the database
  const productsCount = await Product.countDocuments();
  if (productsCount === 0) {
    // If not, add all example products
    for (const prod of productsList) {
      const product = new Product({
        ...prod,
        createdBy: admin._id, // Assign admin as creator
      });
      await product.save();
      console.log("Product created:", prod.name);
    }
  } else {
    // If products exist, skip adding them
    console.log("Products already exist, skipping...");
  }

  // Disconnect from MongoDB
  mongoose.disconnect();
  console.log("Seeding done! 🚀");
}

// Run the seed function and handle possible errors
seed().catch((err) => {
  console.error("Seeding error:", err);
  mongoose.disconnect();
});
