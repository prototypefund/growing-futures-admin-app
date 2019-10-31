import { loadData, loadForSpec } from '@/utils/DataLoader.js'
import specs from '@/data/dataSchemes.json'

describe('should return an empty speclist for each spec', () => {
  var res = loadData(specs)
  it('should return four elements', () => {
    expect(res).toHaveLength(4)
  })
})

describe('should return content for a certain spec', () => {
  var res = loadForSpec({"schemaName": "depots"})
  it('should return four elements', () => {
    expect(res.name).toEqual("depots")
    expect(res.data).toHaveLength(2)
  })
})
