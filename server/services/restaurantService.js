const faker = require('faker');
const utils = require('../utils');

function getRestaurants(size){
  const restaurants = [];
  let keywords = [];

  for (let i=0; i<size; i++) {
    restaurants.push({
      name: utils.formatName(faker.lorem.word()),
      cuisines: utils.formatCuisines(faker.lorem.words()),
      image: faker.image.food(),
      rating: (Math.random() * (5.0 - 0.0) + 0.0).toFixed(1),
      deliveryTime: Math.floor(Math.random() * (60 - 20) + 20)
    });

    restaurants[i].keywords = restaurants[i].name.split(' ').concat(restaurants[i].cuisines.split(', '));

    keywords = keywords.concat(restaurants[i].keywords);
  }

  keywords = [...new Set(keywords)];
  keywords = keywords.map(keyword => ({ text: keyword, hidden: true }));

  return { restaurants, keywords };
}

module.exports = {
  getRestaurants,
}
