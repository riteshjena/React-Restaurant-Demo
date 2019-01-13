function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function formatCuisines(cuisines) {
  const cuisinesArray = cuisines.split(' ');

  for (let i=0; i<cuisinesArray.length; i++) {
    cuisinesArray[i] = formatName(cuisinesArray[i]);
  }

  return cuisinesArray.join(', ');
}

module.exports = {
  formatName,
  formatCuisines,
}
