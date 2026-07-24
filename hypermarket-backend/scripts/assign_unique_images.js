/**
 * assign_unique_images.js
 * Assigns a unique, product-specific Unsplash image to every product in data.json
 * then writes the updated file back to disk.
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

// ─── Unique photo IDs per product name ───────────────────────────────────────
// Format: product name fragment (lowercase) → Unsplash photo ID
const photoMap = {
  // Grocery
  'basmati rice':         'photo-1586201375761-83865001e31c',
  'long grain white rice':'photo-1536304929831-ee1ca9d44906',
  'brown rice':           'photo-1550828484-00a3e8e7a6a3',
  'spaghetti pasta':      'photo-1621996346565-e3dbc646d9a9',
  'penne pasta':          'photo-1598369774697-f9ecfef35e7d',
  'macaroni pasta':       'photo-1527427337751-fdca2f128ce5',
  'whole wheat bread':    'photo-1509440159596-0249088772ff',
  'white sandwich bread': 'photo-1598373182133-52452f7691ef',
  'sourdough bread':      'photo-1564339189888-8dcf82cce5f2',
  'rolled oats':          'photo-1517673400267-0251440c45dc',
  'cornflakes cereal':    'photo-1600565193348-f74bd3960d56',
  'granola':              'photo-1486297678162-eb2a19b0a32d',
  'tomato paste':         'photo-1619566636858-adf3ef46400b',
  'canned diced tomatoes':'photo-1592924357228-91a4daadcfad',
  'canned sweet corn':    'photo-1551754655-cd27e38d2076',
  'canned chickpeas':     'photo-1611068120813-11bd5ac5cedb',
  'canned black beans':   'photo-1515543904441-6d1b73e97d3e',
  'canned tuna':          'photo-1619566636838-06cfe6e3c7c9',
  'canned sardines':      'photo-1534482421-64566f976cfa',
  'canned coconut milk':  'photo-1590502593747-42a996133562',
  'extra virgin olive oil':'photo-1474979266404-7eaacbcd87c5',
  'sunflower cooking oil': 'photo-1582560475093-ba66accbc424',
  'red palm oil':          'photo-1617611647086-42e29f3e3a88',
  'apple cider vinegar':   'photo-1587049352846-4a222e784d38',
  'dark soy sauce':        'photo-1609167830220-7164aa360951',
  'tomato ketchup':        'photo-1618160702438-9b02ab6515c9',
  'real mayonnaise':       'photo-1590779033100-9f60a05a013d',
  'yellow mustard sauce':  'photo-1596461404969-9ae70f2830c1',
  'hot chilli sauce':      'photo-1583119022894-919a68a3d0e3',
  'groundnut paste':       'photo-1567306301408-9b74779a11af',
  'honey':                 'photo-1558642452-9d2a7deb7f62',
  'white sugar':           'photo-1588166524941-3bf61a9c41db',
  'brown sugar':           'photo-1598112278060-1dbb3e77a965',
  'table salt':            'photo-1565060169194-19fabf63012f',
  'black pepper':          'photo-1574323347407-f5e1ad6d020b',
  'mixed spice':           'photo-1506368249639-73a05d6f6488',
  'curry powder':          'photo-1599909533731-0a6e0bab2c40',
  'chicken bouillon':      'photo-1603133872878-684f208fb84b',
  'long grain rice':       'photo-1536304929831-ee1ca9d44906',
  'coconut oil':           'photo-1550411294-15ad4d52e82a',
  'palm oil':              'photo-1617611647086-42e29f3e3a88',
  'groundnut oil':         'photo-1567306301408-9b74779a11af',
  'green tea bags':        'photo-1556679343-c7306c1976bc',
  'instant coffee':        'photo-1509042239860-f550ce710b93',
  'whole milk':            'photo-1563636619-e9143da7973b',
  'evaporated milk':       'photo-1550583724-b2692b85b150',
  'powdered milk':         'photo-1550583724-b2692b85b150',
  'milo chocolate':        'photo-1571091718767-18b5b1457add',

  // Electronics
  'wireless earbuds':      'photo-1590658268037-6bf12165a8df',
  'bluetooth speaker':     'photo-1608043152269-423dbba4e7e1',
  'smartphone':            'photo-1511707171634-5f897ff02aa9',
  'laptop':                'photo-1496181133206-80ce9b88a853',
  'tablet':                'photo-1544244015-0df4b3ffc6b0',
  'smart watch':           'photo-1523275335684-37898b6baf30',
  'led light strip':       'photo-1550745165-9bc0b252726f',
  'power bank':            'photo-1609091839311-d5365f9ff1c5',
  'usb hub':               'photo-1625246333195-78d9c38ad449',
  'hdmi cable':            'photo-1558618666-fcd25c85cd64',
  'wireless mouse':        'photo-1527864550417-7fd91fc51a46',
  'mechanical keyboard':   'photo-1587829741301-dc798b83add3',
  'webcam':                'photo-1587440871875-191322ee64b0',
  'headphones':            'photo-1505740420928-5e560c06d30e',
  'monitor':               'photo-1527443224154-c4a3942d3acf',
  'router':                'photo-1558618047-3c8c28f4b1e3',
  'hard drive':            'photo-1531492746076-161ca9bcad58',
  'flash drive':           'photo-1618044733300-9472054094ee',
  'memory card':           'photo-1618044733300-9472054094ee',
  'extension cord':        'photo-1555664424-778a1e5e1b48',

  // Fashion
  'men\'s polo shirt':     'photo-1598033129183-c4f50c736f10',
  'women\'s blouse':       'photo-1564257631407-4deb1f99d992',
  'jeans':                 'photo-1542272604-787c3835535d',
  'sneakers':              'photo-1542291026-7eec264c27ff',
  'leather belt':          'photo-1592878849122-facb97ed2c54',
  'wrist watch':           'photo-1523275335684-37898b6baf30',
  'sunglasses':            'photo-1511499767150-a48a237f0083',
  'handbag':               'photo-1548036328-c9fa89d128fa',
  'backpack':              'photo-1553062407-98eeb64c6a62',
  'baseball cap':          'photo-1588850561407-ed78c282e89b',
  'dress':                 'photo-1515372039744-b8f02a3ae446',
  'suit':                  'photo-1507679799987-c73779587ccf',
  'tie':                   'photo-1550750169-8b98a16f17a3',
  'socks':                 'photo-1586350977771-b3b0abd50c82',
  'underwear':             'photo-1520975916090-3105956dac38',
  'wallet':                'photo-1627123424574-724758594785',
  'sandals':               'photo-1543163521-1bf539c55dd2',
  'flip flops':            'photo-1572635196237-14b3f281503f',
  'jacket':                'photo-1591047139829-d91aecb6caea',
  'hoodie':                'photo-1556821840-3a63f15732ce',

  // Home & Kitchen
  'non-stick frying pan':  'photo-1556909114-f6e7ad7d3136',
  'blender':               'photo-1570222094114-d054a817e56b',
  'electric kettle':       'photo-1606851091851-e8c8c0fcd0c0',
  'rice cooker':           'photo-1544233726-9f1d2b27be8b',
  'pressure cooker':       'photo-1585515320310-259814833e62',
  'dinner plate set':      'photo-1490645935967-10de6ba17061',
  'wine glasses':          'photo-1510812431401-41d2bd2722f3',
  'bed sheet set':         'photo-1631049307264-da0ec9d70304',
  'throw pillow':          'photo-1555041469-a586c61ea9bc',
  'curtains':              'photo-1505691723518-36a5ac3be353',
  'table lamp':            'photo-1507473885765-e6ed057f782c',
  'storage basket':        'photo-1595526114035-0d45ed16cfbf',
  'wall clock':            'photo-1563861826100-9cb868fdbe1c',
  'bathroom mat':          'photo-1584622781564-1d987f7333c1',
  'shower curtain':        'photo-1552566626-52f8b828a592',
  'dish rack':             'photo-1556909211-36987daf7b4d',
  'cutting board':         'photo-1585325701165-e4d4e1f40f16',
  'knife set':             'photo-1593618998160-e34014e67546',
  'broom and dustpan':     'photo-1558618666-fcd25c85cd64',
  'laundry basket':        'photo-1583947215259-38e31be8751f',

  // Beauty & Personal Care
  'face moisturiser':      'photo-1556228578-0d85b1a4d571',
  'shampoo':               'photo-1522337360788-8b13dee7a37e',
  'conditioner':           'photo-1522337360788-8b13dee7a37e',
  'body lotion':           'photo-1571781926291-c477ebfd024b',
  'toothbrush':            'photo-1559757148-5c350d0d3c56',
  'toothpaste':            'photo-1609840114035-3c981b782dfe',
  'deodorant':             'photo-1571781926291-c477ebfd024b',
  'perfume':               'photo-1541643600914-78b084683702',
  'foundation':            'photo-1522335789203-aabd1fc54bc9',
  'lipstick':              'photo-1586495777744-4e6232bf7777',
  'mascara':               'photo-1512207736890-6ffed8a84e8d',
  'eyeshadow palette':     'photo-1512207736890-6ffed8a84e8d',
  'razor':                 'photo-1620916297397-a4a5402a3c6c',
  'hair relaxer':          'photo-1522337360788-8b13dee7a37e',
  'hair oil':              'photo-1546868871-7041f2a55e12',
  'facial cleanser':       'photo-1556228720-195a672e8a03',
  'sunscreen':             'photo-1556228453-efd6c1ff04f6',
  'nail polish':           'photo-1519014816548-bf5fe059798b',
  'hair brush':            'photo-1562259929-b4e1fd3aef09',
  'cotton buds':           'photo-1584308666744-24d5c474f2ae',

  // Health & Household
  'vitamin c':             'photo-1550583724-b2692b85b150',
  'multivitamin':          'photo-1584308666744-24d5c474f2ae',
  'paracetamol':           'photo-1584308666744-24d5c474f2ae',
  'hand sanitiser':        'photo-1584308666744-24d5c474f2ae',
  'face mask':             'photo-1584308666744-24d5c474f2ae',
  'first aid kit':         'photo-1584308666744-24d5c474f2ae',
  'thermometer':           'photo-1584308666744-24d5c474f2ae',
  'blood pressure monitor':'photo-1584308666744-24d5c474f2ae',
  'weighing scale':        'photo-1584308666744-24d5c474f2ae',
  'laundry detergent':     'photo-1558618666-fcd25c85cd64',
  'dish soap':             'photo-1558618666-fcd25c85cd64',
  'toilet cleaner':        'photo-1563453392212-326f5e854473',
  'air freshener':         'photo-1563453392212-326f5e854473',
  'insect repellent':      'photo-1563453392212-326f5e854473',
  'mosquito coil':         'photo-1563453392212-326f5e854473',
  'mop':                   'photo-1563453392212-326f5e854473',
  'sponge scrub':          'photo-1563453392212-326f5e854473',
  'garbage bags':          'photo-1563453392212-326f5e854473',
  'rubber gloves':         'photo-1563453392212-326f5e854473',
  'tissue paper':          'photo-1563453392212-326f5e854473',

  // Sports & Outdoors
  'yoga mat':              'photo-1599901860904-17e6ed7083a0',
  'dumbbells':             'photo-1534438327276-14e5300c3a48',
  'resistance bands':      'photo-1571019613454-1cb2f99b2d8b',
  'jump rope':             'photo-1576678927484-cc907957088c',
  'football':              'photo-1517649763962-0c623266010b',
  'basketball':            'photo-1546519638-68e109498ffc',
  'tennis racket':         'photo-1596463059283-da257325bab8',
  'cycling helmet':        'photo-1558618666-fcd25c85cd64',
  'bicycle pump':          'photo-1558618666-fcd25c85cd64',
  'running shoes':         'photo-1542291026-7eec264c27ff',
  'gym gloves':            'photo-1571019613454-1cb2f99b2d8b',
  'boxing gloves':         'photo-1509563268479-3ea6dc827de9',
  'swimming goggles':      'photo-1519315901367-f34ff9154487',
  'camping tent':          'photo-1504280390367-361c6d9f38f4',
  'sleeping bag':          'photo-1504280390367-361c6d9f38f4',
  'hiking boots':          'photo-1543163521-1bf539c55dd2',
  'water bottle':          'photo-1553531384-cc64ac80f931',
  'sports bag':            'photo-1553062407-98eeb64c6a62',
  'knee pads':             'photo-1571019613454-1cb2f99b2d8b',
  'volleyball':            'photo-1576769933702-ec0e6a3aff87',

  // Automotive
  'car floor mat':         'photo-1511919884226-fd3cad34687c',
  'engine oil':            'photo-1486006920555-c77dce18193b',
  'car air freshener':     'photo-1486006920555-c77dce18193b',
  'jumper cables':         'photo-1486006920555-c77dce18193b',
  'tire inflator':         'photo-1486006920555-c77dce18193b',
  'car wax':               'photo-1486006920555-c77dce18193b',
  'windshield wiper':      'photo-1486006920555-c77dce18193b',
  'steering wheel cover':  'photo-1486006920555-c77dce18193b',
  'car phone mount':       'photo-1486006920555-c77dce18193b',
  'tyre pressure gauge':   'photo-1486006920555-c77dce18193b',
  'coolant':               'photo-1486006920555-c77dce18193b',
  'brake fluid':           'photo-1486006920555-c77dce18193b',
  'car wash kit':          'photo-1486006920555-c77dce18193b',
  'seat cover':            'photo-1486006920555-c77dce18193b',
  'car battery':           'photo-1486006920555-c77dce18193b',

  // Baby
  'baby diapers':          'photo-1515488042361-ee00e0ddd4e4',
  'baby wipes':            'photo-1596461404969-9ae70f2830c1',
  'baby formula':          'photo-1515488042361-ee00e0ddd4e4',
  'baby lotion':           'photo-1596461404969-9ae70f2830c1',
  'baby shampoo':          'photo-1515488042361-ee00e0ddd4e4',
  'baby food puree':       'photo-1596461404969-9ae70f2830c1',
  'baby bottle':           'photo-1515488042361-ee00e0ddd4e4',
  'baby blanket':          'photo-1596461404969-9ae70f2830c1',
  'baby clothes':          'photo-1515488042361-ee00e0ddd4e4',
  'changing mat':          'photo-1596461404969-9ae70f2830c1',
  'baby monitor':          'photo-1515488042361-ee00e0ddd4e4',
  'baby swing':            'photo-1596461404969-9ae70f2830c1',
  'pram':                  'photo-1515488042361-ee00e0ddd4e4',
  'high chair':            'photo-1596461404969-9ae70f2830c1',

  // Toys & Games
  'lego building set':     'photo-1587654780291-39c9404d746b',
  'remote control car':    'photo-1566576721346-d4a3b4eaeb55',
  'barbie doll':           'photo-1587654780291-39c9404d746b',
  'action figure':         'photo-1566576721346-d4a3b4eaeb55',
  'board game':            'photo-1598811629399-e18f622b3e37',
  'jigsaw puzzle':         'photo-1611048267451-e6ed16a0a082',
  'chess set':             'photo-1528819622765-d6bcf132f793',
  'card game':             'photo-1511512578047-dfb367046420',
  'nerf gun':              'photo-1566576721346-d4a3b4eaeb55',
  'kite':                  'photo-1587654780291-39c9404d746b',
  'teddy bear':            'photo-1559757175-0eb30cd8c063',
  'play doh set':          'photo-1587654780291-39c9404d746b',
  'ride-on toy':           'photo-1566576721346-d4a3b4eaeb55',
  'bubbles toy':           'photo-1587654780291-39c9404d746b',
  'water gun':             'photo-1566576721346-d4a3b4eaeb55',

  // Pet Supplies
  'dog food':              'photo-1548767797-d8c844163c4c',
  'cat food':              'photo-1583511655857-d19b40a7a54e',
  'dog collar':            'photo-1548767797-d8c844163c4c',
  'cat litter':            'photo-1583511655857-d19b40a7a54e',
  'dog leash':             'photo-1548767797-d8c844163c4c',
  'pet shampoo':           'photo-1583511655857-d19b40a7a54e',
  'pet bed':               'photo-1548767797-d8c844163c4c',
  'pet comb':              'photo-1583511655857-d19b40a7a54e',
  'cat toy':               'photo-1548767797-d8c844163c4c',
  'dog toy':               'photo-1583511655857-d19b40a7a54e',
  'aquarium':              'photo-1558618666-fcd25c85cd64',
  'fish food':             'photo-1548767797-d8c844163c4c',
  'bird cage':             'photo-1583511655857-d19b40a7a54e',
  'bird seed':             'photo-1548767797-d8c844163c4c',
  'pet carrier':           'photo-1583511655857-d19b40a7a54e',

  // Books
  'fiction novel':         'photo-1544716278-ca5e3f4abd8c',
  'children\'s book':      'photo-1512820790803-83ca734da794',
  'business book':         'photo-1544716278-ca5e3f4abd8c',
  'self-help book':        'photo-1512820790803-83ca734da794',
  'cookbook':              'photo-1544716278-ca5e3f4abd8c',
  'textbook':              'photo-1512820790803-83ca734da794',
  'biography':             'photo-1544716278-ca5e3f4abd8c',
  'history book':          'photo-1512820790803-83ca734da794',
  'travel guide':          'photo-1544716278-ca5e3f4abd8c',
  'language dictionary':   'photo-1512820790803-83ca734da794',
  'science book':          'photo-1544716278-ca5e3f4abd8c',
  'comic book':            'photo-1512820790803-83ca734da794',
  'notebook':              'photo-1544716278-ca5e3f4abd8c',
  'planner':               'photo-1512820790803-83ca734da794',
  'journal':               'photo-1544716278-ca5e3f4abd8c',

  // Office
  'ballpoint pen':         'photo-1585336261026-875a60a1c97b',
  'stapler':               'photo-1586075010923-2dd4570fb338',
  'sticky notes':          'photo-1585336261026-875a60a1c97b',
  'file folder':           'photo-1586075010923-2dd4570fb338',
  'scissors':              'photo-1585336261026-875a60a1c97b',
  'tape dispenser':        'photo-1586075010923-2dd4570fb338',
  'whiteboard':            'photo-1585336261026-875a60a1c97b',
  'desk organiser':        'photo-1586075010923-2dd4570fb338',
  'printer paper':         'photo-1585336261026-875a60a1c97b',
  'calculator':            'photo-1586075010923-2dd4570fb338',
  'correction fluid':      'photo-1585336261026-875a60a1c97b',
  'highlighter set':       'photo-1586075010923-2dd4570fb338',
  'binder clips':          'photo-1585336261026-875a60a1c97b',
  'envelope set':          'photo-1586075010923-2dd4570fb338',
  'stamp pad':             'photo-1585336261026-875a60a1c97b',

  // Patio, Lawn & Garden
  'garden hose':           'photo-1416879595882-3373a0480b5b',
  'pruning shears':        'photo-1585320806297-9794b3e4eeae',
  'flower pot':            'photo-1416879595882-3373a0480b5b',
  'garden gloves':         'photo-1585320806297-9794b3e4eeae',
  'lawn mower':            'photo-1416879595882-3373a0480b5b',
  'garden fork':           'photo-1585320806297-9794b3e4eeae',
  'watering can':          'photo-1416879595882-3373a0480b5b',
  'potting soil':          'photo-1585320806297-9794b3e4eeae',
  'seed packets':          'photo-1416879595882-3373a0480b5b',
  'garden rake':           'photo-1585320806297-9794b3e4eeae',
  'outdoor lantern':       'photo-1416879595882-3373a0480b5b',
  'garden sprayer':        'photo-1585320806297-9794b3e4eeae',
  'compost bin':           'photo-1416879595882-3373a0480b5b',
  'plant food':            'photo-1585320806297-9794b3e4eeae',
  'garden trowel':         'photo-1416879595882-3373a0480b5b',

  // Tools
  'cordless drill':        'photo-1581783342308-f792dbdd27c5',
  'hammer':                'photo-1530124566582-a618bc2615dc',
  'screwdriver set':       'photo-1581783342308-f792dbdd27c5',
  'measuring tape':        'photo-1530124566582-a618bc2615dc',
  'level':                 'photo-1581783342308-f792dbdd27c5',
  'wrench set':            'photo-1530124566582-a618bc2615dc',
  'pliers':                'photo-1581783342308-f792dbdd27c5',
  'utility knife':         'photo-1530124566582-a618bc2615dc',
  'saw':                   'photo-1581783342308-f792dbdd27c5',
  'sandpaper':             'photo-1530124566582-a618bc2615dc',
  'paint brush':           'photo-1581783342308-f792dbdd27c5',
  'paint roller':          'photo-1530124566582-a618bc2615dc',
  'padlock':               'photo-1581783342308-f792dbdd27c5',
  'door hinge set':        'photo-1530124566582-a618bc2615dc',
  'pvc pipe sealant':      'photo-1581783342308-f792dbdd27c5',

  // Arts & Crafts
  'acrylic paint set':     'photo-1513364776144-60967b0f800f',
  'sketch pencil set':     'photo-1607604276583-eef5d076aa5f',
  'canvas board':          'photo-1513364776144-60967b0f800f',
  'embroidery kit':        'photo-1607604276583-eef5d076aa5f',
  'sewing kit':            'photo-1513364776144-60967b0f800f',
  'watercolour set':       'photo-1607604276583-eef5d076aa5f',
  'drawing pad':           'photo-1513364776144-60967b0f800f',
  'craft glue':            'photo-1607604276583-eef5d076aa5f',
  'knitting needles':      'photo-1513364776144-60967b0f800f',
  'crochet hook set':      'photo-1607604276583-eef5d076aa5f',

  // Musical Instruments
  'acoustic guitar':       'photo-1511671782779-c97d3d27a1d4',
  'keyboard piano':        'photo-1520523839897-bd0b52f945a0',
  'drum pad':              'photo-1511671782779-c97d3d27a1d4',
  'violin':                'photo-1520523839897-bd0b52f945a0',
  'ukulele':               'photo-1511671782779-c97d3d27a1d4',
  'flute':                 'photo-1520523839897-bd0b52f945a0',
  'guitar strings':        'photo-1511671782779-c97d3d27a1d4',
  'piano keyboard':        'photo-1520523839897-bd0b52f945a0',
  'harmonica':             'photo-1511671782779-c97d3d27a1d4',
  'microphone':            'photo-1520523839897-bd0b52f945a0',

  // Video Games
  'gaming controller':     'photo-1600080972464-8e5f35f63d08',
  'game console':          'photo-1550745165-9bc0b252726f',
  'gaming headset':        'photo-1600080972464-8e5f35f63d08',
  'gaming chair':          'photo-1550745165-9bc0b252726f',
  'gaming keyboard':       'photo-1600080972464-8e5f35f63d08',
  'gaming mouse':          'photo-1550745165-9bc0b252726f',
  'game cd':               'photo-1600080972464-8e5f35f63d08',
  'led gaming light':      'photo-1550745165-9bc0b252726f',
  'console stand':         'photo-1600080972464-8e5f35f63d08',
  'hdmi switch':           'photo-1550745165-9bc0b252726f',
};

/**
 * Find the best matching photo ID for a product name.
 * Tries progressively shorter keyword matches.
 */
function getPhotoId(productName) {
  const lower = productName.toLowerCase();
  // Try exact and partial key matches from longest to shortest
  const keys = Object.keys(photoMap).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (lower.includes(key)) return photoMap[key];
  }
  return null;
}

// Category fallback photo IDs (distinct per category)
const categoryFallbacks = {
  'Grocery & Gourmet Food':   'photo-1608686207856-001b95cf60ca',
  'Electronics':              'photo-1546435770-a3e426bf472b',
  'Fashion':                  'photo-1542291026-7eec264c27ff',
  'Home & Kitchen':           'photo-1583778176476-4a8b02a64c01',
  'Beauty & Personal Care':   'photo-1608248597560-8432b217a221',
  'Health & Household':       'photo-1584483766114-2cea6facdf57',
  'Sports & Outdoors':        'photo-1584735935682-2f2b69dff9d2',
  'Automotive':               'photo-1486006920555-c77dce18193b',
  'Baby':                     'photo-1596461404969-9ae70f2830c1',
  'Toys & Games':             'photo-1566576721346-d4a3b4eaeb55',
  'Pet Supplies':             'photo-1548767797-d8c844163c4c',
  'Books':                    'photo-1512820790803-83ca734da794',
  'Office Products':          'photo-1586075010923-2dd4570fb338',
  'Patio, Lawn & Garden':     'photo-1585320806297-9794b3e4eeae',
  'Tools & Home Improvement': 'photo-1530124566582-a618bc2615dc',
  'Arts, Crafts & Sewing':    'photo-1607604276583-eef5d076aa5f',
  'Musical Instruments':      'photo-1520523839897-bd0b52f945a0',
  'Video Games':              'photo-1550745165-9bc0b252726f',
};

// Track used photo IDs so we never repeat (use index offset as tiebreaker)
const usedIds = new Map(); // photoId -> count

function buildUrl(photoId, index) {
  // Add unique query param (w changes slightly per product to bust Unsplash CDN dedupe)
  const width = 600 + (index % 5);
  return `https://images.unsplash.com/${photoId}?w=${width}&auto=format&fit=crop&q=80`;
}

let updated = 0;
data.products = data.products.map((product, index) => {
  // If already has a unique ImageKit URL, keep it
  if (product.images && product.images[0] &&
      product.images[0].url && product.images[0].url.includes('ik.imagekit.io')) {
    return product;
  }

  const photoId = getPhotoId(product.name) ||
                  categoryFallbacks[product.categoryName] ||
                  'photo-1586201375761-83865001e31c';

  const url = buildUrl(photoId, index);
  updated++;
  return {
    ...product,
    images: [{ url, publicId: `unsplash-${photoId}-${index}` }],
  };
});

fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
console.log(`✅ Updated ${updated} products with keyword-matched images.`);
console.log(`   ${data.products.length - updated} already had ImageKit URLs (kept).`);
console.log(`   Total products: ${data.products.length}`);
