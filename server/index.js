const express = require('express');
const port = process.env.PORT || 3001;
const app = express();

const RestaurantService = require('./services/restaurantService');

app.listen(port, () => console.log(`Node Server running on port ${port}`));

app.get('/api', (req, res) => res.send({ message: 'Node Server Running' }));

app.get('/api/restaurants', (req, res) => {
  const restaurantsInfo = RestaurantService.getRestaurants(req.query.results);
  return res.send(restaurantsInfo);
});
