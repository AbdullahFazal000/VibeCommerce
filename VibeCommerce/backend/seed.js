import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/productModel.js';
import products from './data/products.js';

dotenv.config();
console.log("MONGO_URI from env:", process.env.MONGO_URI);
await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    const inserted = await Product.insertMany(products);
    console.log(`✅ Inserted ${inserted.length} products`);
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

importData();
