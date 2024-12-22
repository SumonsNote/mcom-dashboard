export function isProductIdInArray(products, id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return true; // Found the ID in the array
    }
  }
  return false; // ID not found in the array
}
