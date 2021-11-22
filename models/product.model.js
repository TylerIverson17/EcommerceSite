const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.productNumber = product.productNumber
  this.productName = product.productName;
  this.description = product.description;
  this.brand = product.brand;
  this.category = product.category;
  this.price = product.price;
  this.imageURL = product.imageURL;
  this.freeShipping = product.freeShipping;
  this.qtyOnHand = product.qtyOnHand;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Product: ", {newProduct});
    result(null, {newProduct});
  });
};

Product.findById = (id, result) => {
  sql.query(`SELECT * FROM products WHERE productNumber = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE products SET  productName = ?, descripton = ?, brand = ?, category = ?, price = ?, imageURL = ?, freeShipping = ?, qtyOnHand = ? WHERE productNumber = ?",
    [product.productName, product.description, product.brand, product.category, product.price, product.imageURL, product.freeShipping,product.qtyOnHand, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE productNumber = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;