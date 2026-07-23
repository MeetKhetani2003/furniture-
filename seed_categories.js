require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const categories = [
  { name: 'Furniture', slug: 'furniture', description: 'Discover handcrafted furniture pieces.' },
  { name: 'Sofas & Seating', slug: 'sofas-seating', description: 'Comfortable and stylish seating options.' },
  { name: 'Mattresses', slug: 'mattresses', description: 'Quality mattresses for restful sleep.' },
  { name: 'Home Decor', slug: 'home-decor', description: 'Elevate your interiors with exquisite home decor.' },
  { name: 'Furnishings', slug: 'furnishings', description: 'Dress your home with premium fabrics.' },
  { name: 'Lamps & Lighting', slug: 'lamps-lighting', description: 'Illuminate your spaces.' },
  { name: 'Kitchen & Dining', slug: 'kitchen-dining', description: 'Prep, cook, and serve in style.' },
  { name: 'Luxury', slug: 'luxury', description: 'Exclusive premium collections.' },
  { name: 'Modular', slug: 'modular', description: 'Customizable modular solutions.' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    
    const db = mongoose.connection.db;
    
    // Clear old categories
    await db.collection('categories').deleteMany({});
    console.log('Cleared old categories.');
    
    // Insert new categories
    await db.collection('categories').insertMany(categories);
    console.log('Inserted new furniture categories.');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
