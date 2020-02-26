import { suggestProductAmountByPieces, suggestProductAmountByWeight, calculateProductAmountByPieces, calculateProductAmountByWeight, sumUpShareParts, aggregateDemand, calculatePreferences, calculateFoodies, splitByWeight } from '@/utils/share-calculation.js'
const util = require('util')

describe('should calculate the correct amount of foodies', () => {
  it('should find the item by path', () => {
    let household = {adults:2, children:1}
    let foodies = calculateFoodies(household)
    expect(foodies).toEqual(2.66)
  })
})

describe('should determine the amount a user wants for a product', () => {
  it('should return the correct preference if set', () => {
    let user = {uid:"user1", household: {adults:2, children:1}, preferences: [{product: 'product0047', value: 3}]}
    let product = { uid: 'product0047', availableAmount: 16, unit: "w", maxAmount:2 }
    let amount = calculatePreferences(user, product)
    expect(amount).toEqual(3)
  })
  it('should return average liking if nothing is set', () => {
    let user = {uid:"user1", household: {adults:2, children:1}, preferences: [{product: 'product0048', value: 3}]}
    let product = { uid: 'product0047', availableAmount: 16, unit: "w", maxAmount:2 }
    let amount = calculatePreferences(user, product)
    expect(amount).toEqual(2)
  })
})

describe('split available amounts correctly by weight', () => {
  it('should find the item by path', () => {
    let product =  { uid: 'product0047', availableAmount: 16, unit: "w", maxAmount:2 }
    let users = [{uid:"user1", household: {adults:1, children:1}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user2", household: {adults:2, children:0}, preferences: [{product: 'product0047', value: 2}]},
                 {uid:"user3", household: {adults:2, children:4}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 0}]}]
    let demand = aggregateDemand(product, users)
    let u1 = demand.find(u => u.user == 'user1')
    let u2 = demand.find(u => u.user == 'user2')
    let u3 = demand.find(u => u.user == 'user3')
    let u4 = demand.find(u => u.user == 'user4')

    expect(u1.product == 'product0047')
    expect(u2.product == 'product0047')
    expect(u3.product == 'product0047')
    expect(u4.product == 'product0047')

    expect(u1.foodies).toEqual(1.66)
    expect(u2.foodies).toEqual(2)
    expect(u3.foodies).toEqual(4.64)
    expect(u4.foodies).toEqual(1)

    expect(u1.amountPerFoodie).toEqual(3)
    expect(u2.amountPerFoodie).toEqual(2)
    expect(u3.amountPerFoodie).toEqual(1)
    expect(u4.amountPerFoodie).toEqual(0)

    expect(u1.sharePart).toEqual(4.98)
    expect(u2.sharePart).toEqual(4)
    expect(u3.sharePart).toEqual(4.64)
    expect(u4.sharePart).toEqual(0)
  })

  it('should find the item by path', () => {
    let product =  { uid: 'product0047', availableAmount: 16, unit: "w", maxAmount:2 }
    let users = [{uid:"user1", household: {adults:1, children:1}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user2", household: {adults:2, children:0}, preferences: [{product: 'product0047', value: 2}]},
                 {uid:"user3", household: {adults:2, children:4}, preferences: [{product: 'product0049', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0048', value: 0}]}]
    let demand = aggregateDemand(product, users)
    let u1 = demand.find(u => u.user == 'user1')
    let u2 = demand.find(u => u.user == 'user2')
    let u3 = demand.find(u => u.user == 'user3')
    let u4 = demand.find(u => u.user == 'user4')

    expect(u1.foodies).toEqual(1.66)
    expect(u2.foodies).toEqual(2)

    expect(u3.foodies).toEqual(4.64)
    expect(u4.foodies).toEqual(1)

    expect(u1.amountPerFoodie).toEqual(3)
    expect(u2.amountPerFoodie).toEqual(2)
    expect(u3.amountPerFoodie).toEqual(2)
    expect(u4.amountPerFoodie).toEqual(2)

    expect(u1.sharePart).toEqual(4.98)
    expect(u2.sharePart).toEqual(4)
    expect(u3.sharePart).toEqual(9.28)
    expect(u4.sharePart).toEqual(2)
  })
})

describe('share parts have to be summed', () => {
  it('sum up all share parts for a given product', () => {
    let product =  { uid: 'product0047', availableAmount: 16, buffer:0.1, unit: "w", smallPortion: 4, maxPortion:12 , internalCost: 1.8}
    let users = [{uid:"user1", household: {adults:1, children:1}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user2", household: {adults:2, children:0}, preferences: [{product: 'product0047', value: 2}]},
                 {uid:"user3", household: {adults:2, children:4}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 0}]}]
    let demand = aggregateDemand(product, users)
    let sharePartSum = sumUpShareParts(demand)
    expect(sharePartSum).toEqual(13.62)
  })
})


describe('product amount should be summed up', () => {
  it('sum up all product amounts for a given product', () => {
    let product =  { uid: 'product0047', availableAmount: 16, buffer:0.1, unit: "w", smallPortion: 4, maxPortion:12 , internalCost: 1.8}
    let users = [{uid:"user1", household: {adults:1, children:1}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user2", household: {adults:2, children:0}, preferences: [{product: 'product0047', value: 2}]},
                 {uid:"user3", household: {adults:2, children:4}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 0}]}]

    let demand = calculateProductAmountByWeight(product, users)
    
    let u1 = demand.find(u => u.user == 'user1')
    let u2 = demand.find(u => u.user == 'user2')
    let u3 = demand.find(u => u.user == 'user3')
    let u4 = demand.find(u => u.user == 'user4')

    expect(u1.productAmount).toEqual(5.26)
    expect(u2.productAmount).toEqual(4.22)
    expect(u3.productAmount).toEqual(4.90)
    expect(u4.productAmount).toEqual(0)
  })
})

describe('ensure the calculation by weight ist done properly', () => {
  it('', () => {
    let product =  { uid: 'product0047', availableAmount: 16, buffer:0.1, unit: "p", smallPortion: 4, maxPortion:12 , internalCost: 1.8}
    let users = [{uid:"user1", household: {adults:1, children:1}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user2", household: {adults:2, children:0}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user3", household: {adults:2, children:4}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 0}]}]

    let demand = calculateProductAmountByPieces(product, users)
    
    let u1 = demand.find(u => u.user == 'user1')
    let u2 = demand.find(u => u.user == 'user2')
    let u3 = demand.find(u => u.user == 'user3')
    let u4 = demand.find(u => u.user == 'user4')

    expect(u1.productAmount).toEqual(2)
    expect(u2.productAmount).toEqual(8)
    expect(u3.productAmount).toEqual(6)
    expect(u4.productAmount).toEqual(0)
  })

  it('if buffer ist too large, give it to the people with the fairest amount', () => {
    let product =  { uid: 'product0047', availableAmount: 7, buffer:0.1, unit: "p", smallPortion: 4, maxPortion:12 , internalCost: 1.8}
    let users = [{uid:"user1", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user2", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user3", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 0}]}]

    let demand = calculateProductAmountByPieces(product, users)
    
    let u1 = demand.find(u => u.user == 'user1')
    let u2 = demand.find(u => u.user == 'user2')
    let u3 = demand.find(u => u.user == 'user3')
    let u4 = demand.find(u => u.user == 'user4')

    // user1 is getting more because found first with fairest share
    expect(u1.productAmount).toEqual(2)
    expect(u2.productAmount).toEqual(4)
    expect(u3.productAmount).toEqual(1)
    expect(u4.productAmount).toEqual(0)
  })

})


describe('should make realistic suggestions for a product to harvest', () => {
  it('', () => {
    let product =  { uid: 'product0047', availableAmount: 0, buffer:0.1, unit: "p", smallPortion: 0.4, maxPortion: 1.2 , internalCost: 1.8}
    let users = [{uid:"user1", household: {adults:1, children:1}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user2", household: {adults:2, children:0}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user3", household: {adults:2, children:4}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 0}]}]

    let proposedShare = suggestProductAmountByWeight(product, users)
    expect(proposedShare.total).toEqual(5.41)
    let suggestions = proposedShare.suggestions
    
    let u1 = suggestions.find(u => u.user == 'user1')
    let u2 = suggestions.find(u => u.user == 'user2')
    let u3 = suggestions.find(u => u.user == 'user3')
    let u4 = suggestions.find(u => u.user == 'user4')

    expect(u1.productAmount).toEqual(0.66)
    expect(u2.productAmount).toEqual(2.4)
    expect(u3.productAmount).toEqual(1.85)
    expect(u4.productAmount).toEqual(0)
  })
})


describe('should make realistic suggestions for a product to harvest by pieces', () => {
  it('', () => {
    let product =  { uid: 'product0047', availableAmount: 0, buffer:0.1, unit: "p", smallPortion: 1, maxPortion: 1.2 , internalCost: 1.8}
    let users = [{uid:"user1", household: {adults:1, children:1}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user2", household: {adults:2, children:0}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user3", household: {adults:2, children:4}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 0}]}]

    let proposedShare = suggestProductAmountByPieces(product, users)
    console.log(proposedShare)
    expect(proposedShare.total).toEqual(13)
    let suggestions = proposedShare.suggestions
    
    let u1 = suggestions.find(u => u.user == 'user1')
    let u2 = suggestions.find(u => u.user == 'user2')
    let u3 = suggestions.find(u => u.user == 'user3')
    let u4 = suggestions.find(u => u.user == 'user4')

    expect(u1.productAmount).toEqual(2)
    expect(u2.productAmount).toEqual(6)
    expect(u3.productAmount).toEqual(5)
    expect(u4.productAmount).toEqual(0)
  })
})


describe('should make realistic suggestions for a product to harvest by pieces', () => {
  it('', () => {
    let product =  { uid: 'product0047', availableAmount: 0, buffer:0.1, unit: "p", smallPortion: 1, maxPortion: 1.2 , internalCost: 1.8}
    let users = [{uid:"user1", household: {adults:1, children:1}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user2", household: {adults:2, children:0}, preferences: [{product: 'product0047', value: 3}]},
                 {uid:"user3", household: {adults:2, children:4}, preferences: [{product: 'product0047', value: 1}]},
                 {uid:"user4", household: {adults:1, children:0}, preferences: [{product: 'product0047', value: 0}]}]

    let proposedShare = suggestProductAmountByPieces(product, users)
    console.log(proposedShare)
    expect(proposedShare.total).toEqual(13)
    let suggestions = proposedShare.suggestions
    
    let u1 = suggestions.find(u => u.user == 'user1')
    let u2 = suggestions.find(u => u.user == 'user2')
    let u3 = suggestions.find(u => u.user == 'user3')
    let u4 = suggestions.find(u => u.user == 'user4')

    expect(u1.productAmount).toEqual(2)
    expect(u2.productAmount).toEqual(6)
    expect(u3.productAmount).toEqual(5)
    expect(u4.productAmount).toEqual(0)
  })
})
