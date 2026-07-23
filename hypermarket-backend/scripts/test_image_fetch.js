const axios = require('axios');

async function testFetch(query) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json`;
    const res = await axios.get(searchUrl, { headers: { 'User-Agent': 'HypermarketApp/1.0 (contact@hypermarket.cm)' } });
    const pages = res.data?.query?.pages;
    if (pages) {
      const pageId = Object.keys(pages)[0];
      const imgUrl = pages[pageId]?.imageinfo?.[0]?.url;
      console.log(`Query: "${query}" -> URL:`, imgUrl);
      return imgUrl;
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testFetch('Basmati Rice');
testFetch('Bluetooth Earbuds');
testFetch('Non-Stick Frying Pan');
