const express = require('express');
const app = express();
const path = require('path');

// tempOrders
const orders = [];

function generateOrders() {
  setInterval(function () {
    const side = parseInt(Math.random() * 10) % 2 ? 'ask' : 'bid';
    const price = (50.0 + Math.random() * 180).toFixed(1);
    const quantity = Math.floor(Math.random() * (15 + 1));
    const time = new Date().getTime();
    const obj = {
      number: orders.length + 1,
      side,
      price,
      quantity,
      time,
    };

    orders.push(obj);
  }, 1000);
}

generateOrders();
// static router

app.use('/example', function (req, res) {
  res.sendFile(path.join(__dirname + '/static/example.html'));
});

// Get Orders List
app.use('/api/getOrders', function (req, res) {
  const start = req.query.start || (orders.length - 20 < 0 ? 0 : orders.length - 20);
  const size = req.query.size || 20;

  if (start < 0 || size < 1) {
    res.send('request params error');
    return;
  }
  const end = start + size;
  res.json(orders.slice(start, end));
});

// reset Orders
app.use('/api/reset', function (req, res) {
  orders = [];
  res.send('Orders has reseted');
});

app.listen(8080, function () {
  console.log('Start Fe Interview Service on 8080');
});
