// content for every activity detail page
// activity-detail.html is one template, activity-detail.js fills it from this list
// to add an activity, copy one block, change the text and add its photos to the images folder
// in wordpress each activity becomes a post and these fields become custom fields

// photo names used for each activity (put them in the images folder):
//   about   ->  images/about-[slug].jpg     e.g. images/about-trekking.jpg
//   cards   ->  images/[region or package name with dashes].jpg   e.g. images/everest-region.jpg

// regions are written as ['name', number of packages]
// packages are written as ['title', 'days']
// faqs are written as ['question', 'answer']


const activities = {

  'trekking': {
    name: 'Trekking',
    titleStart: 'Explore Breathtaking',
    titleBold: 'Trekking Trails',
    intro: "Embark on a journey to explore destinations perfectly suited for your travel aspirations. Whether you're seeking thrilling adventures, serene getaways, or rich cultural experiences, there's a world of possibilities waiting for you. Discover breathtaking landscapes, vibrant cities, and hidden gems that promise unforgettable memories and stories to cherish forever. From short hikes to long high-altitude treks, there is a trail for every level.",
    regions: [['Everest Region', 12], ['Annapurna Region', 12], ['Langtang Region', 12], ['Manaslu Region', 12], ['Kanchenjunga Region', 12], ['Dolpo Region', 12], ['Mustang Region', 12], ['Makalu Region', 12]],
    aboutTitle: 'Trekking in Nepal',
    about: "Nepal is one of the best trekking countries in the world. Trails lead through rhododendron forests, terraced farmland and mountain villages to viewpoints below the highest peaks on earth, with teahouses to rest in along the way.",
    reasonsTitle: 'Reasons to Trek in Nepal',
    reasons: [
      'Home to some of the most iconic trekking routes, including Everest Base Camp and Annapurna Circuit.',
      'Trek amidst the breathtaking Himalayan peaks, valleys, and glaciers.',
      'Interact with diverse ethnic groups, experience local hospitality, and explore traditional villages.',
      'Options range from easy short treks to challenging high-altitude expeditions.',
      'Walk through varied ecosystems, from lush forests to alpine meadows and arid landscapes.',
      'Visit sacred sites, monasteries, and prayer flags dotting the trails, offering a spiritual connection.',
      'Explore traditional villages, interact with diverse ethnic groups, and enjoy the warm hospitality of the locals.'
    ],
    packages: [['Annapurna Wonderland', '7D/6N'], ['Annapurna Luxury Trip', '5D/4N'], ['Everest Hiking Trip', '12D/11N'], ['Jomsom Muktinath Tour', '5D/4N'], ['Langtang Valley Trek', '8D/7N'], ['Upper Mustang Trek', '10D/9N']],
    faqs: [
      ['What is the best time to trek in Nepal?', 'The best time to trek in Nepal is during the spring (March to May) and autumn (September to November) seasons, when the weather is clear and stable, offering excellent views.'],
      ['Do I need a permit for trekking in Nepal?', 'Yes. Most trekking areas need a TIMS card and a national park or conservation area permit. We arrange all permits for you.'],
      ['What are the fitness requirements for trekking in Nepal?', 'A basic level of fitness is enough for most treks. Regular walking or light cardio for a few weeks before the trip helps a lot.'],
      ['Are guides or porters necessary for trekking?', 'Guides are required in many regions and make the trek safer and easier. Porters are optional but recommended for longer treks.'],
      ['What should I pack for trekking in Nepal?', 'Layered clothing, good trekking boots, a warm jacket, sleeping bag, water bottle, sunscreen and a basic first aid kit.'],
      ['Is altitude sickness common during trekking?', 'It can happen above 2,500 m. Our itineraries include acclimatisation days and guides are trained to spot the early signs.'],
      ['What accommodation options are available on trekking routes?', 'Most routes have teahouses and lodges with simple rooms and meals. Camping is available on remote routes.']
    ]
  },

  'wildlife-safari': {
    name: 'Wildlife Safari',
    titleStart: 'Discover Wild',
    titleBold: 'Jungle Safaris',
    intro: "Leave the mountains behind and head to the green lowlands of southern Nepal. Ride a jeep through tall grass, glide down the river in a dugout canoe and walk the jungle with an expert naturalist, looking for rhinos, crocodiles, deer and, if you are lucky, a tiger.",
    regions: [['Chitwan National Park', 6], ['Bardia National Park', 4], ['Koshi Tappu', 2], ['Shuklaphanta', 2], ['Parsa National Park', 2], ['Banke National Park', 2]],
    aboutTitle: 'Safaris in Nepal',
    about: "Nepal's national parks protect some of Asia's most famous animals. Chitwan is easy to reach and full of activities, while Bardia in the far west is wilder and quieter, with some of the best chances of seeing a Bengal tiger.",
    reasonsTitle: 'Reasons for a Safari in Nepal',
    reasons: [
      'See the one-horned rhino in the wild in Chitwan and Bardia.',
      'Track the Bengal tiger with experienced local guides.',
      'Spot crocodiles, wild elephants, deer and hundreds of bird species.',
      'Choose between jeep safaris, canoe rides and guided jungle walks.',
      'Learn about the culture and dances of the local Tharu community.',
      'Combine a safari easily with Kathmandu, Pokhara or Lumbini.'
    ],
    packages: [['Chitwan Jungle Safari', '3D/2N'], ['Bardia Tiger Tracking', '5D/4N'], ['Koshi Bird Watching Tour', '3D/2N'], ['Chitwan and Lumbini Tour', '5D/4N']],
    faqs: [
      ['When is the best time for a safari in Nepal?', 'October to March is cool and pleasant. From February to May the tall grass is cut and animals are easier to spot.'],
      ['Is a jungle walk safe?', 'Yes, walks are always led by trained naturalists who know how to keep a safe distance from wildlife.'],
      ['What should I wear on a safari?', 'Light clothes in green or brown colours, comfortable shoes, a hat and insect repellent.'],
      ['How many days do I need?', 'Two nights in Chitwan is enough for a first visit. Bardia is further away, so plan at least four nights.']
    ]
  },

  'cultural-heritage-tour': {
    name: 'Cultural Heritage Tour',
    titleStart: 'Walk Through',
    titleBold: 'Living History',
    intro: 'Nepal is full of temples, palaces and old towns where daily life still follows ancient traditions. Visit royal squares carved from wood and brick, watch pilgrims circle great stupas and explore the birthplace of the Buddha with guides who bring every story to life.',
    regions: [['Kathmandu Durbar Square', 4], ['Bhaktapur', 3], ['Patan', 3], ['Swayambhunath', 2], ['Boudhanath', 2], ['Pashupatinath', 2], ['Lumbini', 3], ['Bandipur', 2]],
    aboutTitle: 'Heritage Tours in Nepal',
    about: 'The Kathmandu Valley alone holds seven UNESCO World Heritage Sites, all within an hour of each other. Beyond the valley, Lumbini and old hill towns like Bandipur show a quieter side of Nepali culture.',
    reasonsTitle: 'Reasons for a Heritage Tour in Nepal',
    reasons: [
      'Visit the royal palaces and temples of Kathmandu, Patan and Bhaktapur.',
      'See the great stupas of Boudhanath and Swayambhunath.',
      'Watch evening rituals by the river at Pashupatinath.',
      'Stand in Lumbini, the birthplace of the Buddha.',
      'Try local food and see traditional crafts like pottery and wood carving.',
      'Join colourful festivals held throughout the year.'
    ],
    packages: [['Kathmandu Valley Heritage Tour', '3D/2N'], ['Bhaktapur Day Tour', '1D'], ['Lumbini Pilgrimage Tour', '4D/3N'], ['Bandipur Culture Trip', '3D/2N']],
    faqs: [
      ['Do I need a guide for heritage sites?', 'It is not required, but a local guide explains the history and stories behind each site.'],
      ['Are there entry fees?', 'Yes, most heritage squares and temples charge a small entry fee, which is included in our packages.'],
      ['What should I wear when visiting temples?', 'Clothes that cover shoulders and knees. Some temples also ask you to remove your shoes.'],
      ['Can these tours be done with children?', 'Yes, heritage tours are easy and suitable for all ages.']
    ]
  },

  'peak-climbing': {
    name: 'Peak Climbing',
    titleStart: 'Reach New',
    titleBold: 'Himalayan Heights',
    intro: 'Ready for more than a trek? Nepal has many trekking peaks between 5,500 and 6,500 metres that are perfect for a first climb. With experienced climbing guides, training and the right gear, you can stand on a real Himalayan summit.',
    regions: [['Island Peak', 3], ['Mera Peak', 3], ['Lobuche East', 2], ['Pisang Peak', 2], ['Yala Peak', 2], ['Chulu West', 2]],
    aboutTitle: 'Peak Climbing in Nepal',
    about: 'Trekking peaks combine a classic trek with a short climbing section on snow and ice. They are the best way to learn mountaineering skills before bigger expeditions.',
    reasonsTitle: 'Reasons to Climb in Nepal',
    reasons: [
      'Climb a real Himalayan summit without a full expedition.',
      'Learn to use crampons, ropes and ice axes with expert guides.',
      'Enjoy huge views of Everest, Lhotse, Makalu and other giants.',
      'Combine the climb with famous treks like Everest Base Camp.',
      'Get a great first step towards bigger mountains.',
      'Travel with a full support team for safety and comfort.'
    ],
    packages: [['Island Peak Climbing', '18D/17N'], ['Mera Peak Expedition', '18D/17N'], ['Lobuche East Climb', '17D/16N'], ['Yala Peak Climb', '13D/12N']],
    faqs: [
      ['Do I need climbing experience?', 'Not for most trekking peaks. Basic training is given before the summit day, but good fitness is important.'],
      ['Do I need a climbing permit?', 'Yes, every peak needs a climbing permit. We arrange it along with your trekking permits.'],
      ['Can I rent climbing gear?', 'Yes, most gear can be rented in Kathmandu or at the base of the climb.'],
      ['What is the best season to climb?', 'Spring (April to May) and autumn (October to November) have the most stable weather.']
    ]
  },

  'rafting': {
    name: 'Rafting',
    titleStart: 'Ride the Wild',
    titleBold: 'Himalayan Rivers',
    intro: "Nepal's glacier-fed rivers make it one of the best rafting countries in the world. Choose a gentle float with the family, a full day of big rapids or a multi-day river journey camping on white sand beaches.",
    regions: [['Trishuli River', 3], ['Bhote Koshi River', 2], ['Seti River', 2], ['Kali Gandaki River', 2], ['Marsyangdi River', 2], ['Sun Koshi River', 2], ['Karnali River', 2]],
    aboutTitle: 'Rafting in Nepal',
    about: 'Rivers are graded by difficulty, so there is a trip for everyone from beginners to experienced paddlers. All trips come with trained river guides, safety kayakers and good quality equipment.',
    reasonsTitle: 'Reasons to Raft in Nepal',
    reasons: [
      'Paddle rivers that start from Himalayan glaciers.',
      'Pick from easy family trips to exciting white-water rapids.',
      'Camp on quiet river beaches under the stars.',
      'Pass villages, gorges and forests that you cannot reach by road.',
      'Travel with trained guides and safety kayakers.',
      'Easily add a rafting day on the way to Pokhara or Chitwan.'
    ],
    packages: [['Trishuli Rafting Day Trip', '1D'], ['Bhote Koshi Adventure', '2D/1N'], ['Seti River Family Rafting', '2D/1N'], ['Karnali River Expedition', '10D/9N']],
    faqs: [
      ['Do I need to know how to swim?', 'It helps, but it is not required. Everyone wears a life jacket and a helmet.'],
      ['What is the best time for rafting?', 'October to December and March to May. Rivers are too high during the monsoon.'],
      ['Is rafting safe for beginners?', 'Yes, choose an easy river like the Trishuli or Seti and listen to the safety briefing.'],
      ['What should I bring?', 'Quick dry clothes, sandals that strap on, sunscreen and a change of clothes.']
    ]
  },

  'mountain-biking': {
    name: 'Mountain Biking',
    titleStart: 'Ride Through',
    titleBold: 'Scenic Trails',
    intro: 'Explore Nepal on two wheels. Ride old village trails around the Kathmandu Valley, fast descents above Pokhara or long high-desert routes through Mustang, with support vehicles and guides who know every turn.',
    regions: [['Kathmandu Valley Rim', 3], ['Nagarkot', 2], ['Pokhara', 3], ['Annapurna Circuit', 2], ['Upper Mustang', 2], ['Chitwan', 1]],
    aboutTitle: 'Mountain Biking in Nepal',
    about: 'From easy half-day rides to tough multi-day adventures, biking is a great way to see rural Nepal up close. Good quality bikes and helmets are available for rent.',
    reasonsTitle: 'Reasons to Bike in Nepal',
    reasons: [
      'Ride single trails through villages and terraced hills.',
      'See mountain views from the saddle on every route.',
      'Choose half-day rides or long multi-day adventures.',
      'Meet local people in places few tourists visit.',
      'Ride with guides and support vehicles on longer trips.',
      'Rent good bikes and gear in Kathmandu and Pokhara.'
    ],
    packages: [['Kathmandu Valley Ride', '1D'], ['Nagarkot Sunrise Ride', '2D/1N'], ['Pokhara Lakeside Trail', '1D'], ['Upper Mustang Bike Tour', '12D/11N']],
    faqs: [
      ['Do I need my own bike?', 'No, we provide good quality mountain bikes and helmets.'],
      ['How fit do I need to be?', 'Short valley rides are fine for most people. Long routes need good fitness.'],
      ['When is the best season?', 'October to April is dry and the trails are in good condition.'],
      ['Is there support on long rides?', 'Yes, longer trips include a guide, mechanic and support vehicle.']
    ]
  },

  'paragliding': {
    name: 'Paragliding',
    titleStart: 'Fly Above the',
    titleBold: 'Himalayas',
    intro: 'Take off from a green hilltop and glide over lakes, forests and villages with the snow peaks right in front of you. Tandem flights with certified pilots mean anyone can fly, no experience needed.',
    regions: [['Sarangkot', 4], ['Bandipur', 2], ['Nagarkot', 1], ['Pokhara Valley', 3]],
    aboutTitle: 'Paragliding in Nepal',
    about: 'Pokhara is known as one of the best places in the world to paraglide, with steady winds and views of the Annapurna range and Phewa Lake. Most flights last between 20 and 60 minutes.',
    reasonsTitle: 'Reasons to Paraglide in Nepal',
    reasons: [
      'Fly with Machapuchare and the Annapurna range in front of you.',
      'Glide over Phewa Lake and the town of Pokhara.',
      'No experience needed, you fly with a certified tandem pilot.',
      'Take home photos and videos of your flight.',
      'Choose short scenic flights or longer cross-country flights.',
      'Combine a flight easily with a Pokhara holiday.'
    ],
    packages: [['Sarangkot Tandem Flight', '1D'], ['Pokhara Cross Country Flight', '1D'], ['Paragliding and Boating Combo', '1D'], ['Bandipur Tandem Flight', '1D']],
    faqs: [
      ['Do I need any experience?', 'No, you fly tandem with a certified pilot who controls the glider.'],
      ['Is there an age or weight limit?', 'Most companies fly guests from about 8 years old and within set weight limits. Ask us for details.'],
      ['What is the best time to fly?', 'October to May has the clearest skies. Morning flights have the best mountain views.'],
      ['What if the weather is bad?', 'Flights only go when it is safe. If a flight is cancelled it is moved to another day or refunded.']
    ]
  },

  'day-tours': {
    name: 'Day Tours',
    titleStart: 'Make the Most of',
    titleBold: 'Every Day',
    intro: 'Short on time? Our day tours show you the best of Nepal in a few hours, from Kathmandu temples and hilltop sunrises to boat rides on Phewa Lake. Perfect before or after a trek, or as part of a short holiday.',
    regions: [['Kathmandu City', 4], ['Nagarkot', 2], ['Pokhara City', 3], ['Bhaktapur', 2], ['Chandragiri Hills', 1], ['Namobuddha', 1]],
    aboutTitle: 'Day Tours in Nepal',
    about: 'Every day tour includes a private vehicle, a friendly local guide and hotel pickup. They are easy, flexible and a great way to see a lot in a short time.',
    reasonsTitle: 'Reasons to Take a Day Tour',
    reasons: [
      'See the highlights of Kathmandu or Pokhara in one day.',
      'Watch the sunrise over the Himalayas from Nagarkot.',
      'Ride the cable car to the top of Chandragiri Hills.',
      'Travel with a private vehicle and local guide.',
      'Fit a tour easily around a trek or a flight.',
      'Suitable for families and travellers of all ages.'
    ],
    packages: [['Kathmandu City Day Tour', '1D'], ['Nagarkot Sunrise Tour', '1D'], ['Pokhara Sightseeing Tour', '1D'], ['Chandragiri Cable Car Tour', '1D']],
    faqs: [
      ['Is hotel pickup included?', 'Yes, all day tours include pickup and drop off from your hotel.'],
      ['Can I change the plan?', 'Yes, day tours are private, so you can add or skip places with your guide.'],
      ['How long is a day tour?', 'Most tours last 6 to 8 hours.'],
      ['Are entry fees included?', 'Entry fees are included in the package price unless it says otherwise.']
    ]
  },

  'boating': {
    name: 'Boating',
    titleStart: 'Slow Down on',
    titleBold: 'Calm Waters',
    intro: 'Glide across calm lakes surrounded by hills and temples. From colourful wooden boats on Phewa Lake to quiet paddles on Begnas and Rara, boating is the easiest way to relax between treks and city days.',
    regions: [['Phewa Lake', 3], ['Begnas Lake', 2], ['Rara Lake', 1], ['Fewa Tal Barahi', 1]],
    aboutTitle: 'Boating in Nepal',
    about: 'Every boating trip includes life jackets, a local boatman and hotel pickup. Row yourself, or sit back while the boatman takes you to temples, viewpoints and quiet corners of the lake.',
    reasonsTitle: 'Reasons to Go Boating',
    reasons: [
      'See the Annapurna range reflected in Phewa Lake on a clear morning.',
      'Visit the Tal Barahi temple on its little island in the middle of the lake.',
      'Paddle the quiet waters of Begnas Lake, away from the crowds.',
      'Watch the sunset from the water with the hills turning gold.',
      'Suitable for families, couples and travellers of all ages.',
      'Easy to add to a Pokhara stay or a paragliding day.'
    ],
    packages: [['Phewa Lake Sunrise Boating', '1D'], ['Begnas Lake Paddle Tour', '1D'], ['Rara Lake Boating Escape', '6D']],
    faqs: [
      ['Do I need to know how to swim?', 'No, everyone wears a life jacket and a boatman is with you on guided trips.'],
      ['Can I row the boat myself?', 'Yes, you can hire a boat to row yourself, or have a boatman row for you.'],
      ['When is the best time to go?', 'Early morning has the calmest water and the clearest mountain views.'],
      ['Is boating suitable for children?', 'Yes, it is one of our most family friendly activities.']
    ]
  },

  'sightseeing': {
    name: 'Sightseeing',
    titleStart: 'See the Stories Behind',
    titleBold: 'Every Place',
    intro: 'Explore ancient cities, heritage sites and local markets with guides who know every story. From the palace squares of Kathmandu, Patan and Bhaktapur to the lakeside streets of Pokhara, our sightseeing tours show you the heart of Nepal.',
    regions: [['Kathmandu Valley', 4], ['Pokhara', 3], ['Lumbini', 2], ['Bandipur', 1]],
    aboutTitle: 'Sightseeing in Nepal',
    about: 'Every sightseeing tour includes a private vehicle, a licensed local guide, entry fees and hotel pickup. Tours are private, so you can go at your own pace and add or skip places along the way.',
    reasonsTitle: 'Reasons to Take a Sightseeing Tour',
    reasons: [
      'Walk through seven UNESCO World Heritage Sites in the Kathmandu Valley.',
      'Hear the history behind the temples, palaces and stupas from a local guide.',
      'Try local food in old markets and courtyards.',
      'Visit Lumbini, the birthplace of the Buddha.',
      'Travel with a private vehicle and a flexible plan.',
      'A great way to start or finish a trekking holiday.'
    ],
    packages: [['Kathmandu Heritage Sightseeing', '2D'], ['Pokhara City Sightseeing', '1D'], ['Lumbini Heritage Visit', '3D']],
    faqs: [
      ['Are entry fees included?', 'Yes, entry fees for the sites on the plan are included in the price.'],
      ['Can I change the places we visit?', 'Yes, all sightseeing tours are private, so the plan can be changed with your guide.'],
      ['How much walking is there?', 'Mostly short, easy walks around the sites, with the vehicle waiting nearby.'],
      ['What should I wear to temples?', 'Clothes that cover the shoulders and knees, and shoes that are easy to take off.']
    ]
  }

};
