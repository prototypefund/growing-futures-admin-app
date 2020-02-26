import { sumUpInventory, filterForProduct, aggregateAll} from '@/utils/inventory/inventory.js'

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
                            'date': new Date().valueOf(), 
                            'amount': 33,
                            'unit': 'g',
                            'type': 'harvest'
                          }, 
                          { 
                            'product': 'product01',
                            'user': 'user0', 
                            'date': new Date().valueOf(), 
                            'amount': 22,
                            'unit': 'p',
                            'type': 'harvest'
                          }, 
                          { 
                            'product': 'product01',
                            'user': 'user0', 
                            'date': new Date().valueOf(), 
                            'amount': -12,
                            'unit': 'p',
                            'type': 'harvest'
                          },
                          {
                            'product': 'product01',
                            'user': 'user1', 
                            'date': new Date().valueOf(), 
                            'amount': -33,
                            'unit': 'g',
                            'type': 'delivery'
                          },
                          {
                            'product': 'product01',
                            'user': 'user2', 
                            'date': new Date().valueOf(), 
                            'amount': -12,
                            'unit': 'g',
                            'type': 'reconcilation'
                          },
                          {
                            'product': 'product02',
                            'user': 'user2', 
                            'date': new Date().valueOf(), 
                            'amount': 12,
                            'unit': 'g',
                            'type': 'harvest'
                          }

                        ]


describe('should filter the history for a given product', () => {
  let product = {"name":  "product01"}
  let filtered = filterForProduct(product, inventoryAtoms)
  
  it('should return six elements', () => {
    expect(filtered).toHaveLength(6)
  })
})

describe('should aggregate the history for all products', () => {
  let aggregated = aggregateAll(inventoryAtoms)
  let product01 = aggregated.product01
  let product02 = aggregated.product02
  
  it('should return the correct count of elements', () => {
    expect(product01).toHaveLength(6)
    expect(product02).toHaveLength(1)
  })
})

describe('should sum up inventoryItems ', () => {
  let items = [{ "unit": "g", "value": 33 }, {"unit": "g", "value": -12}, {"unit": "p", "value": 13 }, {"unit": "p", "value": 28}]
  let sum = sumUpInventory(items)
  let weight = sum.find(s => s.unit == "g")
  let pieces = sum.find(s => s.unit == "p")
  it('should return four elements', () => {
    expect(weight.value).toEqual(21)
    expect(pieces.value).toEqual(41)
  })
})

