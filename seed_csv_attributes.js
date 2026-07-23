require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');

async function seedAttributeSet() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    const db = mongoose.connection.db;

    // Read the CSV file
    const csvData = fs.readFileSync('public/product details.csv', 'utf8');
    const lines = csvData.split('\n');
    if (lines.length === 0) {
        console.error("Empty CSV");
        process.exit(1);
    }
    
    // Parse headers (first line)
    // Handle potential carriage returns
    const headersLine = lines[0].replace('\r', '');
    const keys = headersLine.split(',').map(k => k.trim()).filter(k => k);

    // List of standard fields that are already in the "General" or other sections of the form
    // We shouldn't duplicate these as dynamic attributes
    const standardFields = [
      '_attribute_set', 'status', '_type', 'SKU', 'ref_id', 'merchant', 'merchant_sku_id', 'merchant_sku_name',
      '_category', 'name', 'price', 'cost', 'special_price', 'description', 'warranty_terms', 'furniture_care', 'care'
    ];

    // Filter out standard fields to get just the actual specifications/attributes
    const attributeKeys = keys.filter(k => !standardFields.includes(k) && k !== '');

    // Transform into our AttributeSet schema
    const attributes = attributeKeys.map(k => ({
      name: k,
      type: 'text',
      isRequired: false
    }));

    const attributeSet = {
      name: "Furniture (From CSV)",
      description: "Generated from product details.csv",
      attributes: attributes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into DB
    const collection = db.collection('attributesets');
    
    // Check if it already exists, to avoid duplicates
    const existing = await collection.findOne({ name: "Furniture (From CSV)" });
    if (existing) {
      await collection.deleteOne({ name: "Furniture (From CSV)" });
      console.log('Deleted existing CSV template.');
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
