export default function getFilteredResponse(filters, data) {
  const brandsFilters = getFiltersFromType('brand', filters)
  const categoriesFilters = getFiltersFromType('category', filters)

  if (brandsFilters.length === 0 && categoriesFilters.length !== 0) {
    return data.filter(product => {
      return categoriesFilters.some(filter => filter.value.replace('category=', '').toLowerCase() === product.category.replace(' ', '_').toLowerCase()) ? product : null
    })
  } else if (categoriesFilters.length === 0 && brandsFilters.length !== 0) {
    return data.filter(product => {
      return brandsFilters.some(filter => filter.value.replace('brand=', '').toLowerCase() === product.brand.replace(' ', '_').toLowerCase()) ? product : null
    })
  } else if (categoriesFilters.length !== 0 && brandsFilters.length !== 0){
    const dataFilteredCategories = data.filter(product => {
      return categoriesFilters.some(filter => filter.value.replace('category=', '').toLowerCase() === product.category.replace(' ', '_').toLowerCase()) ? product : null
    })
    return dataFilteredCategories.filter(product => {
      return brandsFilters.some(filter => filter.value.replace('brand=', '').toLowerCase() === product.brand.replace(' ', '_').toLowerCase()) ? product : null
    })
  }
}

function getFiltersFromType(typeName, filters) {
  return filters.filter(filter => {
    if (filter.value.split('=')[0] === typeName) {
      return filter
    }
  })

}
