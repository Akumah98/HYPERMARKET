const fs = require('fs');
const path = require('path');

const categories = [
  { "name": "Electronics", "description": "Cell phones, accessories, laptops, headphones", "image": "" },
  { "name": "Fashion", "description": "Clothing, shoes, jewelry, watches, bags", "image": "" },
  { "name": "Home & Kitchen", "description": "Furniture, kitchen & dining, decor, bedding", "image": "" },
  { "name": "Beauty & Personal Care", "description": "Makeup, skin care, hair care, fragrances", "image": "" },
  { "name": "Grocery & Gourmet Food", "description": "Beverages, snacks, local produce, pantry staples", "image": "" },
  { "name": "Health & Household", "description": "Vitamins, wellness, medical supplies, cleaning", "image": "" },
  { "name": "Sports & Outdoors", "description": "Exercise & fitness, camping, cycling, outdoor recreation", "image": "" },
  { "name": "Automotive", "description": "Replacement parts, fluids, car accessories, tools", "image": "" },
  { "name": "Baby", "description": "Gear, diapering, feeding, strollers, baby toys", "image": "" },
  { "name": "Toys & Games", "description": "Board games, STEM toys, action figures, puzzles", "image": "" },
  { "name": "Pet Supplies", "description": "Pet food, dog & cat supplies, pet health", "image": "" },
  { "name": "Books", "description": "Fiction, non-fiction, children's books, eBooks", "image": "" },
  { "name": "Office Products", "description": "Office supplies, school supplies, writing instruments", "image": "" },
  { "name": "Patio, Lawn & Garden", "description": "Gardening tools, outdoor decor, lawn care", "image": "" },
  { "name": "Tools & Home Improvement", "description": "Power tools, plumbing, smart home, safety", "image": "" },
  { "name": "Arts, Crafts & Sewing", "description": "Painting, drawing, craft supplies, sewing", "image": "" },
  { "name": "Musical Instruments", "description": "Guitars, keyboards, drums, accessories", "image": "" },
  { "name": "Video Games", "description": "Consoles, controllers, gaming accessories", "image": "" }
];

const categoryImages = {
  "Grocery & Gourmet Food": [
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"
  ],
  "Electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80"
  ],
  "Fashion": [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  ],
  "Home & Kitchen": [
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=600&auto=format&fit=crop&q=80"
  ],
  "Beauty & Personal Care": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608248597560-8432b217a221?w=600&auto=format&fit=crop&q=80"
  ],
  "Health & Household": [
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=600&auto=format&fit=crop&q=80"
  ],
  "Sports & Outdoors": [
    "https://images.unsplash.com/photo-1517649763962-0c623266010b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80"
  ],
  "Automotive": [
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80"
  ],
  "Baby": [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80"
  ],
  "Toys & Games": [
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80"
  ],
  "Pet Supplies": [
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80"
  ],
  "Books": [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80"
  ],
  "Office Products": [
    "https://images.unsplash.com/photo-1585336261026-875a60a1c97b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80"
  ],
  "Patio, Lawn & Garden": [
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80"
  ],
  "Tools & Home Improvement": [
    "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&auto=format&fit=crop&q=80"
  ],
  "Arts, Crafts & Sewing": [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80"
  ],
  "Musical Instruments": [
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&auto=format&fit=crop&q=80"
  ],
  "Video Games": [
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"
  ]
};

const VALID_UNITS = ['kg', 'g', 'L', 'mL', 'piece', 'bundle', 'pack', 'bag'];

const rawData = [
  // 1. Grocery & Gourmet Food (60)
  { cat: "Grocery & Gourmet Food", name: "Basmati Rice 5kg", desc: "Long grain aromatic Basmati rice, premium quality for all dishes.", price: 7500, stock: 150, unit: "bag", weight: "5kg" },
  { cat: "Grocery & Gourmet Food", name: "Long Grain White Rice 2kg", desc: "Cleaned long grain white rice, easy to cook and non-sticky.", price: 2800, stock: 120, unit: "bag", weight: "2kg" },
  { cat: "Grocery & Gourmet Food", name: "Brown Rice 2kg", desc: "Nutritious whole grain brown rice rich in fiber.", price: 3200, stock: 90, unit: "bag", weight: "2kg" },
  { cat: "Grocery & Gourmet Food", name: "Spaghetti Pasta 500g", desc: "Durum wheat semolina spaghetti, cooks in 8 minutes.", price: 650, stock: 250, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Penne Pasta 500g", desc: "Ribbed penne rigate pasta ideal for thick sauces.", price: 700, stock: 200, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Macaroni Pasta 500g", desc: "Classic elbow macaroni pasta for cheese bakes and salads.", price: 650, stock: 180, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Whole Wheat Bread", desc: "Freshly baked whole wheat sliced loaf high in fibre.", price: 1000, stock: 45, unit: "pack", weight: "600g" },
  { cat: "Grocery & Gourmet Food", name: "White Sandwich Bread", desc: "Soft white sandwich bread baked daily.", price: 800, stock: 60, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Sourdough Bread", desc: "Artisanal crusty sourdough loaf with rich flavor.", price: 1500, stock: 25, unit: "pack", weight: "450g" },
  { cat: "Grocery & Gourmet Food", name: "Rolled Oats 1kg", desc: "Whole grain oats perfect for healthy breakfast porridge.", price: 2200, stock: 110, unit: "pack", weight: "1kg" },
  { cat: "Grocery & Gourmet Food", name: "Cornflakes Cereal 500g", desc: "Crispy toasted corn flakes enriched with vitamins.", price: 1800, stock: 95, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Granola with Honey 400g", desc: "Crunchy oat clusters baked with pure honey and nuts.", price: 2800, stock: 75, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Tomato Paste 400g", desc: "Double concentrated rich tomato paste for stews.", price: 850, stock: 300, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Canned Diced Tomatoes 400g", desc: "Peeled diced Italian tomatoes in rich juice.", price: 950, stock: 160, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Canned Sweet Corn 425g", desc: "Tender sweet corn kernels canned at peak freshness.", price: 900, stock: 210, unit: "pack", weight: "425g" },
  { cat: "Grocery & Gourmet Food", name: "Canned Chickpeas 400g", desc: "Cooked chickpeas ready for salads and hummus.", price: 950, stock: 140, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Canned Black Beans 400g", desc: "Plump cooked black beans ready to serve.", price: 1000, stock: 115, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Canned Tuna in Oil 185g", desc: "Solid light tuna chunks packed in vegetable oil.", price: 1200, stock: 280, unit: "pack", weight: "185g" },
  { cat: "Grocery & Gourmet Food", name: "Canned Sardines in Tomato 125g", desc: "Sardines in rich tomato sauce rich in Omega-3.", price: 600, stock: 320, unit: "pack", weight: "125g" },
  { cat: "Grocery & Gourmet Food", name: "Canned Coconut Milk 400ml", desc: "Creamy coconut milk for curry and desserts.", price: 1100, stock: 130, unit: "mL", weight: "400ml" },
  { cat: "Grocery & Gourmet Food", name: "Extra Virgin Olive Oil 750ml", desc: "Cold pressed extra virgin olive oil.", price: 5500, stock: 85, unit: "mL", weight: "750ml" },
  { cat: "Grocery & Gourmet Food", name: "Sunflower Cooking Oil 1L", desc: "Refined pure sunflower oil for frying and baking.", price: 2100, stock: 240, unit: "L", weight: "1L" },
  { cat: "Grocery & Gourmet Food", name: "Red Palm Oil 1L", desc: "Pure traditional unrefined red palm oil.", price: 3000, stock: 175, unit: "L", weight: "1L" },
  { cat: "Grocery & Gourmet Food", name: "Apple Cider Vinegar 500ml", desc: "Raw unfiltered apple cider vinegar with mother.", price: 2500, stock: 90, unit: "mL", weight: "500ml" },
  { cat: "Grocery & Gourmet Food", name: "Dark Soy Sauce 300ml", desc: "Authentic brewed dark soy sauce.", price: 1200, stock: 110, unit: "mL", weight: "300ml" },
  { cat: "Grocery & Gourmet Food", name: "Tomato Ketchup 500g", desc: "Classic rich tomato ketchup squeeze bottle.", price: 1400, stock: 190, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Real Mayonnaise 400g", desc: "Smooth creamy mayonnaise made with free range eggs.", price: 2200, stock: 160, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Yellow Mustard Sauce 250g", desc: "Tangy mild yellow mustard sauce.", price: 1100, stock: 95, unit: "pack", weight: "250g" },
  { cat: "Grocery & Gourmet Food", name: "Hot Chilli Sauce 350ml", desc: "Spicy red chilli pepper condiment sauce.", price: 1300, stock: 140, unit: "mL", weight: "350ml" },
  { cat: "Grocery & Gourmet Food", name: "Groundnut Paste 500g", desc: "Smooth roasted peanut butter / groundnut paste.", price: 2000, stock: 130, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Iodized Table Salt 1kg", desc: "Fine iodized table salt for everyday seasoning.", price: 400, stock: 400, unit: "kg", weight: "1kg" },
  { cat: "Grocery & Gourmet Food", name: "Ground Black Pepper 100g", desc: "Pure ground black pepper shaker.", price: 900, stock: 150, unit: "g", weight: "100g" },
  { cat: "Grocery & Gourmet Food", name: "Curry Powder 100g", desc: "Aromatic blend of Indian curry spices.", price: 800, stock: 170, unit: "g", weight: "100g" },
  { cat: "Grocery & Gourmet Food", name: "Ginger Powder 50g", desc: "Pure dried ground ginger root powder.", price: 650, stock: 140, unit: "g", weight: "50g" },
  { cat: "Grocery & Gourmet Food", name: "Garlic Powder 50g", desc: "Dehydrated ground garlic seasoning.", price: 650, stock: 140, unit: "g", weight: "50g" },
  { cat: "Grocery & Gourmet Food", name: "Mixed Italian Herbs 25g", desc: "Dried oregano, basil, rosemary, and thyme blend.", price: 750, stock: 110, unit: "g", weight: "25g" },
  { cat: "Grocery & Gourmet Food", name: "Paprika Spice 50g", desc: "Sweet smoked red paprika powder.", price: 750, stock: 125, unit: "g", weight: "50g" },
  { cat: "Grocery & Gourmet Food", name: "Bouillon Seasoning Cubes (50pcs)", desc: "Flavorful seasoning cubes for soups and stews.", price: 1500, stock: 350, unit: "pack", weight: "200g" },
  { cat: "Grocery & Gourmet Food", name: "Ground Crayfish 200g", desc: "Sun-dried ground crayfish for traditional dishes.", price: 2500, stock: 140, unit: "g", weight: "200g" },
  { cat: "Grocery & Gourmet Food", name: "Egusi Melon Seeds 500g", desc: "Peeled raw egusi seeds for soup preparation.", price: 3200, stock: 95, unit: "g", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Salted Plantain Chips 150g", desc: "Crispy crunchy fried green plantain slices.", price: 600, stock: 220, unit: "pack", weight: "150g" },
  { cat: "Grocery & Gourmet Food", name: "Roasted Peanuts 300g", desc: "Crunchy salted roasted groundnuts.", price: 1000, stock: 200, unit: "pack", weight: "300g" },
  { cat: "Grocery & Gourmet Food", name: "Assorted Biscuits Pack 500g", desc: "Variety pack of sweet cream biscuits.", price: 1600, stock: 130, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Digestive Biscuits 400g", desc: "Classic wheat digestive biscuits.", price: 1300, stock: 150, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Chocolate Chip Cookies 250g", desc: "Crispy cookies loaded with chocolate chips.", price: 1400, stock: 140, unit: "pack", weight: "250g" },
  { cat: "Grocery & Gourmet Food", name: "Instant Coffee Granules 200g", desc: "Rich freeze-dried instant coffee powder.", price: 3500, stock: 100, unit: "pack", weight: "200g" },
  { cat: "Grocery & Gourmet Food", name: "Pure Green Tea (25 bags)", desc: "Antioxidant rich pure green tea filter bags.", price: 1200, stock: 180, unit: "pack", weight: "50g" },
  { cat: "Grocery & Gourmet Food", name: "Black Tea Blend (100 bags)", desc: "Strong full-bodied black tea bags.", price: 1800, stock: 210, unit: "pack", weight: "200g" },
  { cat: "Grocery & Gourmet Food", name: "Chocolate Malt Powder 400g", desc: "Fortified chocolate malt beverage drink.", price: 2400, stock: 190, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Malt Beverage Drink 400g", desc: "Nutritious malted milk powder drink.", price: 2300, stock: 170, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Full Cream Milk Powder 400g", desc: "Instant full cream milk powder.", price: 2600, stock: 230, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Evaporated Milk 410g", desc: "Unsweetened creamy evaporated canned milk.", price: 800, stock: 310, unit: "pack", weight: "410g" },
  { cat: "Grocery & Gourmet Food", name: "Sweetened Condensed Milk 397g", desc: "Rich thick sweetened condensed milk.", price: 950, stock: 260, unit: "pack", weight: "397g" },
  { cat: "Grocery & Gourmet Food", name: "Plain Natural Yoghurt 500g", desc: "Creamy unsweetened probiotic natural yoghurt.", price: 1200, stock: 80, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Strawberry Fruit Jam 340g", desc: "Sweet strawberry fruit spread jam.", price: 1500, stock: 110, unit: "pack", weight: "340g" },
  { cat: "Grocery & Gourmet Food", name: "Smooth Peanut Butter 400g", desc: "Classic smooth creamy peanut butter.", price: 2100, stock: 140, unit: "pack", weight: "400g" },
  { cat: "Grocery & Gourmet Food", name: "Pure Wildflower Honey 500g", desc: "100% natural raw unpasteurized bee honey.", price: 3800, stock: 95, unit: "pack", weight: "500g" },
  { cat: "Grocery & Gourmet Food", name: "Dark Chocolate Bar 100g", desc: "70% cocoa rich dark chocolate bar.", price: 1500, stock: 120, unit: "piece", weight: "100g" },
  { cat: "Grocery & Gourmet Food", name: "Refined White Sugar 1kg", desc: "Fine pure white granulated cane sugar.", price: 900, stock: 350, unit: "kg", weight: "1kg" },
  { cat: "Grocery & Gourmet Food", name: "Unrefined Brown Sugar 500g", desc: "Natural unrefined Demerara brown sugar.", price: 1100, stock: 160, unit: "g", weight: "500g" }
];

const categoryTargets = [
  { name: "Baby", count: 30, basePrice: 2500, items: ["Diapers Small", "Diapers Medium", "Diapers Large", "Baby Wipes", "Baby Powder", "Baby Lotion", "Baby Shampoo", "Baby Soap", "Baby Oil", "Rash Cream", "Apple Puree", "Mango Puree", "Wheat Cereal", "Formula Stage 1", "Formula Stage 2", "Milk Stage 3", "Feeding Bottle 250ml", "Sippy Cup", "Bowl & Spoon Set", "Baby Teether", "Pacifier Set", "Baby Monitor", "Thermometer", "Nursing Pillow", "Cotton Blanket", "Towel Set", "Crib Mobile", "Night Light", "Nasal Aspirator", "Nail Clipper Set"] },
  { name: "Health & Household", count: 40, basePrice: 1500, items: ["Paracetamol 500mg", "Vitamin C 1000mg", "Multivitamin 30s", "Omega-3 Fish Oil", "Iron Supplement", "Zinc 50mg", "Calcium + D3", "Antacid Tabs", "Antiseptic Cream", "Bandage Pack", "First Aid Kit", "Hand Sanitizer 500ml", "Rubbing Alcohol", "Digital Thermometer", "BP Monitor", "Face Masks 50s", "Surgical Gloves", "Cotton Wool 100g", "Laundry Powder 2kg", "Liquid Detergent 1.5L", "Fabric Softener 1L", "Dishwashing Liquid", "Cleaner Spray", "Toilet Cleaner", "Bleach 1L", "Floor Cleaner 1L", "Air Freshener", "Insect Repellent", "Mosquito Coils", "Bait Gel", "Rat Bait", "Garbage Bags 20s", "Aluminium Foil", "Cling Film", "Tissue Paper 12s", "Paper Towels 4s", "Table Napkins", "Sanitary Pads Night", "Sanitary Pads Day", "Panty Liners 30s"] },
  { name: "Electronics", count: 50, basePrice: 12000, items: ["USB-C Cable 1m", "Lightning Cable 1m", "Micro-USB Cable", "65W Fast Charger", "20W Wall Adapter", "Power Bank 10000mAh", "Power Bank 20000mAh", "Wireless Charger Pad", "Bluetooth Earbuds", "Wired Earphones", "Over-Ear Headphones", "Bluetooth Speaker", "Smart LED Bulb", "LED Desk Lamp", "Extension Socket 4-Way", "Surge Protector", "Universal Adapter", "Wireless Mouse", "USB Keyboard", "Large Mouse Pad", "Adjustable Laptop Stand", "1080p HD Webcam", "USB 3.0 Hub", "External Hard Drive 1TB", "USB Flash Drive 64GB", "MicroSD Card 128GB", "Screen Cleaning Kit", "Laptop Bag 15.6 inch", "Phone Holder Stand", "Selfie Ring Light", "Phone Tripod Stand", "Gimbal Stabilizer", "WiFi Smart Plug", "Digital Wall Clock", "Digital Alarm Clock", "Scientific Calculator", "Thermal Label Printer", "HDMI Cable 2m", "DisplayPort Cable 2m", "VGA to HDMI Adapter", "Bluetooth Keyboard", "Portable SSD 512GB", "WiFi Range Extender", "Network Switch 8-Port", "Ethernet Cable 5m", "Glass Screen Protector", "Universal Phone Case", "Tablet Desk Stand", "Smart Fitness Watch", "Activity Tracker Band"] },
  { name: "Fashion", count: 50, basePrice: 8500, items: ["Men White T-Shirt", "Men Black T-Shirt", "Men Polo Shirt", "Men Oxford Shirt", "Men Jogger Pants", "Men Slim Chinos", "Men Denim Jeans", "Men Cargo Shorts", "Men Hoodie Sweater", "Men Blazer Jacket", "Men Leather Belt", "Men Ankle Socks 5p", "Men Boxers 3-Pack", "Men Singlet 3-Pack", "Men Casual Sneakers", "Men Leather Sandals", "Men Formal Shoes", "Men Baseball Cap", "Women Floral Blouse", "Women Crop Top", "Women Maxi Dress", "Women Bodycon Dress", "Women Midi Skirt", "Women High Waist Jeans", "Women Stretch Leggings", "Women Jogger Set", "Women Formal Blazer", "Women Knit Cardigan", "Women Sports Bra", "Women Cotton Panties 5p", "Women Socks 5p", "Women Canvas Sneakers", "Women Block Heel Shoes", "Women Flat Sandals", "Women Leather Tote Bag", "Women Evening Clutch", "Women Casual Backpack", "Women UV Sunglasses", "Boy Graphic T-Shirt", "Girl Floral T-Shirt", "Kids Denim Shorts", "Girl Party Dress", "Kids Leather School Shoes", "Kids Open Sandals", "Kids Running Sneakers", "Kids School Backpack", "Primary School Bag", "Kids Cotton Cap", "Kids Ankle Socks 5p", "Kids Cotton Underwear"] },
  { name: "Home & Kitchen", count: 50, basePrice: 9500, items: ["Non-Stick Frying Pan 28cm", "Stainless Steel Pot 5L", "Cooking Pot Set 3P", "Cast Iron Skillet 26cm", "Wok Stir Fry Pan 32cm", "Pressure Cooker 6L", "Automatic Rice Cooker 1.8L", "Electric Kettle 1.7L", "Countertop Blender 600W", "Electric Hand Mixer", "2-Slice Bread Toaster", "Digital Microwave 20L", "Wooden Chopping Board", "Poly Board Set 3P", "Chef Knife 8-Inch", "Stainless Knife Set 5P", "Kitchen Utility Scissors", "Stainless Fruit Peeler", "Manual Can Opener", "4-Side Box Grater", "Stainless Mesh Strainer", "Stainless Mixing Bowls 3P", "Measuring Cups Set", "Silicone Spatula 4P", "Wooden Spoons 3P", "Soup Ladle & Turner", "Stainless Dish Drainer", "Dish Scrubber Brush", "Silicone Oven Mitts", "Cotton Kitchen Apron", "Glass Food Containers 4P", "Vacuum Food Sealer Machine", "2-Tier Thermal Lunch Box", "Stainless Water Bottle 1L", "Insulated Vacuum Flask 500ml", "Ceramic Plate Set 6P", "Ceramic Soup Bowls 6P", "Coffee Mugs Set 4P", "Glass Tumblers 6P", "Stainless Cutlery Set 24P", "Blackout Window Curtains", "Roller Window Blinds", "Cotton Bed Sheet Queen", "Microfiber Duvet Double", "Ergonomic Bed Pillow", "Cotton Pillowcases 2P", "Bath Towel Large", "Hand Towels 2P", "Non-Slip Bathroom Mat", "Large Laundry Basket"] },
  { name: "Beauty & Personal Care", count: 40, basePrice: 4500, items: ["Foaming Face Cleanser", "Hydrating Face Lotion", "SPF 50 Sunscreen Cream", "Vitamin C Brightening Serum", "Anti-Aging Eye Cream", "Moisturizing Lip Balm", "Nourishing Body Lotion 400ml", "Exfoliating Body Scrub", "Pure Organic Shea Butter", "Argan Hair & Body Oil", "Cold Pressed Coconut Oil", "Anti-Dandruff Shampoo", "Deep Hydration Conditioner", "Hair Growth Treatment", "Hair Relaxer Kit", "Hair Bonding Glue", "Soft Bristle Toothbrush 3P", "Rechargeable Electric Toothbrush", "Whitening Toothpaste 150g", "Antiseptic Mouthwash 500ml", "Dental Floss Picks 50P", "Men Deodorant Roll-On", "Women Deodorant Roll-On", "Men Eau De Parfum 50ml", "Women Eau De Parfum 50ml", "Men Body Spray 200ml", "Women Body Spray 200ml", "Men 5-Blade Razor", "Moisturizing Shave Gel", "Calming Aftershave Lotion", "Quick Dry Nail Polish", "Nail Polish Remover 100ml", "Liquid Makeup Foundation", "Volumizing Mascara Black", "Waterproof Eyeliner Pencil", "Matte Lipstick Red", "Shine Lip Gloss", "Professional Makeup Brushes", "Makeup Remover Wipes 30s", "Slanted Tip Tweezers"] },
  { name: "Sports & Outdoors", count: 30, basePrice: 6500, items: ["Match Football Size 5", "Pro Basketball Size 7", "Tournament Volleyball", "Graphite Tennis Racket", "Badminton Set with Shuttlecocks", "Speed Jump Rope", "Resistance Loop Bands 5P", "Non-Slip Yoga Mat 6mm", "High Density Foam Roller", "Rubber Dumbbells 2kg Pair", "Hex Dumbbells 5kg Pair", "Cast Iron Kettlebell 10kg", "Doorway Pull-Up Bar", "Abdominal Roller Wheel", "Speed Skipping Rope", "Boxing Gloves 12oz", "Sports Water Bottle 750ml", "Men Cushion Running Shoes", "Women Trail Running Shoes", "Performance Sports Socks 3P", "Padded Gym Gloves", "Duffle Gym Bag", "Aero Bicycle Helmet", "Neoprene Knee Support", "Compression Arm Sleeves", "Team Football Jersey", "Padded Cycling Shorts", "Anti-Fog Swim Goggles", "Silicone Swim Cap", "LED Camping Lantern"] },
  { name: "Automotive", count: 25, basePrice: 7500, items: ["Car Air Vent Phone Holder", "Dual USB Car Charger 36W", "Car Hanging Air Freshener", "Universal Leatherette Seat Covers", "Heavy Duty Car Floor Mats 4P", "Steering Wheel Grip Cover", "Cordless Car Vacuum Cleaner", "Portable Air Compressor 12V", "Car Battery Jump Starter", "Auto Emergency First Aid Kit", "1080p Front Dash Camera", "Windshield Sunshade Visor", "Window Tint Film Roll", "Carnuba Liquid Car Wax", "Microfiber Towels 5P", "Synthetic Engine Oil 5W30 4L", "DOT 4 Brake Fluid 500ml", "Radiator Coolant Antifreeze 1L", "Windshield Washer Fluid 2L", "Smart Car Battery Charger", "Heavy Duty Tow Strap 5T", "Reflective Hazard Triangle", "Auto Fire Extinguisher 1kg", "WD-40 Multi-Use Spray 400ml", "Heavy Duty Waterproof Duct Tape"] },
  { name: "Toys & Games", count: 25, basePrice: 5500, items: ["LEGO Building Bricks Box", "500-Piece Landscape Puzzle", "1000-Piece World Map Puzzle", "Wooden Chess & Checkers Set", "Classic Scrabble Word Game", "Monopoly Board Game", "UNO Card Game Box", "Standard Playing Cards 2 Decks", "3x3 Speed Cube", "Action Figure Hero", "Die-Cast Toy Cars 10P", "RC Remote Control Racing Car", "Fashion Doll 30cm", "Wooden Dollhouse Furniture", "Plush Giant Teddy Bear", "Plush Soft Bear", "Wooden Building Blocks 100P", "Super Soaker Water Blaster", "Automatic Bubble Blower", "Foam Dart Blaster Toy", "Play Kitchen Cookware Set", "Kids Washable Color Set", "Play Dough 10 Colors Set", "Fidget Spinner Metallic", "Classic Metal Slinky Toy"] },
  { name: "Pet Supplies", count: 20, basePrice: 6000, items: ["Dry Dog Food Adult 3kg", "Canned Dog Meat Chunks 400g", "Dog Training Treats 200g", "Retractable Dog Leash 5m", "Adjustable Padded Dog Collar", "Rubber Dog Chew Bone", "Gentle Pet Shampoo 250ml", "Shedding Pet Brush Comb", "Double Stainless Pet Bowls", "Indoor Cat Dry Kibble 2kg", "Cat Wet Food Pouches 12P", "Crunchy Cat Treats 50g", "Clumping Litter 5kg", "Covered Cat Litter Box", "Sisal Cat Scratching Post", "Feather Wand Cat Toy", "Wild Bird Seed Mix 500g", "Tropical Fish Flake Food 50g", "Aquarium Colored Gravel 1kg", "Foldable Pet Carrier Bag"] },
  { name: "Books", count: 20, basePrice: 4500, items: ["The Alchemist Novel", "Rich Dad Poor Dad", "Atomic Habits Guide", "Think and Grow Rich", "48 Laws of Power", "7 Habits of Effective People", "How to Win Friends Book", "Psychology of Money", "Deep Work Focus Guide", "Start with Why Leadership", "Power of Now Mindfulness", "Thinking Fast and Slow", "The Lean Startup Book", "Zero to One Innovation", "Sapiens History of Humankind", "The Art of War Classic", "Becoming Autobiography", "Long Walk to Freedom", "Things Fall Apart Novel", "Diary of a Young Girl"] },
  { name: "Office Products", count: 20, basePrice: 3500, items: ["A4 Copy Paper 80gsm 500s", "Blue Ballpoint Pens 50P", "Gel Ink Rollerball Pens 12P", "Fluorescent Highlighters 5P", "Chisel Tip Markers 12P", "Heavy Duty Desktop Stapler", "Standard Metal Staples 1000P", "Stainless Office Scissors 8\"", "Metal Paper Clips 100P", "Assorted Binder Clips 50P", "A4 2-Ring Binder Folder", "Plastic Document Sleeves 50P", "Self-Stick Notes 400 Sheets", "Liquid Correction Pen 2P", "Desktop Tape Dispenser", "Clear Acrylic Ruler 30cm", "8-Digit Desktop Calculator", "Magnetic Dry Erase Board", "Dry Erase Markers 4P", "Whiteboard Felt Eraser"] },
  { name: "Patio, Lawn & Garden", count: 15, basePrice: 5000, items: ["Expandable Garden Hose 15m", "Plastic Water Can 8L", "Hand Trowel & Transplanter Set", "Heavy Duty Bypass Pruners", "Rubber Grip Garden Gloves", "Organic Potting Soil Mix 10L", "Granular Plant Fertilizer 1kg", "Terracotta Planter Pots 3P", "Hanging Basket Planters 2P", "50-Cell Seed Starting Trays", "Steel Leaf Rake 14-Tine", "Solar Path Lights 4P", "Memory Foam Kneeling Pad", "Stand-Up Weeder Tool", "Automatic Plant Waterers 8P"] },
  { name: "Tools & Home Improvement", count: 20, basePrice: 8500, items: ["Claw Hammer 16oz", "Magnetic Screwdriver Set 24P", "Adjustable Crescent Wrench 10\"", "Combination Pliers Set 3P", "Auto-Lock Measuring Tape 5m", "Aluminum Torpedo Level", "12V Cordless Drill Driver", "HSS Drill Bit Set 20P", "Steel Hand Saw 18\"", "Retractable Utility Knife", "Metric Allen Wrench Set 9P", "Plastic Wall Anchors & Screws", "Nylon Cable Zip Ties 100P", "Vinyl Electrical Tape 5P", "Paint Roller Kit 9\"", "Bristle Paint Brush Set 5P", "Assorted Sandpaper Sheets 20P", "Brass Heavy Duty Padlock", "Stainless Door Hinges 4P", "Thread Seal PTFE Tape 5P"] },
  { name: "Arts, Crafts & Sewing", count: 10, basePrice: 4000, items: ["Acrylic Paint Set 24 Tubes", "Graphite Sketch Pencils 12P", "Stretched Canvas Panels 4P", "Embroidery Starter Hoop Kit", "Compact Sewing Repair Kit", "Fabric Craft Scissors 9\"", "Hot Glue Gun with 20 Sticks", "Colored Origami Paper 100P", "Craft Paint Brushes 10P", "Self-Healing Cutting Mat"] },
  { name: "Musical Instruments", count: 18, basePrice: 25000, items: ["Acoustic Guitar Package", "61-Key Digital Keyboard", "Electric Bass Guitar", "Ukulele Concert 23-Inch", "Full Size Violin Set", "Compact Electronic Drum Pad", "Studio Monitor Headphones", "Vocal Dynamic Microphone", "Adjustable Keyboard Stand", "Guitar Floor Stand", "Clip-On Digital Tuner", "Padded Guitar Gig Bag", "Standard Drumsticks 5A", "Nylon Guitar Strap", "Microphone Boom Arm", "Instrument Cable 3m", "Guitar Picks Pack 12P", "Harmonica Key of C"] },
  { name: "Video Games", count: 17, basePrice: 22000, items: ["Wireless Gaming Controller", "Wired Gaming Headset 7.1", "Mechanical RGB Gaming Keyboard", "Optical RGB Gaming Mouse", "Gaming Mouse Pad XXL", "Controller Charging Dock", "Consoles Cooling Fan Stand", "Storage Case for Switch", "Thumb Grip Caps 8P", "HDMI 2.1 4K Cable 2m", "VR Headset Stand", "Gaming Steering Wheel", "Microphone for Streaming", "Blue Light Gaming Glasses", "Console Dust Cover", "Hard Shell Game Case", "LED Light Strip for TV"] }
];

const allProducts = [];

const sanitizeUnit = (u) => VALID_UNITS.includes(u) ? u : 'piece';

const getImagesForCategory = (cat, idx) => {
  const list = categoryImages[cat] || categoryImages["Electronics"];
  const url = list[idx % list.length];
  return [{ url: url, publicId: `seed-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${idx}` }];
};

rawData.forEach((item, idx) => {
  const price = item.price;
  const compareAtPrice = Math.random() > 0.4 ? Math.round(price * 1.15 / 100) * 100 : 0;
  allProducts.push({
    name: item.name,
    description: item.desc,
    price: price,
    compareAtPrice: compareAtPrice,
    categoryName: item.cat,
    stock: item.stock || Math.floor(Math.random() * 80) + 15,
    unit: sanitizeUnit(item.unit),
    weight: item.weight || "300g",
    tags: [item.cat.toLowerCase().split(' ')[0], "quality"],
    badges: Math.random() > 0.6 ? ["Best Seller"] : (Math.random() > 0.5 ? ["Top Rated"] : []),
    averageRating: Number((Math.random() * 1.2 + 3.8).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 150) + 10,
    images: getImagesForCategory(item.cat, idx)
  });
});

categoryTargets.forEach((target, tIdx) => {
  target.items.forEach((itemName, idx) => {
    const p = Math.round((target.basePrice * (0.6 + (idx % 10) * 0.15)) / 100) * 100;
    const compare = Math.random() > 0.5 ? Math.round((p * 1.2) / 100) * 100 : 0;
    allProducts.push({
      name: itemName,
      description: `High quality ${itemName.toLowerCase()} designed for everyday usage and reliable performance.`,
      price: p,
      compareAtPrice: compare,
      categoryName: target.name,
      stock: Math.floor(Math.random() * 90) + 10,
      unit: "piece",
      weight: "500g",
      tags: [target.name.toLowerCase().split(' ')[0], "essential"],
      badges: idx % 4 === 0 ? ["Popular"] : [],
      averageRating: Number((4.0 + (idx % 10) * 0.1).toFixed(1)),
      reviewCount: (idx + 1) * 12,
      images: getImagesForCategory(target.name, idx + 5)
    });
  });
});

const output = {
  categories: categories,
  products: allProducts,
  reviews: [
    {
      productName: "Basmati Rice 5kg",
      userName: "jean@test.com",
      rating: 5,
      comment: "Absolutely love this rice. Fluffy and aromatic."
    },
    {
      productName: "Sunflower Cooking Oil 1L",
      userName: "mami@test.com",
      rating: 5,
      comment: "Great quality oil for everyday cooking."
    }
  ]
};

const dataFilePath = path.join(__dirname, '../data/data.json');
fs.writeFileSync(dataFilePath, JSON.stringify(output, null, 2), 'utf8');

console.log(`Generated ${allProducts.length} items with images in data.json`);
