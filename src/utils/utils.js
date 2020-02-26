export function generateUid(prefix) {
  let uuid = require("uuid");
  let id = uuid.v4();
  return prefix + "-" + id
}

export function resolveToName(refs, itemWithRef, prop) {
  let p = refs.find(p => itemWithRef[prop] == p.uid)
  let name = "error: could not resolve"
  if (p) {
    if (p.name) {
      name = p.name
    }
  }
  return name
}
