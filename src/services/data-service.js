import products from '@/data/mock-data/products.json'
import shareTypes from '@/data/mock-data/shareTypes.json'
import depots from '@/data/mock-data/depots.json'
import users from '@/data/mock-data/users.json'
import categories from '@/data/mock-data/categories.json'

export async function getData(spec){
  console.log("Loading data for schema " + spec.schemaName)
  if (spec.schema) {
    let url = process.env.VUE_APP_SCHEMA_API_ROOT + "/mock-data/" + spec.schemaName + ".json"
    let ret = await fetch(url, {headers: { "Accept": "application/json" },
                credentials: 'omit', 
                mode: 'cors'})
    let json =  await ret.json()
    console.dir(json)
    return json
    }
  return []
}
