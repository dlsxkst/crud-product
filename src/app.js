//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = process.env.PORT || 4000

const productsService = require("./productsService");
const getRequestData = require('./utils');

const done = console.log;

const server = http.createServer(async (req, res) => {
  // Get all products
  if (req.url === '/api/products' && req.method === 'GET') {
    const response = await productsService.getProducts();

    res.writeHead(200, {
      'content-type': 'application-json'
    });

    res.end(response);
  }

  // Get a product with specified id
  else if (req.url.match(/api\/products\/([0-9])/) && req.method === 'GET') {
    try {
      const productId = req.url.split('/')[3];
      const response = await productsService.getProductsById(productId, done);

      res.writeHead(response.code, {
        'content-type': 'application-json'
      });

      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500, {
        'content-type': 'application-json'
      });

      res.end(JSON.stringify({
        success: false,
        message: error
      }))
    }
  }

  // Create a new product
  else if (req.url === "/api/products" && req.method === 'POST') {
    try {
      let body = await getRequestData(req);

      const response = await productsService.saveProduct(JSON.parse(body), done);

      res.writeHead(response.code, {
        'content-type': 'application-json'
      });

      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500, {
        'content-type': 'application-json'
      });

      res.end(JSON.stringify({
        success: false,
        message: error
      }));
    }
  }

  // Update a specific product
  else if (req.url.match(/api\/products\/([0-9])/) && req.method === 'PUT') {
    try {
      const productId = req.url.split('/')[3];

      let body = await getRequestData(req);

      const response = await productsService.updateProduct(productId, JSON.parse(body), done);

      res.writeHead(response.code, {
        'content-type': 'application-json'
      });

      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500, {
        'content-type': 'application-json'
      });

      res.end(JSON.stringify({
        success: false,
        message: error
      }))
    }
  }

  // Delete a specific Product
  else if (req.url.match(/api\/products\/([0-9])/) && req.method === 'DELETE') {
    try {
      const productId = req.url.split('/')[3];

      const response = await productsService.deleteProduct(productId, done);

      res.writeHead(response.code, {
        'content-type': 'application-json'
      });

      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500, {
        'content-type': 'application-json'
      });

      res.end(JSON.stringify({
        success: false,
        message: error
      }))
    }
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})