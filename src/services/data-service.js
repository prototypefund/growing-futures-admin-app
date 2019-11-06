export async function getData(spec){
  console.log("Loading data for schema " + spec.schemaName)
  if (spec.schemaName) {
    let url = process.env.VUE_APP_SCHEMA_API_ROOT + "/mock-data/" + spec.schemaName + ".json"
    let ret = await fetch(url, {headers: { "Accept": "application/json" },
                credentials: 'omit', 
                mode: 'cors'})
    let json =  await ret.json()
    return json
    }
  return []
}
