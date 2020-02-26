export function userCsvToJson(users) {
  let lines = users.split("\n")
  let jsonUsers = []
  for(var i=1;i<lines.length;i++){
    var obj = {};
    var currentline=lines[i].split(",");
    obj['name'] = currentline[0].trim()
    obj['firstName'] = currentline[1].trim()
    obj['depot']= currentline[2].trim()
    obj['eMail']= currentline[3].trim()
    obj['shareType']= currentline[4].trim()
    obj['username']= prepareForUsername(currentline[1]) + "." + prepareForUsername(currentline[0])
    jsonUsers.push(obj)
  }
  return jsonUsers
}

function prepareForUsername(value){
  value = value.trim()
  value = value.toLowerCase();
  value = value.replace(/ä/g, 'ae');
  value = value.replace(/ö/g, 'oe');
  value = value.replace(/ü/g, 'ue');
  value = value.replace(/ß/g, 'ss');
  return value
}
