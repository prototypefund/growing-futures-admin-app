import { pivotize } from '@/utils/inventory/pivot.js'

function buildPivot(keys) {
  return function (users) {
    return pivotize(users, keys, l => l.reduce((r, i) => r+i, 0), l => l.length)
  }
}

export function calculateSharesPerDepot(users) {
  let shares =  buildPivot(['depot', 'shareType'])(users)

  return shares.segments.map(s => {
    return { depot: s.key,
             shares: getShares(s.pivot) }
  })
}

function getShares(pivot) {
   return pivot.segments.map(seg => buildShare(seg))
}

function buildShare(share) {
    return {
      type: share.key,
      shares: share.pivot.value
    }
}

export function calculateShares(users) {
  let pivot =  buildPivot(['shareType'])(users)
  return getShares(pivot)
}

