require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const xlsx = require('xlsx');

async function seedAttributeSet() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    const db = mongoose.connection.db;

    // Read the Excel file
    const wb = xlsx.readFile('public/Furniture artributes .xlsx');
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, {header: 1});
    const keys = data[0]; // Header row

    // Filter out empty headers
    const validKeys = keys.filter(k => k && k.trim() !== '');

    // Transform into our AttributeSet schema
    const attributes = validKeys.map(k => ({
      name: k.trim(),
      type: 'text',
      isRequired: false
    }));

    const attributeSet = {
      name: "Excel Upload Template",
      description: "Generated from Furniture attributes .xlsx",
      attributes: attributes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into DB
    const collection = db.collection('attributesets');
    
    // Check if it already exists, to avoid duplicates
    const existing = await collection.findOne({ name: "Excel Upload Template" });
    if (existing) {
      await collection.deleteOne({ name: "Excel Upload Template" });
      console.log('Deleted existing template.');
    }

    await collection.insertOne(attributeSet);
    console.log(`Successfully created Attribute Set with ${attributes.length} attributes!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding Attribute Set:', error);
    process.exit(1);
  }
}

seedAttributeSet();
