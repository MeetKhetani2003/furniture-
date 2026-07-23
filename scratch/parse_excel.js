const xlsx = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'Furniture artributes .xlsx');

try {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Get all data
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
  if (data.length > 0) {
    console.log("COLUMNS:");
    console.log(JSON.stringify(data[0], null, 2));
  } else {
    console.log("No data found");
  }
} catch (err) {
  console.error("Error:", err);
}
