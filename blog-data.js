// every blog post on the insights and blogs page
// featured: true puts the post in the featured blogs block at the top (the first one is the big card)
// image is the file name in the images folder, category and year are used by the filters on the side
// noComments: true shows the "no comments yet" screen on that post
// in wordpress these become normal posts with a category and a featured tag

const blogs = [
  { title: 'Discover Hidden Gems of Nepal with Off-the-Beaten-Path Adventures', category: 'Destination Guides', date: '17 Jan 2026', image: 'blog-1', featured: true },
  { title: 'A First Timer\'s Guide to the Annapurna Circuit', category: 'Trekking & Adventure', date: '09 Jan 2026', image: 'annapurna-wonderland', featured: true },
  { title: 'Sunrise Over Machhapuchhre: Best Viewpoints Around Pokhara', category: 'Destination Guides', date: '28 Dec 2025', image: 'peak-climbing', featured: true },
  { title: 'Life in the Sherpa Villages of the Khumbu', category: 'Cultural Insights', date: '14 Dec 2025', image: 'nepal', featured: true },
  { title: 'Monasteries and Prayer Wheels: A Walk Through Lhasa', category: 'Cultural Insights', date: '02 Dec 2025', image: 'lhasa-city-tour', featured: true },
  { title: 'How to Pack Light for a Two Week Trek', category: 'Travel Tips & Planning', date: '21 Nov 2025', image: 'trekking', featured: true },

  { title: 'Why the Yak Is the Real Hero of the Himalayas', category: 'Cultural Insights', date: '10 Nov 2025', image: 'gallery-7' },
  { title: 'Alpenglow on Annapurna South: When and Where to See It', category: 'Destination Guides', date: '30 Oct 2025', image: 'about-mountains' },
  { title: 'Trekking Responsibly: Leave No Trace in the Mountains', category: 'Sustainable Travel', date: '18 Oct 2025', image: 'mountain-biking' },
  { title: 'Paragliding Over Phewa Lake: What to Expect', category: 'Trekking & Adventure', date: '05 Oct 2025', image: 'paragliding', noComments: true },
  { title: 'Island Hopping in Thailand on a Budget', category: 'Travel Tips & Planning', date: '22 Sep 2025', image: 'blog-3' },
  { title: 'Bali Beyond the Beaches: Temples, Lakes and Rice Fields', category: 'Destination Guides', date: '11 Sep 2025', image: 'bali-island-escape', noComments: true },
  { title: 'Staying in Overwater Villas Without Harming the Reef', category: 'Sustainable Travel', date: '30 Aug 2024', image: 'blog-2' },
  { title: 'The Golden Triangle in Six Days: Delhi, Agra and Jaipur', category: 'Destination Guides', date: '12 Jul 2024', image: 'golden-triangle-tour' },
  { title: 'Old Town Rivers and Wooden Boats: A Slow Travel Diary', category: 'Food & Local Life', date: '03 May 2024', image: 'gallery-4' },
  { title: 'Chortens of the Plateau: Reading Tibetan Sacred Art', category: 'Cultural Insights', date: '19 Nov 2023', image: 'gallery-5', noComments: true },
  { title: 'Getting Your Trekking Permits in Nepal, Step by Step', category: 'Travel Tips & Planning', date: '07 Apr 2023', image: 'nepal-2', noComments: true },
  { title: 'Dashain and Tihar: Travelling Nepal During the Festivals', category: 'Festivals', date: '15 Oct 2022', image: 'blog-1' },
  { title: 'Eating Dal Bhat Twice a Day: A Trekker\'s Food Guide', category: 'Food & Local Life', date: '26 Mar 2022', image: 'annapurna-wonderland' },
  { title: 'Our First Group Trek to Everest Base Camp', category: 'Trekking & Adventure', date: '11 Nov 2021', image: 'everest-hiking-trip' },
  { title: 'Planning a Himalayan Trip After a Long Break', category: 'Travel Tips & Planning', date: '08 Feb 2021', image: 'peak-climbing', noComments: true },
  { title: 'Ten Years of Ghumgham: Trails We Still Love', category: 'Trekking & Adventure', date: '20 Dec 2020', image: 'about-mountains' }
];
