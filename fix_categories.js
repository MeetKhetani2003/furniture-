const fs = require('fs');
let content = fs.readFileSync('src/lib/data/categories.ts', 'utf8');

// The bad insertion started with literally "  },\\n  export interface Subcategory {"
const splitIndex = content.indexOf('  },\\n  export interface Subcategory {');
if (splitIndex !== -1) {
  const goodPart1 = content.substring(0, splitIndex);
  
  // Find the real "Sofas & Seating" that comes later in the duplicated file
  const sofasIndex = content.indexOf('  {\n    name: "Sofas & Seating",', splitIndex);
  
  if (sofasIndex !== -1) {
    const goodPart2 = content.substring(sofasIndex);
    fs.writeFileSync('src/lib/data/categories.ts', goodPart1 + '  },\n' + goodPart2);
    console.log("Fixed!");
  } else {
    console.log("Could not find Sofas & Seating");
  }
} else {
  console.log("Could not find the bad split point");
}
