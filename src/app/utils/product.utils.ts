import { Product } from '../models/product.model';

export function productMatchesSearch(
  product: Product,
  term: string
): boolean {
  const normalizedTerm = term.toLowerCase().trim();

  return (
    product.name.toLowerCase().includes(normalizedTerm) ||
    product.description.toLowerCase().includes(normalizedTerm)
  );
}

export function productMatchesCategory(
  product: Product,
  category: string
): boolean {
  return (
    category === 'Todos' ||
    product.category === category
  );
}

export function productMatchesPrice(
  product: Product,
  priceRange: string
): boolean {
  if (priceRange === 'Todos') {
    return true;
  }

  if (priceRange === 'Menos de ₡30,000') {
    return product.price < 30000;
  }

  if (priceRange === '₡30,000 - ₡60,000') {
    return (
      product.price >= 30000 &&
      product.price <= 60000
    );
  }

  if (priceRange === '₡60,000 - ₡150,000') {
    return (
      product.price > 60000 &&
      product.price <= 150000
    );
  }

  if (priceRange === 'Más de ₡150,000') {
    return product.price > 150000;
  }

  return true;
}

export function sortProducts(
  products: Product[],
  sort: string
): Product[] {
  const sortedProducts = [...products];

  if (sort === 'price-asc') {
    sortedProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === 'price-desc') {
    sortedProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === 'name-asc') {
    sortedProducts.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }

  if (sort === 'name-desc') {
    sortedProducts.sort(
      (a, b) => b.name.localeCompare(a.name)
    );
  }

  return sortedProducts;
}

export function filterAndSortProducts(
  products: Product[],
  term: string,
  category: string,
  priceRange: string,
  sort: string
): Product[] {
  const filteredProducts = products.filter(product => {
    return (
      productMatchesSearch(product, term) &&
      productMatchesCategory(product, category) &&
      productMatchesPrice(product, priceRange)
    );
  });

  return sortProducts(filteredProducts, sort);
}

