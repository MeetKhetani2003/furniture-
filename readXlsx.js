const xlsx = require('xlsx');
const fs = require('fs');
const workbook = xlsx.readFile('public/Furniture artributes .xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, {header: 1});
console.log('Total rows:', data.length);
console.log('First 20 rows:', JSON.stringify(data.slice(0, 20), null, 2));
