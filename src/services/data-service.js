import products from '@/data/mock-data/products.json'
import shareTypes from '@/data/mock-data/shareTypes.json'
import depots from '@/data/mock-data/depots.json'
import users from '@/data/mock-data/users.json'
import categories from '@/data/mock-data/categories.json'

export function getData(spec){
  console.log("Loading data for schema " + spec.schemaName)
  switch (spec.schemaName) {
    case 'products':
      return products
    case 'category':
      return categories
    case 'shareTypes':
      return shareTypes
    case 'depots':
      return depots
    case 'users':
      return users
    default:
      return []
  }
}
