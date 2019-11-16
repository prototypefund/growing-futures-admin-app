import axios from "axios"

export function buildBody(requestConfig) {
  let schemaName = requestConfig.schema.schemaName
  let item = requestConfig.item
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

export function getShares() {
  //return axios.get("http://172.16.3.99:8000/csa/demo")
  return fetchJson("http://172.16.3.99:8000/csa/demo")
}

export async function postJson(url, body){
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
  let response = await fetch(url, {headers: { "Accept": "application/json" },
                                   credentials: 'omit', 
                                   mode: 'cors'})
  let json = await response.json()
  return await Promise.resolve(json)
}
