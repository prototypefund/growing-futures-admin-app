import { calculateSharesPerDepot, calculateShares } from '@/utils/shareTypeUtils.js'
const util = require('util')

import users from './data/users.json'

describe('should create correct number of shares per shareType', () => {
  let shares = calculateShares(users)
  let share1 = shares.find(s => s.type == 'shareType0001')
  let share2 = shares.find(s => s.type == 'shareType0002')
  it('should find the item by path', () => {
    expect(share1.shares).toEqual(3)
    expect(share2.shares).toEqual(2)
  })
})


describe('should create correct aggregation for shares per depot', () => {
  let shares = calculateSharesPerDepot(users)
  let depot1 = shares.find(s => s.depot == 'depot-703bf6ca-e81c-48bb-b4fb-65f15e3f0f96')
  let depot1share1 = depot1.shares.find(s => s.type == 'shareType0001')
  let depot1share2 = depot1.shares.find(s => s.type == 'shareType0002')
  let depot2 = shares.find(s => s.depot == 'depot-68410d19-ddde-487c-b201-07547bb49b8a')
  let depot2share1 = depot2.shares.find(s => s.type == 'shareType0001')
  let depot2share2 = depot2.shares.find(s => s.type == 'shareType0002')
  it('should sort to correct depots', () => {
    expect(depot1share1.shares).toEqual(2)
    expect(depot1share2.shares).toEqual(1)
    expect(depot2share1.shares).toEqual(1)
    expect(depot2share2.shares).toEqual(1)
  })
})
