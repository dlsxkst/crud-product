// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;

const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  let product = null

  // get a product by ID
  product = lodash.find(productsList, { id: lodash.parseInt(productId) });

  if (product) {
    done(null, JSON.stringify(product));

    return {
      code: 200,
      success: true,
      message: "Get data by id success",
      data: product
    }
  } else {
    done("Requested product doesn't exist..!");

    return {
      code: 404,
      success: false,
      message: `Product with id ${productId} not found`
    };
  }
}

const saveProduct = (newProduct, done) => {
  // save a product
  const check = lodash.find(productsList, { id: newProduct.id });

  if (check) {
    done("Product already exists..!");

    return {
      code: 400,
      success: false,
      message: "There is the same product id"
    }
  } else {
    productsList.push(newProduct);

    done(null, JSON.stringify(productsList));

    return {
      code: 201,
      success: true,
      message: "Product added successfully"
    }
  }
}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;

  // update the product list
  const index = lodash.findIndex(productsList, { id: parseInt(productId) });

  updatedProductList = {
    id: parseInt(productId),
    ...updateData
  };

  if (index != -1) {
    productsList[index] = updatedProductList;

    done(null, JSON.stringify(productsList));

    return {
      code: 200,
      success: true,
      message: `Product with id ${productId} was successfully updated`
    }
  } else {
    done("Requested product doesn't exist..!");

    return {
      code: 404,
      success: false,
      message: `Product with id ${productId} not found`
    }
  }
}

const deleteProduct = (productId, done) => {
  // delete a product    
  const index = lodash.findIndex(productsList, { id: parseInt(productId) });

  if (index != -1) {
    productsList.splice(index, 1);

    done(null, JSON.stringify(productsList));

    return {
      code: 200,
      success: true,
      message: `Product with id ${productId} was successfully removed`
    }
  } else {
    done("Requested product doesn't exist..!");

    return {
      code: 404,
      success: false,
      message: `Product with id ${productId} not found`
    }
  }
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}