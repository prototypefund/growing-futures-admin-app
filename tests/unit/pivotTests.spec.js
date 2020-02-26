import { sumUpInventory, createInventorySum} from '@/utils/inventory/inventory.js'
import { pivotize, getPivot } from '@/utils/inventory/pivot.js'
//const util = require('util')

var inventoryAtoms = [
                          { 
                            'product': 'product01',
                            'user': 'user0', 
                            'date': 1575027146,
                            'amount': 50,
                            'unit': 'g',
                            'type': 'harvest'
                          }, 
                          { 
                            'product': 'product01',
                            'user': 'user0', 
                            'date': 1575544930028,
                            'amount': 33,
                            'unit': 'g',
                            'type': 'harvest'
                          }, 
                          { 
                            'product': 'product01',
                            'user': 'user0', 
                            'date': 1575544930029,
                            'amount': 22,
                            'unit': 'p',
                            'type': 'harvest'
                          }, 
                          { 
                            'product': 'product01',
                            'user': 'user0', 
                            'date': 1575544930026,
                            'amount': -12,
                            'unit': 'p',
                            'type': 'harvest'
                          },
                          {
                            'product': 'product01',
                            'user': 'user1', 
                            'date': 1575544930027,
                            'amount': -33,
                            'unit': 'g',
                            'type': 'delivery'
                          },
                          {
                            'product': 'product01',
                            'user': 'user2', 
                            'date': 1575544930027,
                            'amount': -12,
                            'unit': 'g',
                            'type': 'reconcilation'
                          },
                          {
                            'product': 'product02',
                            'user': 'user2', 
                            'date': 1575544930027,
                            'amount': 12,
                            'unit': 'g',
                            'type': 'harvest'
                          }

                        ]


describe('should return all for empty query', () => {
  let pivot = pivotize(inventoryAtoms, ['product', 'user', 'unit'], sumUpInventory, createInventorySum)
  let data = getPivot(pivot, [])
  let data2 = getPivot(data.pivot, ['product01', 'user0', 'g'])
  it('should find the item by path', () => {
    expect(data).toBeDefined()
    expect(data.items).toBeUndefined()
    expect(data2.pivot).toEqual({ value: [ { unit: 'g', value: 83 } ] })
  })
})

describe('should work with mixed Objects', () => {
  let pivot = pivotize(inventoryAtoms, ['product', 'user', 'date'], sumUpInventory, createInventorySum)
  let data = getPivot(pivot, ['product02', 'user2', 1575544930027])
  it('should find the item by path', () => {
    expect(data.items).toHaveLength(1)
    expect(data.pivot).toEqual({ value: [ { unit: 'g', value: 12 } ] })
  })
})

describe('should return empty for impossible query', () => {
  let pivot = pivotize(inventoryAtoms, ['product', 'user', 'unit'], sumUpInventory, createInventorySum)
  let data = getPivot(pivot, ['base'])
  it('should find the item by path', () => {
    expect(data).toBeDefined()
    expect(data.items).toBeUndefined()
    expect(data).toEqual({})
  })
})

describe('should return correct path for pivot query', () => {
  let pivot = pivotize(inventoryAtoms, ['product', 'user', 'unit'], sumUpInventory, createInventorySum)
  let data = getPivot(pivot, ['product01', 'user0', 'g'])
  it('should find the item by path', () => {
    expect(data.items).toHaveLength(2)
    expect(data.pivot).toEqual({ value: [ { unit: 'g', value: 83 } ] })
  })
})

describe('should create nested pivot for a datastructure', () => {
  let pivot = pivotize(inventoryAtoms, ['product'], sumUpInventory, createInventorySum)
  let product01 = pivot.segments.find(a => a.key == 'product01')
  let product02 = pivot.segments.find(a => a.key == 'product02')
  
  it('should return the correct sums', () => {
    expect(product01.pivot.value.find(v => v.unit =='g').value).toEqual(38)
    expect(product01.pivot.value.find(v => v.unit =='p').value).toEqual(10)
    expect(product02.pivot.value.find(v => v.unit =='g').value).toEqual(12)
    expect(product02.pivot.value.find(v => v.unit =='p')).toBeUndefined()
  })
})
