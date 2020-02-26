import { pivotize } from '@/utils/inventory/pivot.js'

export function pivotizeInventory(inventoryAtoms, pivotKeys){
  return pivotize(inventoryAtoms, pivotKeys, sumUpInventory, createInventorySum)
}

export function filterForProduct(product, inventoryAtoms){
  return inventoryAtoms.filter(a => a.product == product.name)
}

export function aggregateAll(inventoryAtoms) {
  return inventoryAtoms.reduce((r, i) => {
    if (!r[i.product]){
      r[i.product] = []
    } 
    r[i.product].push(i)
    return r
  }, {})
}

export function createInventorySum(inventoryAtoms) {
  return inventoryAtoms.reduce((r, i) => {
    let elt = r.find(e => e.unit == i.unit)
    if (!elt ){
      r.push({"unit": i.unit, "value": i.amount})
    }
    else {
      elt.value += i.amount
    }

    return r
  }, [])
}

export function createInventory(inventoryAtoms) {
  return inventoryAtoms.reduce((r, i) => {
    if (!r[i.product]){
      r[i.product] = {}
    }

    if (!r[i.product][i.unit]){
      r[i.product][i.unit] = 0
    }

    r[i.product][i.unit] += i.amount

    return r
  }, {})

}

export function sumUpInventory(inventoryItems){
  return inventoryItems.reduce((r, i) => {
    let elt = r.find(e => e.unit == i.unit)
    if (!elt) {
      elt = {
        "unit":  i.unit,
        "value": i.value
      }
      r.push(elt)
    } else {
      elt.value += i.value
    }

    return r
  }, [])
}
