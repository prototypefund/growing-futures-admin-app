import products from '@/data/mock-data/products.json'
import shareTypes from '@/data/mock-data/shareTypes.json'
import depots from '@/data/mock-data/depots.json'
import users from '@/data/mock-data/users.json'

export function getData(spec){
  switch (spec.schemaName) {
    case 'products':
      return products
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
