module.exports = app => {
    const product = require("../controllers/product.controller.js");
  
    // Create a new Customer
    app.post("/products", product.create);
  
    // Retrieve all Customers
    app.get("/products", product.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/products/:productNumber", product.findOne);
  
    // Update a Customer with customerId
    app.put("/products/:productNumber", product.update);
  
    // Delete a Customer with customerId
    app.delete("/products/:productNumber", product.delete);
  
    // Create a new Customer
    app.delete("/products", product.deleteAll);
  };