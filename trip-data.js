// content for every trip detail page
// trip-detail.html is one template, trip-detail.js fills it
// every package card on the site links there with the trip's title, place, days and price
// trips with their own block in tripDetails (bottom of this file) use that text,
// every other trip gets sample content built from its title and place, see buildTrip
// in wordpress each trip becomes a post and these fields become custom fields

// photo names (put them in the images folder), [trip] is the trip title with dashes:
//   gallery      images/[trip]-1.jpg to images/[trip]-6.jpg     e.g. images/wonders-of-bangkok-1.jpg
//   highlights   images/[trip]-highlight-1.jpg to -4.jpg
//   map          images/[trip]-map.jpg
//   day places   images/[place name with dashes].jpg            e.g. images/riverside-cafes.jpg
//   reviews      images/reviewer-1.jpg to -5.jpg and images/review-photo-1.jpg to -4.jpg
//   no reviews   images/no-reviews.png


// ---------- every trip on the site ----------
// nepal trips come from each activity, other countries from destination-data.js
// style, difficulty and price are sample values for now (in wordpress they come from each trip post)
const tripStyles = ['Classic', 'Luxury', 'Family-Friendly', 'Off-the-Beaten-Path'];

function difficultyFor(days) {
  if (days <= 5) return 'Easy';
  if (days <= 10) return 'Moderate';
  return 'Challenging';
}

function priceFor(days, style) {
  const price = Math.max(4500, days * 9500);
  return style === 'Luxury' ? Math.round(price * 1.8) : price;
}

function collectTrips() {
  const list = [];
  const seen = new Set();

  function add(title, daysText, place) {
    if (seen.has(title)) return; // the same title is only added once
    seen.add(title);

    const days = parseInt(daysText, 10);
    const style = tripStyles[list.length % tripStyles.length];

    list.push({
      slug: toSlug(title),
      title,
      place,
      daysText,
      style,
      difficulty: difficultyFor(days),
      days,
      price: priceFor(days, style),
      order: list.length
    });
  }

  Object.values(activities).forEach(activity => {
    activity.packages.forEach(([title, days]) => add(title, days, 'Nepal'));
  });

  Object.values(destinations).forEach(country => {
    country.packages.forEach(([title, days]) => add(title, days, country.name));
  });

  return list;
}


// ---------- sample reviews ----------
// written as { name, rating, date, title, text, photos }
function sampleReviews(place) {
  const text = `${place} Tour was amazing, Sue our guide and the driver were very attentive and very helpful. We were delighted with the service. We hope we found each other again. We absolutely recommend this kind of tour if you like to travel with style, know all the important places and learn the culture.`;
  const photos = [1, 2, 3, 4].map(n => `review-photo-${n}`);

  return [
    { name: 'Franskteinstein Handourgh', rating: 4, date: '2026-01-19', title: 'Absolutely Loved the experiences at the right place in the right time!', text, photos, avatar: 'reviewer-1' },
    { name: 'Sara Leight', rating: 5, date: '2026-01-17', title: 'The best trip we have taken as a family', text, photos, avatar: 'reviewer-2' },
    { name: 'Saikush Shakya', rating: 4, date: '2026-01-12', title: 'Great guides and a very well planned route', text, photos, avatar: 'reviewer-3' },
    { name: 'Maya Gurung', rating: 5, date: '2025-12-28', title: 'Every day was better than the last', text, photos: [], avatar: 'reviewer-4' },
    { name: 'Tom Becker', rating: 3, date: '2025-12-02', title: 'Good trip, a few long drives', text, photos: [], avatar: 'reviewer-5' }
  ];
}


// ---------- best time to go for each country ----------
const bestSeasons = {
  Nepal: 'Sept-Nov', Thailand: 'Nov-Feb', Indonesia: 'Apr-Oct', Maldives: 'Nov-Apr',
  Tibet: 'Apr-Oct', India: 'Oct-Mar', Bhutan: 'Mar-May'
};


// ---------- sample content for any trip ----------
// info is { slug, title, place, days, price }
function buildTrip(info) {
  const { title, place, days } = info;
  const nights = Math.max(days - 1, 0);

  return {
    location: place,
    min: 2,
    max: 12,

    overview: [
      `Discover the best of ${place} on this ${days}-day journey. From famous landmarks to quiet corners that most visitors never see, ${title} is planned to show you the real character of the place, with comfortable stays, friendly local guides and plenty of time to enjoy every stop.`,
      `Every day is carefully paced, so there is time for sightseeing, good food and rest. Our team looks after transport, permits and bookings, and your guide is with you along the way to share stories, answer questions and help with anything you need.`
    ],

    facts: {
      pax: '2-12',
      season: bestSeasons[place] || 'All year',
      difficulty: difficultyFor(days),
      flight: 'Flight Excluded',
      guide: 'English Guide',
      pet: 'No'
    },

    highlights: [
      `See the best-known sights of ${place} with an experienced local guide`,
      `Taste real local food at busy markets and family-run restaurants`,
      `Meet local people and learn about their daily life and traditions`,
      `Enjoy wide views and quiet moments away from the crowds`
    ],

    itinerary: buildItinerary(place, days),

    includes: [
      `Hotel accommodation for ${nights} nights`,
      'Daily breakfast',
      'Airport pickup and drop off',
      'Private transport for all sightseeing',
      'English-speaking local guide',
      'Entry fees to listed attractions',
      'All applicable local taxes'
    ],
    excludes: [
      'International airfare',
      'Visa fees and travel insurance',
      'Meals not mentioned in the itinerary',
      'Personal expenses (shopping, laundry, tips, etc.)',
      'Optional tours and activities',
      'Services not listed under "Includes"'
    ],

    knowBefore: [
      ['fa-passport', 'Visas & Entry', [`Check the visa rules for ${place} for your nationality before booking`, 'Passport must be valid for at least 6 months from date of entry', 'Keep a printed copy of your hotel and return flight details']],
      ['fa-calendar-check', 'Best Time to Visit', [`The best months to visit ${place} are ${bestSeasons[place] || 'all year round'}`, 'Book early for festival dates and holiday seasons']],
      ['fa-sack-dollar', 'Money & Budget', ['Carry some local cash for small shops and tips', 'Cards are accepted in most hotels and larger restaurants', 'Tell your bank before you travel so your card is not blocked']],
      ['fa-heart-pulse', 'Health & Safety', ['Drink bottled or filtered water', 'Carry a small first aid kit and any personal medicine', 'Travel insurance that covers medical care is strongly recommended']],
      ['fa-hands-praying', 'Cultural Etiquette & Customs', ['Dress modestly when visiting temples and religious sites', 'Ask before taking photos of people', 'Remove your shoes where asked']]
    ],

    pack: [
      ['fa-shirt', 'Clothing & Footwear', ['Lightweight breathable shirts', 'Long trousers or skirt for temples', 'Comfortable walking shoes', 'Light rain jacket or poncho', 'Warm layer for cool evenings', 'Sun hat or wide-brim hat']],
      ['fa-toolbox', 'Gear & Equipment', ['Small daypack', 'Reusable water bottle', 'Power bank and travel adapter', 'Sunglasses']],
      ['fa-kit-medical', 'Health & Toiletries', ['Sunscreen and lip balm', 'Insect repellent', 'Hand sanitiser', 'Personal medicine']],
      ['fa-box-open', 'Optional', ['Camera', 'Travel pillow', 'A good book for long drives']]
    ],

    goodToKnow: [
      [`Make the Most of ${place}`, ['Start sightseeing early to beat the crowds and the midday heat', 'Keep small notes for tips and street food', 'Ask your guide for local food tips, they always know the best spots']],
      ['Local Culture at a Glance', ['A smile and a polite greeting go a long way', 'Use your right hand when giving or receiving things']],
      ['Common Tourist Scams', ['Agree on taxi prices before the ride or use a metered taxi', 'Be careful with people offering "free" tours or closed-attraction stories']],
      [`Staying Healthy in ${place}`, ['Drink plenty of water, especially on hot days', 'Rest well the first day to adjust to the new time zone']]
    ],

    faqs: [
      [`Do I need a visa to travel to ${place}?`, 'Most travellers need a tourist visa. Requirements depend on your nationality, and we can help with the application process.'],
      ['Will there be an English-speaking guide?', 'Yes, English-speaking guides are provided during all sightseeing tours.'],
      ['Can this trip be customised?', 'Yes, we can add or remove days, upgrade hotels or change activities to suit you.'],
      [`What is the best time to visit ${place}?`, `The best months are ${bestSeasons[place] || 'all year round'}, but the trip runs all year.`],
      ['What kind of accommodation is included?', 'Comfortable 3 to 4 star hotels in good locations. Upgrades are available on request.']
    ],

    // nepal trips get sample reviews, other trips start with none, so the "no reviews" screen shows
    reviews: place === 'Nepal' ? sampleReviews(place) : []
  };
}


// ---------- sample day by day plan ----------
function buildItinerary(place, days) {
  if (days <= 1) {
    return [{
      title: `Full Day in ${place}`,
      route: 'Hotel pickup → Sightseeing → Hotel drop off',
      stay: 'Not included',
      meal: 'Lunch',
      text: [`A full day with your guide to see the highlights of ${place}, with pickup and drop off at your hotel.`]
    }];
  }

  const middleTitles = ['Sightseeing and Local Culture', 'Into the Countryside', 'Adventure Day', 'Markets and Local Food', 'Free Day at Your Own Pace'];
  const plan = [];

  for (let day = 1; day <= days; day++) {
    if (day === 1) {
      plan.push({
        title: `Arrive in ${place}`,
        route: 'Airport → Hotel',
        stay: 'City hotel',
        meal: 'Welcome dinner',
        text: [`Welcome to ${place}! Our team meets you at the airport and takes you to your hotel. Rest after your journey, then join a short walk around the neighbourhood and a welcome dinner.`],
        highlight: 'A friendly local representative will greet you at the airport, help with your bags and take you to your hotel.'
      });
    } else if (day === days) {
      plan.push({
        title: `Departure from ${place}`,
        route: 'Hotel → Airport',
        stay: 'Not included',
        meal: 'Breakfast',
        text: ['Enjoy a last breakfast and some free time for shopping before we drop you at the airport for your flight home.']
      });
    } else {
      plan.push({
        title: middleTitles[(day - 2) % middleTitles.length],
        route: 'Guided day with your local guide',
        stay: 'Hotel',
        meal: 'Breakfast',
        text: [`Another full day exploring ${place} with your guide, at a comfortable pace with plenty of time for photos, food and rest.`]
      });
    }
  }

  return plan;
}


// ---------- trips with their own content ----------
// anything written here replaces the sample content for that trip
const tripDetails = {

  'wonders-of-bangkok': {
    location: 'Bangkok',
    min: 3,
    max: 8,

    overview: [
      "Discover the timeless beauty and modern wonders of Bangkok on this immersive 5-day journey. From the glittering spires of ancient temples to the electric pulse of vibrant night markets, Bangkok captivates at every turn. Experience ballet events, seasonal delicacies, traditional cuisine, and the best hospitality as your guide shows you around.",
      "Take time to relax after your journey, or enjoy a cycling tour around the city's neighbourhoods to get your first glimpse of the city's enchanting atmosphere. Overnight stay in Bangkok."
    ],

    facts: { pax: '3-8', season: 'Nov-Feb', difficulty: 'Easy', flight: 'Flight Excluded', guide: 'English Guide', pet: 'Yes' },

    highlights: [
      "Explore Bangkok's iconic temples including Wat Phra Kaew and Wat Arun in all their golden splendour",
      'Navigate floating markets and ancient canals on a private longtail boat tour',
      'Taste authentic Thai street food on a guided culinary night walk through Chinatown',
      'Cruise the Chao Phraya River at sunset past temples and palaces'
    ],

    itinerary: [
      {
        title: 'Arrive in Bangkok, Gateway to the Kingdom',
        route: 'Bangkok International Airport → City Centre',
        stay: 'Hotel Canyon Bikl',
        meal: 'Michelin-starred Nahm',
        text: [
          'Your journey begins in the vibrant capital of Thailand, where modern city life blends seamlessly with traditional culture. Upon arrival in Bangkok, settle into your hotel and take time to explore the lively surroundings at your own pace. Walk through local streets, enjoy authentic Thai cuisine, and experience the city\'s energetic atmosphere.',
          "As evening arrives, discover Bangkok's illuminated skyline, riverside cafés, and bustling markets that create the perfect first impression of this exciting destination."
        ],
        highlight: 'Tour Bangkok Package Tour begins when you arrive at Bangkok International Airport. A friendly local representative will greet you, assist with immigration and baggage claim, and escort you to your hotel in the heart of the city.',
        places: [
          ['International Airport', "Arrive at Bangkok International Airport, the gateway to Thailand's vibrant capital."],
          ['Riverside Cafés', "Escape into the relaxing atmosphere of Bangkok's riverside cafés, where scenic waterfront views meet local charm."],
          ['Markets', 'From lively floating markets and traditional local bazaars to modern night markets and shopping streets.']
        ]
      },
      {
        title: "Discover Bangkok's Royal & Cultural Heritage",
        route: 'Grand Palace → Wat Phra Kaew → Wat Pho → Wat Arun',
        stay: 'Hotel Canyon Bikl',
        meal: 'Breakfast',
        text: ['A full day among the golden temples and royal buildings that made Bangkok famous, with your guide sharing the history behind every stop.']
      },
      {
        title: 'Experience Local Life & Floating Markets',
        route: 'ICONSIAM → Chao Phraya River → Mahanakhon SkyWalk',
        stay: 'Hotel Canyon Bikl',
        meal: 'Breakfast',
        text: ['Ride along the river, shop at ICONSIAM and finish the day high above the city on the glass floor of the Mahanakhon SkyWalk.']
      },
      {
        title: 'Explore Modern Bangkok',
        route: 'Damnoen Saduak Floating Market → Maeklong Railway Market',
        stay: 'Hotel Canyon Bikl',
        meal: 'Breakfast',
        text: ['Head out of the city to the famous floating market and the railway market, where stalls fold back every time the train passes.']
      },
      {
        title: 'Final Moments & Departure',
        route: 'Hotel → Bangkok International Airport',
        stay: 'Not included',
        meal: 'Breakfast',
        text: ['Enjoy a last breakfast and some free time for shopping before your transfer to the airport.']
      }
    ],

    includes: [
      'Hotel accommodation for 4 nights',
      'Daily breakfast',
      'Selected meals as per itinerary',
      'Longtail boat tour on the Bangkok canals',
      'Private transport for all sightseeing',
      'Entry fees to listed attractions',
      'All applicable local taxes'
    ],

    knowBefore: [
      ['fa-passport', 'Visas & Entry', ['Most nationalities receive a 30-day visa on arrival for Thailand', 'Passport must be valid for at least 6 months from date of entry', 'Visa on arrival fee: THB 2,000 (about $55 USD), have cash ready', 'Return or onward ticket may be requested at immigration', 'E-Visa available in advance for a smoother arrival']],
      ['fa-calendar-check', 'Best Time to Visit', ['November to February is cool and dry', 'March to May is very hot, June to October brings rain showers']],
      ['fa-sack-dollar', 'Money & Budget', ['The local currency is the Thai baht (THB)', 'ATMs are everywhere but charge a fee for foreign cards', 'Street food meals cost about THB 50 to 100']],
      ['fa-heart-pulse', 'Health & Safety', ['Drink bottled water', 'Use sunscreen and stay in the shade at midday', 'Travel insurance is strongly recommended']],
      ['fa-hands-praying', 'Cultural Etiquette & Customs', ['Cover shoulders and knees in temples', 'Never touch anyone on the head', 'Always speak respectfully about the Thai royal family']]
    ],

    pack: [
      ['fa-shirt', 'Clothing & Footwear', ['Lightweight breathable shirts', 'Long trousers/skirt (temples)', 'Comfortable walking sandals', 'Slip-on shoes for easy temple entry', 'Light rain jacket / poncho', 'Swimwear for beach days', 'Sun hat or wide-brim hat']],
      ['fa-toolbox', 'Gear & Equipment', ['Small daypack', 'Reusable water bottle', 'Power bank and travel adapter (type A, B or C)', 'Sunglasses']],
      ['fa-kit-medical', 'Health & Toiletries', ['Sunscreen', 'Insect repellent', 'Hand sanitiser', 'Personal medicine']],
      ['fa-box-open', 'Optional', ['Camera', 'Small umbrella', 'Phrasebook or translation app']]
    ],

    goodToKnow: [
      ['Make the Most of Bangkok', ['Visit major temples early morning (before 9am) to beat crowds and midday heat', 'Always negotiate tuk-tuk prices before boarding, agree on a fare first', 'Wear comfortable walking sandals', 'BTS Skytrain and MRT are the fastest and cheapest ways to get around central Bangkok', '7-Eleven stores are everywhere and great for affordable snacks and cold drinks', "Download Google Translate with Thai offline, it's a lifesaver in local markets"]],
      ['Thai Culture at a Glance', ['The traditional greeting is the "wai", a small bow with palms pressed together', 'Keep your voice calm, losing your temper is seen as rude']],
      ['Common Tourist Scams', ['Ignore anyone who says the Grand Palace is closed today', 'Use metered taxis or ride apps instead of fixed-price offers']],
      ['Staying Healthy in Bangkok', ['Drink lots of water in the heat', 'Choose busy street food stalls, the food is fresh']]
    ],

    faqs: [
      ['Do I need a visa to travel to Thailand?', 'Most travellers get a visa on arrival or can enter visa-free. Requirements depend on your nationality, and we can help with the process.'],
      ['Will there be an English-speaking guide?', 'Yes, English-speaking guides are provided during all major sightseeing tours.'],
      ['Is this trip suitable for children?', 'Yes, the pace is easy and the activities suit all ages.'],
      ['What is the best time to visit Bangkok?', 'November to February, when the weather is cooler and dry.'],
      ['What kind of accommodation is included?', 'A comfortable 4 star hotel in central Bangkok for all 4 nights.']
    ],

    reviews: sampleReviews('Bangkok')
  }

};
