export function buildBody(requestConfig) {
  let schemaName = requestConfig.schema.schemaName
  let item = requestConfig.item
  console.dir(item, schemaName)
  return {"data": item, "schemaName": schemaName}
}
export async function getData(spec){
  console.log("Loading data for schema " + spec.schemaName)
  if (spec.schemaName) {
    let url = process.env.VUE_APP_SCHEMA_API_ROOT + "/retrieve" 
    let body = {"collection": spec.schemaName}
    return await postJson(url, body) 
    }
  return []
}

export async function postJson(url, body){
  console.dir(body)
  try {
    let response = await fetch(url, {headers: { "Accept": "application/json" },
      method: 'post',
      credentials: 'omit', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      mode: 'cors'})

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      let json =  await response.json()

      return await Promise.resolve(json)
    } catch (error) {

  }
}

export async function fetchJson(url){
  console.dir("loading")
  let response = await fetch(url, {headers: { "Accept": "application/json" },
                                   credentials: 'omit', 
                                   mode: 'cors'})
  let json = await response.json()
  return await Promise.resolve(json)
}
