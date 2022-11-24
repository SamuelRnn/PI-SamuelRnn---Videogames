const getActiveFilters = (filters, excludedFilter) => {
  return Object.keys(filters).slice(1)
    .filter(key => key !== excludedFilter)
    .every(key => !filters[key])
};

export default getActiveFilters;