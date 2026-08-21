const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  
  // Get 12 random products to be bestsellers
  const products = await db.collection('products').aggregate([{ $sample: { size: 12 } }]).toArray();
  
  for (const p of products) {
    await db.collection('products').updateOne({ _id: p._id }, { $set: { isBestseller: true } });
  }
  
  console.log('Made ' + products.length + ' random products bestsellers.');
  process.exit(0);
});
