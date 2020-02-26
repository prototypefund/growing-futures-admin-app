import { getAmountsPerDepot, getDeliveryForType, calculateProductAmount, calculateAmount} from '@/utils/deliveries.js'
const util = require('util')

import users from './data/users.json'
import deliveryNew from './data/delivery/deliveryNew.json'
import deliveryDefined from './data/delivery/deliveryDefined.json'
import deliveryConfigured from './data/delivery/deliveryConfigured.json'

describe('depots should be filled correctly', () => {
  
  it('should find the item by path', () => {
    let amounts = getAmountsPerDepot(deliveryConfigured)
    let depot0001 = amounts.find(a => a.depot == 'depot0001')
    let depot0002 = amounts.find(a => a.depot == 'depot0002')

    let expected1 =  [{ product: 'product0047', amount: 4, unit: "p" },
                      { product: 'product0033', amount: 8, unit: "p" },
                      { product: 'product0034', amount: 5, unit: "w" },
                      { product: 'product0054', amount: 12, unit: "b" } ] 

    let expected2 = [{ product: 'product0047', amount: 3, unit: "p" },
                     { product: 'product0033', amount: 5, unit: "p" },
                     { product: 'product0034', amount: 3, unit: "w" },
                     { product: 'product0054', amount: 7, unit: "b" } ]

    expect(depot0001.products).toEqual(expected1)
    expect(depot0002.products).toEqual(expected2)
  })
})

describe('product calculation should work', () => {
  let plannedProduct = {
    "buffer": 0,
    "planned": {
      "shareType0001": 1,
      "shareType0002": 2
    },
    "uid": "product0047",
    "unit": "p"
  }
  
  let depots = [
    {
        "depot": "depot0001",
        "shares": [
            {
                "shares": 2,
                "type": "shareType0001"
            },
            {
                "shares": 1,
                "type": "shareType0002"
            }
        ]
    },
    {
        "depot": "depot0002",
        "shares": [
            {
                "shares": 1,
                "type": "shareType0001"
            },
            {
                "shares": 1,
                "type": "shareType0002"
            }
        ]
    }
]

  
  it('should find the item by path', () => {
    let amount = calculateProductAmount(depots, plannedProduct)
    let depot1 = amount.find(a => a.depot == "depot0001")
    let depot2 = amount.find(a => a.depot == "depot0002")

    expect(depot1.amount).toEqual(4)
    expect(depot1.unit).toEqual("p")
    expect(depot2.amount).toEqual(3)
    expect(depot2.unit).toEqual("p")
  })
})


describe('product calculation should work', () => {
  let plannedProduct = {
    "buffer": 0,
    "planned": {
      "shareType0001": 1,
      "shareType0002": 2
    },
    "uid": "product0047",
    "unit": "p"
  }
  
  let shares = [{
                "shares": 2,
                "type": "shareType0001" }, 
               {"shares": 1,
                "type": "shareType0002"}]

  
  it('calculate', () => {
    let amount = calculateAmount(shares, plannedProduct)
    expect(amount).toEqual(4)
  })
})

describe('users should get the correct delivery', () => {
  
  it('should calculate the delivery', () => {
    let deliveryForShare = getDeliveryForType("shareType0002", deliveryConfigured.products)

    let expectedDelivery = [ { uid: 'product0047', amount: 2, unit: "p", note: "some note" },
                             { uid: 'product0033', amount: 2, unit: "p", note: "" },
                             { uid: 'product0034', amount: 1, unit: "w", note: "" },
                             { uid: 'product0054', amount: 2, unit: "b", note: "" } ]

    expect(deliveryForShare).toEqual(expectedDelivery)
  })
})
