// hooks/useFilterProducts.js
export const useFilterProducts = (products, query, filters, activeFilter) => {
  return products
    .filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter((product) => {
      const { category, format, price } = filters;
      const isCategory = category.length === 0 || category.includes(product.category);
      const isFormat = format.length === 0 || format.includes(product.format);
      const isPrice =
        price.length === 0 ||
        (price.includes("Gratis") && product.price === 0) ||
        (price.includes("Berbayar") && product.price > 0);
      return isCategory && isFormat && isPrice;
    })
    .filter((product) => {
      if (activeFilter === "Populer") return product.isPopular;
      if (activeFilter === "Recommended") return product.isRecommended;
      return true;
    })
    .sort((a, b) => {
      if (activeFilter === "Terbaru") {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      }
      return 0;
    });
};
