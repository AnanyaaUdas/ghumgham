// content for every region detail page
// region-detail.html is one template, region-detail.js fills it
// the region list itself comes from activity-data.js (each activity has its regions)
// in wordpress each region becomes a post and these fields become custom fields

// photo names used for each region (put them in the images folder):
//   intro photo  ->  images/about-[region slug].jpg     e.g. images/about-annapurna-region.jpg
//   packages     ->  images/[package title with dashes].jpg


// ---------- region intros ----------
// regions without their own intro here get a general one, see region-detail.js
const regionIntros = {
  'everest-region': 'Home to the highest mountain on earth, the Everest region is a dream for every trekker. Walk through Sherpa villages, old monasteries and suspension bridges covered in prayer flags, with Everest, Lhotse and Ama Dablam watching over every step of the trail.',
  'annapurna-region': "Embark on a journey to explore destinations perfectly suited for your travel aspirations. Whether you're seeking thrilling adventures, serene getaways, or rich cultural experiences, there's a world of possibilities waiting for you. Discover breathtaking landscapes, vibrant cities, and hidden gems that promise unforgettable memories and stories to cherish forever. Whether you seek adventure, relaxation, or cultural immersion, explore places that match your travel dreams and create memories to last a lifetime.",
  'langtang-region': 'Close to Kathmandu but far from the crowds, Langtang is a valley of glaciers, yak pastures and Tamang villages. It is a great choice for a shorter trek with big mountain views and a strong taste of local culture.',
  'manaslu-region': 'The Manaslu region circles the eighth highest mountain in the world through remote valleys and Tibetan-style villages. It is a restricted area, so it stays quiet and wild, perfect for trekkers who want a real adventure.',
  'kanchenjunga-region': 'In the far east of Nepal, the Kanchenjunga region leads to the base of the third highest mountain on earth. Long, remote and full of rhododendron forests, it is one of the most rewarding treks for experienced walkers.',
  'dolpo-region': 'Dolpo is a hidden land of high deserts, ancient Bon monasteries and the famous turquoise Phoksundo Lake. It is one of the most remote corners of Nepal and feels almost untouched by time.',
  'mustang-region': 'Once a hidden kingdom, Mustang is a dry, wind-carved land of red cliffs, cave dwellings and the walled city of Lo Manthang. Its culture is closer to Tibet than to the rest of Nepal.',
  'makalu-region': 'The Makalu region is a wild and little-visited area below the fifth highest mountain in the world. The trail climbs from tropical valleys to high glaciers inside the protected Makalu Barun National Park.'
};


// ---------- sample packages ----------
// every region gets its packages from this list, e.g. "Annapurna" + "Luxury Trip"
// replace these with the real packages once they are ready
// written as ['name after the region', 'travel style', 'difficulty', days, price in npr]
const packageTypes = [
  ['Classic Trek', 'Classic', 'Moderate', 10, 85000],
  ['Luxury Trip', 'Luxury', 'Easy', 7, 180000],
  ['Helicopter Tour', 'Luxury', 'Easy', 1, 250000],
  ['Family Trip', 'Family-Friendly', 'Easy', 5, 45000],
  ['Short Trek', 'Classic', 'Easy', 4, 35000],
  ['Hidden Trails Trek', 'Off-the-Beaten-Path', 'Challenging', 14, 120000],
  ['Budget Trek', 'Classic', 'Moderate', 8, 55000],
  ['Village Homestay Trek', 'Off-the-Beaten-Path', 'Easy', 6, 40000],
  ['Photography Tour', 'Classic', 'Moderate', 9, 95000],
  ['Disabled Friendly Trip', 'Family-Friendly', 'Easy', 5, 75000],
  ['Adventure Trek', 'Off-the-Beaten-Path', 'Challenging', 12, 110000],
  ['Weekend Getaway', 'Family-Friendly', 'Easy', 3, 25000]
];


// ---------- blog posts ----------
// the region name goes where [region] is
const regionBlogs = [
  ['Best Time to Visit [region]', '17 Jan 2025'],
  ['[region]: A Complete Travel Guide', '09 Jan 2025'],
  ['What to Pack for [region]', '28 Dec 2024']
];
