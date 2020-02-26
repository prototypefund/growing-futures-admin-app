// A-PRIORI BY WEIGHT
export function suggestProductAmountByWeight(product, users){
  let suggestions = aggregateDemand(product, users)
  let totalShares = sumUpShareParts(suggestions)
  let available = totalShares * product.smallPortion
  suggestions.forEach(a => {
    a.productAmount = floor2(available/totalShares * a.sharePart)
    a.internalCost = round2(a.productAmount * product.internalCost)
   })
  let proposedShare = {}
  proposedShare.suggestions = suggestions
  proposedShare.total = round2(available*(1+product.buffer))
  return proposedShare
}

// A-PRIORY BY PIECES
export function suggestProductAmountByPieces(product, users){
  let suggestions = aggregateDemand(product, users)
  let totalShares = ceil2(sumUpShareParts(suggestions))
  let available = totalShares * product.smallPortion
  suggestions.forEach(a => {
    a.exactProductAmount = available/totalShares * a.sharePart
    a.productAmount = Math.round(available/totalShares * a.sharePart)
    a.difference = a.productAmount - a.exactProductAmount
    a.internalCost = round2(a.productAmount * product.internalCost)
   })
  let proposedShare = {}
  proposedShare.suggestions = suggestions

  let summedProductAmount = sumUpProductAmount(suggestions)
  proposedShare.total = summedProductAmount
  return proposedShare
}



// A-POSTERIORI BY PIECES
export function calculateProductAmountByPieces(product, users){
  let aggregation = aggregateDemand(product, users)
  let totalShares = sumUpShareParts(aggregation)
  aggregation.forEach(a => {
    let available = product.availableAmount
    a.exactProductAmount = available/totalShares * a.sharePart
    a.productAmount = Math.round(available/totalShares * a.sharePart)
    a.difference = a.productAmount - a.exactProductAmount
    a.internalCost = round2(a.productAmount * product.internalCost)
  })

  return validateShares(product, aggregation)
}

export function validateShares(product, aggregation){
  let summedProductAmount = sumUpProductAmount(aggregation)
  let leftOvers = product.availableAmount - summedProductAmount 
  if (leftOvers >= 0){
    console.dir("Buffer: "  + leftOvers)
    if (leftOvers > product.buffer*product.availableAmount)
    {
      console.dir("Buffer too large: sharing stuff")
      return giveTheNeedy(aggregation, Math.abs(leftOvers), product)
    } else {
      console.dir("Buffer is okay, returning")
      return aggregation 
    }
  } else {
    // this should never happen as we are flooring the amount of product to
    // give to every person
    console.dir("Too many pieces shared " + Math.abs(leftOvers))
    robinHoodTheResult(aggregation, Math.abs(leftOvers), product)
    return aggregation
  }

}

export function giveTheNeedy(aggregation, amountToRedistribute, product){
  while (amountToRedistribute > product.buffer*product.availableAmount){
    let fairestShare = findFairestShare(aggregation)
    fairestShare.productAmount +=1
    fairestShare.difference = fairestShare.productAmount - fairestShare.exactProductAmount
    fairestShare.internalCost = round2(fairestShare.productAmount * product.internalCost)
    console.dir("giving one more of " + product.uid + " to " + fairestShare.user)
    let nextRedistribution = amountToRedistribute-1
    return giveTheNeedy(aggregation, nextRedistribution, product)
  }
  console.dir("enough sharing... long live open source communism!")
  return aggregation
}


export function robinHoodTheResult(aggregation, amountToRedistribute, product){
  console.dir(amountToRedistribute)
  while (amountToRedistribute > 0){
    let unfairestShare = findUnfairestShare(aggregation)
    console.log(unfairestShare.difference)
    unfairestShare.productAmount -=1
    unfairestShare.difference = unfairestShare.productAmount - unfairestShare.exactProductAmount
    unfairestShare.internalCost = round2(unfairestShare.productAmount * product.internalCost)
    let nextRedistribution = amountToRedistribute-1
    return robinHoodTheResult(aggregation, nextRedistribution)
  }
  return aggregation
}

export function findUnfairestShare(aggregation){
  aggregation.sort((a,b) => b.difference - a.difference)
  return aggregation[0]
}

export function findFairestShare(aggregation){
  aggregation.sort((a,b) => a.difference - b.difference)
  return aggregation[0]
}


// A-POSTERIORI BY WEIGHT
export function calculateProductAmountByWeight(product, users){
  let aggregation = aggregateDemand(product, users)
  let totalShares = sumUpShareParts(aggregation)
  aggregation.forEach(a => {
    let available = (1-product.buffer)*product.availableAmount
    a.productAmount = floor2(available/totalShares * a.sharePart)
    a.internalCost = round2(a.productAmount * product.internalCost)
  })
  return aggregation 
}


// UTILS
//

export function sumUpProductAmount(aggregation){
  return round2(aggregation.reduce((p,c) => p + c.productAmount, 0))
}

export function sumUpShareParts(aggregation){
  return round2(aggregation.reduce((p,c) => p + c.sharePart, 0))
}

export function calculateFoodies(household) {
  let rawFoodies = household.adults + 0.66*household.children
  return round2(rawFoodies)
}

export function aggregateDemand(product, users) {
  return users.map(u => { 
    let aggregation = {
             product: product.uid,
             user: u.uid,
             foodies: calculateFoodies(u.household), 
             amountPerFoodie: calculatePreferences(u, product)}
    let sharePart = aggregation.foodies * aggregation.amountPerFoodie
    sharePart = round2(sharePart)
    aggregation.sharePart = sharePart

    return aggregation
  })
}

export function calculatePreferences(u, product) {
  let preference = u.preferences.find(p => p.product == product.uid)
  if (preference)
    return preference.value
  // default is middle liking
  return 2
}

function round2(number){
  return Math.round((number+Number.EPSILON)*100)/100
}

function floor2(number){
  return Math.floor((number+Number.EPSILON)*100)/100
}

function ceil2(number){
  return Math.ceil((number+Number.EPSILON)*100)/100
}
