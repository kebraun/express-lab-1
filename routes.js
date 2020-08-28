"use strict";
const express = require("express");
const routes = express.Router();

const cartItems = [
  { id: 1, product: "peach", price: 0, quantity: 2000000 },
  { id: 2, product: "Sonic the Hedgehog Blu-ray", price: 3000.0, quantity: 1 },
  { id: 3, product: "A single shoe", price: 32.0, quantity: 1 },
  { id: 4, product: "used coffee mug", price: 4.0, quantity: 1 },
  { id: 5, product: "Nintendo Switch", price: 300.0, quantity: 2 },
  { id: 6, product: "grandma-scented candle", price: 14.0, quantity: 16 },
];
let nextId = 7;

routes.get("/cart-items", (req, res) => {
  const maxPrice = parseInt(req.query.maxPrice);
  if (maxPrice) {
    const priceArray = cartItems.filter((item) => {
      return item.price <= maxPrice;
    });
    res.status(200);
    res.json(priceArray);
  } else if (req.query.prefix) {
    let prefixArray = cartItems.filter((item) => {
      let currentItem = item.product.toLowerCase();
      return currentItem.startsWith(req.query.prefix.toLowerCase());
    });
    res.status(200);
    res.json(prefixArray);
  } else if (req.query.pageSize) {
    let newArray = cartItems.slice(0, parseInt(req.query.pageSize));
    res.status(200);
    res.json(newArray);
  } else {
    res.status(200);
    res.json(cartItems);
  }
});

routes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = cartItems.find((item) => {
    return item.id === id;
  });
  if (found) {
    res.json(found);
  } else {
    res.status(404);
    res.send(`No item with id ${id} exists.`);
  }
});

routes.post("/cart-items", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  cartItems.push(item);

  res.status(201);
  res.json(item);
});

routes.put("/cart-items/:id", (req, res) => {
  const item = req.body;
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  if (index !== -1) {
    cartItems.splice(index, 1, item);
    item.id = index + 1;
  }
  res.status(200);
  res.json(item);
});

routes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.status(204);
  res.send();
});

module.exports = routes;
