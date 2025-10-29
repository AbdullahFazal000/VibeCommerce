import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ error: 'Product not found' });
    res.json(prod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const p = new Product(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create product' });
  }
};
