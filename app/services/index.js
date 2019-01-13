export async function getRestaurantsData(size) {
  const response = await fetch(`/api/restaurants?results=${size}`);
  const body = await response.json();
  return body;
}
