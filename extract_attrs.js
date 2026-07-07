const xlsx = require('xlsx');
const fs = require('fs');
const wb = xlsx.readFile('public/Furniture artributes .xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet, {header: 1});
const keys = data[0];
const obj = {};
keys.forEach(k => {
  if (k) obj[k] = 'Sample ' + k;
});
fs.writeFileSync('attributes.json', JSON.stringify(obj, null, 2));
console.log('Saved ' + Object.keys(obj).length + ' attributes to attributes.json');
