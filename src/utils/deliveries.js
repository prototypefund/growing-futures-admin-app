import { calculateSharesPerDepot } from '@/utils/shareTypeUtils.js'

export function getAmountsPerDepot(delivery) {
  let sharesPerDepot = calculateSharesPerDepot(delivery.users)
  let amountsPerDepot = delivery.products
          .map(product => calculateProductAmount(sharesPerDepot, product))
          
  return amountsPerDepot.reduce((r, i) => {
            i.forEach(e => {
              let found = r.find(a => a.depot == e.depot)
              if (!found){
                found = {depot:  e.depot,
                         products: []}
                r.push(found)
              }
             found.products.push({"product": e.product,
                                  "amount": e.amount,
                                  "unit": e.unit})
            })
            return r
          }, [])
}

export function getDeliveryForType(type, products) {
  return products.map(product => {
    return {"uid": product.uid, 
            "amount": planned(product, type),
            "unit": product.unit,
            "note": note(product, type)}
  })
}


function planned(product, type){
  if (product.planned && product.planned[type])
  {
    return product.planned[type]
  }
  return 0
}

function note(product, type){
  if (product.note && product.note[type])
  {
    return product.note[type]
  }
  return "" 
}

export function calculateProductAmount(sharesPerDepot, plannedProduct){
  return sharesPerDepot.map(sharePerDepot => {
    return {"depot": sharePerDepot.depot,
            "product": plannedProduct.uid,
            "amount": calculateAmount(sharePerDepot.shares, plannedProduct),
            "unit": plannedProduct.unit
           }
  })
}

export function calculateAmount(shares, plannedProduct) {
  return shares.reduce((r, i) => r + i.shares * plannedProduct.planned[i.type], 0)
}

export function emptyDelivery(){
  return { 
    date: new Date(),
    name: "",
    status: "new",
    products: [],
    users: []
  }
}
