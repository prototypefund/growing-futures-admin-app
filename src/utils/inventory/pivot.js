/* eslint-disable */

export function pivotize(inventoryAtoms, keys, aggregateFunction, leafFunction){
  let key = keys.shift()
  let pivot = createPivot(key, inventoryAtoms)

  //recursion until leafs are reached
  if (keys.length > 0){
    function setNewSegments(seg){
      seg.pivot = pivotize(seg.items, [...keys], aggregateFunction, leafFunction)
    }
    pivot.segments.forEach(seg => setNewSegments(seg))
  }

  // aggregate if we are at leafs
  if (keys.length == 0)
    aggregateLeafs(pivot.segments, leafFunction)
    
  // aggregate from leafs upwards
  let flatValues = pivot.segments.reduce((r,a) => r.concat(a.pivot.value), [])
  pivot.value = aggregateFunction(flatValues)
    
  return pivot 
}

function createPivot(key, items){
  return {"key": key,
    "segments": items.reduce((r, i) => {
    let agg = r.find(e => e.key == i[key])
    if (!agg){
      agg = {'key': i[key], items: []}
      r.push(agg)
    }
    agg.items.push(i)
    return r 
  }, [])}
}

function aggregateLeafs(segments, leafFunction){
  segments.forEach(seg => { 
    if (! seg.pivot){
      seg.pivot = {}
    }
    seg.pivot.value = leafFunction(seg.items)
  })
}


export function getPivot(pivot, keys) {
  return getRecursively({'pivot': pivot}, keys)
}

function getRecursively(parentSegment, keys){
  let key = keys.shift()
  let pivot = parentSegment.pivot

  if (key){
    let segment = pivot.segments.find(a => a.key == key)
    if (!segment) {
      return {}
    }
    return getRecursively(segment, [...keys])
  } else {
    return parentSegment
  }
}
