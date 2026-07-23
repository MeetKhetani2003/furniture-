require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function seedProduct() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    const db = mongoose.connection.db;

    // Get "Sofas & Seating" category (or just any category, or Furniture)
    const category = await db.collection('categories').findOne({ name: "Furniture" });
    if (!category) {
        console.error("Furniture category not found");
        process.exit(1);
    }

    // Get Attribute Set
    const attrSet = await db.collection('attributesets').findOne({ name: "Furniture (From CSV)" });
    if (!attrSet) {
        console.error("Attribute set not found");
        process.exit(1);
    }

    // Define images
    const blackImages = [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
      "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800&q=80"
    ];
    const goldImages = [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5e89?w=800&q=80",
      "https://images.unsplash.com/photo-1581428982868-e410dd98fc30?w=800&q=80"
    ];
    const silverImages = [
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&q=80",
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80"
    ];

    const generalImages = [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80",
      ...blackImages,
      ...goldImages,
      ...silverImages
    ];

    const product = {
      name: "Elvas Metal Nesting Coffee Table Set with Porcelain Top",
      slug: "elvas-metal-nesting-coffee-table-set-new-" + Date.now(),
      sku: "FM2287134-NEW-" + Date.now(),
      brand: "Casacraft from Pepperfry",
      category: category._id.toString(),
      attributeSet: attrSet._id.toString(),
      status: 1,
      isFeatured: true,
      price: 18999,
      mrp: 18999,
      special_price: 16249,
      stock: 50,
      description: "<p>Casacraft offers the best in comfort with elan. The collections are a series of modern trendy designs, simple yet striking and represent the ideals of minimalism.</p>",
      description_sections: [
        { title: "Description", content: "Casacraft offers the best in comfort with elan. The designs are a perfect blend of functionality and exceptional aesthetics." },
        { title: "Warranty Terms", content: "The warranty covers manufacturing/ workmanship and material defects that occur during the warranty period." },
        { title: "Care Instructions", content: "Clean by lightly brushing and/or vacuuming to remove dust. Do not keep warm or cold items directly on a furniture surface." }
      ],
      specifications: {
        "height": "18",
        "width": "28",
        "depth": "28",
        "dimension": "Big-H 18 x W 28 x D 28;Small-H 16 x W 18 x D 18",
        "furniture_material": "Metal",
        "room_type": "Living Room",
        "manufacturer_warranty": "36 Months",
        "assembly": "No Assembly Required",
        "top_material": "Porcelain"
      },
      images: generalImages,
      variants: [
        {
          name: "Black Finish",
          sku: "FM2287134-BLK-" + Date.now(),
          price: 16249,
          mrp: 18999,
          stock: 20,
          images: blackImages,
          status: 1,
          isDefault: true,
          specifications: { "Wood_colour": "Black", "color_swatch": "Black" }
        },
        {
          name: "Gold Finish",
          sku: "FM2287134-GLD-" + Date.now(),
          price: 17249,
          mrp: 19999,
          stock: 15,
          images: goldImages,
          status: 1,
          isDefault: false,
          specifications: { "Wood_colour": "Gold", "color_swatch": "Gold" }
        },
        {
          name: "Silver Finish",
          sku: "FM2287134-SLV-" + Date.now(),
          price: 16999,
          mrp: 19499,
          stock: 15,
          images: silverImages,
          status: 1,
          isDefault: false,
          specifications: { "Wood_colour": "Silver", "color_swatch": "Silver" }
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('products').insertOne(product);
    console.log(`Successfully created real Product with ID: ${result.insertedId}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding product:', error);
    process.exit(1);
  }
}

seedProduct();
