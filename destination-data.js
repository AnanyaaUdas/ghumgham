// content for every destination detail page
// destination-detail.html is one template, destination-detail.js fills it from this list
// to add a country, copy one block, change the text and add its photos to the images folder
// in wordpress each country becomes a post and these fields become custom fields

// photo names used for each country (put them in the images folder):
//   banner  ->  images/[slug]-banner.jpg     e.g. images/nepal-banner.jpg
//   about   ->  images/about-[slug].jpg      e.g. images/about-nepal.jpg
//   cards   ->  images/[activity or package name with dashes].jpg


const destinations = {

  nepal: {
    name: 'Nepal',
    titleStart: 'The land of',
    titleBold: 'Himalayas.',
    intro: "Embark on a journey to explore destinations perfectly suited for your travel aspirations. Whether you're seeking thrilling adventures, serene getaways, or rich cultural experiences, there's a world of possibilities waiting for you. Discover breathtaking landscapes, vibrant cities, and hidden gems that promise unforgettable memories and stories to cherish forever. Whether you seek adventure, relaxation, or cultural discovery, Nepal has something special to offer.",
    activities: ['Trekking', 'Wildlife Safari', 'Cultural Heritage Tour', 'Peak Climbing', 'Rafting', 'Mountain Biking', 'Paragliding', 'Day Tours'],
    packages: [
      ['Annapurna Wonderland', '7D/6N'],
      ['Annapurna Luxury Trip', '5D/4N'],
      ['Everest Hiking Trip', '12D/11N'],
      ['Jomsom Muktinath Tour', '5D/4N'],
      ['Langtang Valley Trek', '8D/7N'],
      ['Upper Mustang Trek', '10D/9N']
    ],
    about: "Home to eight of the world's ten highest mountains, Nepal packs snow peaks, ancient cities and green jungle into one small country. Kathmandu's temples and squares sit a short flight from the Everest and Annapurna regions, while the southern plains are home to rhinos, tigers and elephants.",
    reasons: [
      "Witness the majestic peaks, including Mount Everest, and experience the serenity of the world's highest mountains.",
      'Explore ancient temples, monasteries, and UNESCO World Heritage Sites steeped in history and tradition.',
      "Enjoy trekking, paragliding, white-water rafting, and jungle safaris in one of the world's top adventure destinations.",
      "Discover exotic animals and birds in Nepal's national parks, such as Chitwan and Bardia.",
      'Immerse yourself in vibrant local festivals and the warm hospitality of Nepali people.',
      'Visit sacred sites like Lumbini, the birthplace of Buddha, and rejuvenate with yoga and meditation.'
    ]
  },

  thailand: {
    name: 'Thailand',
    titleStart: 'The land of',
    titleBold: 'Smiles.',
    intro: "From the golden temples of Bangkok to the limestone cliffs of Krabi, Thailand mixes busy city life with slow island days. Spend your mornings exploring markets and palaces, your afternoons on white sand beaches, and your evenings tasting some of the best street food in the world.",
    activities: ['Island Hopping', 'Scuba Diving', 'City Tour', 'Cultural Heritage Tour', 'Elephant Sanctuary', 'Cooking Class', 'Night Markets', 'Day Tours'],
    packages: [
      ['Wonders of Bangkok', '5D/4N'],
      ['Bangkok and Pattaya Tour', '5D/4N'],
      ['Phuket Island Tours', '6D/5N'],
      ['Chiang Mai Explorer', '5D/4N'],
      ['Krabi Beach Escape', '4D/3N'],
      ['Phi Phi Island Hopping', '3D/2N']
    ],
    about: 'Thailand is one of the easiest and friendliest places in Asia to travel. The north offers cool hills, old temples and ethical elephant sanctuaries around Chiang Mai, while the south is known for clear water and islands such as Phuket, Krabi and Koh Samui.',
    reasons: [
      'See the Grand Palace, Wat Arun and the other golden temples of Bangkok.',
      'Relax on the beaches of Phuket, Krabi and the Phi Phi Islands.',
      'Taste famous street food like pad thai, som tam and mango sticky rice.',
      'Meet rescued elephants at ethical sanctuaries around Chiang Mai.',
      'Join the Songkran water festival or the lanterns of Loy Krathong.',
      'Unwind with a traditional Thai massage or a spa day by the sea.'
    ]
  },

  indonesia: {
    name: 'Indonesia',
    titleStart: 'The land of',
    titleBold: 'Islands.',
    intro: 'With thousands of islands stretching across the equator, Indonesia is made for explorers. Watch the sunrise over a volcano, walk through green rice terraces in Bali, dive some of the richest reefs on the planet and visit temples that are over a thousand years old.',
    activities: ['Temple Tours', 'Surfing', 'Scuba Diving', 'Volcano Hiking', 'Rice Terrace Walks', 'Wildlife Safari', 'Yoga Retreats', 'Day Tours'],
    packages: [
      ['Bali Island Escape', '6D/5N'],
      ['Ubud Culture Trip', '4D/3N'],
      ['Komodo Adventure', '5D/4N'],
      ['Java Temples Tour', '5D/4N'],
      ['Gili Islands Getaway', '4D/3N']
    ],
    about: "Indonesia is the world's largest island country, and every island feels different. Bali is known for its temples and beaches, Java for Borobudur and its active volcanoes, and Komodo for its famous dragons and pink sand beaches.",
    reasons: [
      'Explore Bali temples and the rice terraces around Ubud.',
      'See the Komodo dragon in its natural home in Komodo National Park.',
      'Visit Borobudur and Prambanan, two UNESCO World Heritage temples in Java.',
      'Watch the sunrise over Mount Bromo and its smoking crater.',
      'Dive or snorkel among the colourful reefs of Raja Ampat.',
      'Slow down with yoga, spa days and healthy food in Ubud.'
    ]
  },

  maldives: {
    name: 'Maldives',
    titleStart: 'The land of',
    titleBold: 'Endless Blue.',
    intro: 'Crystal clear lagoons, soft white sand and villas built right over the water make the Maldives one of the most relaxing places on earth. It is perfect for honeymoons, family breaks and anyone who wants to swim, dive and do very little else.',
    activities: ['Snorkelling', 'Scuba Diving', 'Sunset Cruise', 'Island Hopping', 'Dolphin Watching', 'Water Sports', 'Spa Retreats', 'Sandbank Picnic'],
    packages: [
      ['Maldives Honeymoon Escape', '5D/4N'],
      ['Overwater Villa Stay', '4D/3N'],
      ['Male and Maafushi Tour', '4D/3N'],
      ['Maldives Diving Trip', '6D/5N']
    ],
    about: 'The Maldives is a chain of coral atolls in the Indian Ocean. Most visitors stay on private resort islands, while local islands such as Maafushi offer a more budget friendly way to enjoy the same beaches and reefs.',
    reasons: [
      'Stay in an overwater villa with the lagoon right below your deck.',
      'Snorkel and dive colourful coral reefs full of turtles and reef fish.',
      'Swim with manta rays and whale sharks in the right season.',
      'See glowing plankton light up the beach at night on some islands.',
      'Explore the capital Malé and the daily life of local islands.',
      'Enjoy private sandbank picnics and sunset dolphin cruises.'
    ]
  },

  tibet: {
    name: 'Tibet',
    titleStart: 'The Roof of the',
    titleBold: 'World.',
    intro: 'High on the Tibetan Plateau, Tibet is a land of prayer flags, turquoise lakes and ancient monasteries. Every journey here feels special, from the streets of Lhasa to the northern side of Everest and the sacred Mount Kailash.',
    activities: ['Monastery Tours', 'Trekking', 'Lake Tours', 'Overland Journey', 'Kailash Kora', 'Cultural Heritage Tour', 'Photography Tours', 'Day Tours'],
    packages: [
      ['Lhasa City Tour', '5D/4N'],
      ['Everest Base Camp Tibet', '8D/7N'],
      ['Mount Kailash Kora', '14D/13N'],
      ['Lhasa to Kathmandu Overland', '9D/8N']
    ],
    about: 'Tibet sits at an average height of over 4,000 metres, so trips are planned with time to adjust to the altitude. Travel here needs special permits, and our team arranges them along with your guide and transport.',
    reasons: [
      'Visit the Potala Palace and the Jokhang Temple in Lhasa.',
      'See Mount Everest from its northern base camp.',
      'Walk the holy kora around Mount Kailash.',
      'Stand beside the sacred lakes of Namtso and Yamdrok.',
      'Watch monks debate at Sera Monastery.',
      'Travel the scenic overland road between Lhasa and Kathmandu.'
    ]
  },

  india: {
    name: 'India',
    titleStart: 'The land of',
    titleBold: 'Diversity.',
    intro: 'Deserts, backwaters, palaces and mountains, India has a little of everything. Every region has its own food, language and festivals, so no two trips are ever the same. Start with the classics like the Taj Mahal, then go further to find your own favourites.',
    activities: ['Heritage Tours', 'Wildlife Safari', 'Backwater Cruise', 'Yoga Retreats', 'Trekking', 'Desert Safari', 'Food Tours', 'Day Tours'],
    packages: [
      ['Golden Triangle Tour', '6D/5N'],
      ['Rajasthan Royal Tour', '8D/7N'],
      ['Kerala Backwaters Trip', '5D/4N'],
      ['Ladakh Adventure', '7D/6N'],
      ['Varanasi Spiritual Tour', '4D/3N']
    ],
    about: 'India is huge, so most trips focus on one or two regions. The Golden Triangle of Delhi, Agra and Jaipur is the most popular first visit, while Kerala, Rajasthan and Ladakh are great for a second trip.',
    reasons: [
      'See the Taj Mahal in Agra at sunrise.',
      'Explore the forts and palaces of Rajasthan.',
      'Float through the backwaters of Kerala on a houseboat.',
      'Watch the evening aarti by the Ganges in Varanasi.',
      'Look for tigers in national parks like Ranthambore.',
      'Take a road trip through the mountains of Ladakh.'
    ]
  },

  bhutan: {
    name: 'Bhutan',
    titleStart: 'The land of the',
    titleBold: 'Thunder Dragon.',
    intro: 'Bhutan is a small Himalayan kingdom that measures success in happiness. Forest covered valleys, cliffside monasteries and colourful festivals make it one of the most peaceful and unspoiled places to visit in Asia.',
    activities: ['Trekking', 'Monastery Tours', 'Festival Tours', 'Cultural Heritage Tour', 'Hot Stone Bath', 'Rafting', 'Bird Watching', 'Day Tours'],
    packages: [
      ['Paro and Thimphu Tour', '5D/4N'],
      ["Tiger's Nest Hike", '4D/3N'],
      ['Druk Path Trek', '7D/6N'],
      ['Punakha Valley Tour', '6D/5N']
    ],
    about: 'Bhutan protects its culture and nature by keeping tourism small and carefully managed. Most of the country is still covered in forest, and traditional dress and architecture are part of daily life.',
    reasons: [
      "Hike up to the famous Tiger's Nest Monastery above Paro.",
      'Learn about Gross National Happiness and the Bhutanese way of life.',
      'Visit the grand Punakha Dzong where two rivers meet.',
      'See masked dances at a tshechu festival.',
      'Walk through quiet forests in one of the greenest countries on earth.',
      'Trek the Druk Path between Paro and Thimphu.'
    ]
  }

};
