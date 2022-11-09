export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(url);
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = '';
  if (categoryId && !query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } if (!categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  } if (categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  }

  const request = await fetch(url);
  const response = await request.json();
  return response;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
