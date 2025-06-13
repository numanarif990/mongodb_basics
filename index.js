const express = require('express');

const app = express();
// Using Node.js `require()`
const mongoose = require('mongoose');
// Importing the Product model
 const product = require('./modals/product.modal'); 

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello, World!');    
})



app.post('/api/products', async (req, res) => {
 try {

  const newProduct = await product.create(req.body);
  res.status(201).json(newProduct);
  
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
});


app.get('/api/products', async (req, res) => {
 try {
  const products = await product.find();
  res.status(200).json(products);
 } catch (error) {
  res.status(500).json({ message: error.message
  
   });
 }
});


app.get('/api/products/:id', async (req, res) => {
 try {
  const productId = req.params.id;
  const singleProduct = await product.findById(productId);
  if (!singleProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }     

  res.status(200).json(singleProduct);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
});



app.put('/api/products/:id', async (req, res) => {
 try {
  const productId = req.params.id;
  const updatedProduct = await product.findByIdAndUpdate(productId, req.body    
, { new: true, runValidators: true });
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(updatedProduct);
 }  catch (error) {
  res.status(500).json({ message: error.message });
 }  
})

mongoose.connect("mongodb+srv://muhammadnumanarif04:p3K7ucmtHXNpUiox@cluster0.bqma6xg.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0", ).then(()=>{
  console.log("Connected to MongoDB successfully");
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});