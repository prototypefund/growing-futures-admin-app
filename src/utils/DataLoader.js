import { getData } from '@/services/data-service.js'

export function loadData(listOfSpecs) {
  return listOfSpecs.map(spec => loadForSpec(spec))
}

export function loadForSpec(spec) {
  let data = {
    "name": null,
    "data": []
  }
  data.name = spec.schemaName 
  let items = getData(spec)
  items.forEach(i => data.data.push(i))
  return data
}
