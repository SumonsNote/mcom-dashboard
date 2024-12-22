import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state) => state.products;
export const selectFilter = (state) => state.filter;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilter],
  (products, filter) => {
    return products
      .filter((product) =>
        filter.filter === "all"
          ? true
          : product.category?.toLowerCase() == filter.filter
      )
      .filter(
        (product) =>
          !filter.search ||
          product.title?.toLowerCase().includes(filter.search.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(filter.search.toLowerCase()) ||
          product.category?.toLowerCase().includes(filter.search.toLowerCase())
      )
      .sort((a, b) => {
        if (filter.sort === "priceasc") {
          return a.price - b.price;
        }
        if (filter.sort === "pricedesc") {
          return b.price - a.price;
        }
        if (filter.sort === "rating") {
          return b.rating - a.rating;
        }
        return 0;
      });
  }
);
