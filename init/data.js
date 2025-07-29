const sampleListings = [
  {
    title: 'Cliffside Haven in Big Sur',
    description: 'Perched on the cliffs of Big Sur, this stunning retreat offers breathtaking views and a peaceful escape from the city.',
    image: 'https://wallpapercave.com/wp/wp4956754.jpg',
    price: 1800,
    location: 'Big Sur',
    country: 'United States',
    __v: 0
  },
  {
    title: "Cliffside Haven in Big Sur",
    description: "Perched on the cliffs of Big Sur, this stunning retreat offers breathtaking views and a peaceful escape from the city.",
    image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Big Sur",
    country: "United States"
  },
  {
    title: "Modern Studio in Berlin",
    description: "Experience the cultural capital of Germany in this sleek studio apartment near the Berlin Wall Memorial.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Berlin",
    country: "Germany"
  },
  {
    title: "Alpine Chalet with Hot Tub",
    description: "Relax in the private hot tub while taking in panoramic mountain views in this cozy Swiss chalet.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    price: 2800,
    location: "Zermatt",
    country: "Switzerland"
  },
  {
    title: "Vintage Farmhouse Retreat",
    description: "Reconnect with nature at this beautifully restored farmhouse, surrounded by rolling countryside and fresh air.",
    image: "https://i1.wp.com/beautifulplacestovisit.com/wp-content/uploads/2011/05/Tour_eiffel_paris-eiffel_tower.jpg",
    price: 900,
    location: "Tuscany",
    country: "Italy"
  },
  {
    title: "Luxury Beachfront Condo",
    description: "Step into paradise in this high-end beachfront condo with modern amenities and uninterrupted ocean views.",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Gold Coast",
    country: "Australia"
  },
  {
    title: "Chic Apartment in Paris",
    description: "Wake up to the Eiffel Tower in this elegantly designed apartment in the heart of Paris.",
    image: "https://th.bing.com/th?id=OIF.%2bsVBNibmoIOB506M9uvReQ&rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 2400,
    location: "Paris",
    country: "France"
  },
  {
    title: "Tropical Bungalow in Hawaii",
    description: "Enjoy island life in this private bungalow surrounded by lush greenery and just minutes from the beach.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Maui",
    country: "United States"
  },
  {
    title: "Zen Hideaway in Kyoto",
    description: "A peaceful, traditional Japanese home with a garden and tatami rooms for a truly immersive experience.",
    image: "https://tse2.mm.bing.net/th/id/OIP.OZcvJQWOy88Vc955KQv5FAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 1700,
    location: "Kyoto",
    country: "Japan"
  },
  {
    title: "Eco Lodge in Costa Rica",
    description: "Stay in a sustainable eco-lodge nestled in the rainforest with nature trails and wildlife at your doorstep.",
    image: "https://th.bing.com/th?id=OIF.wevF8QWU2ya%2bqraqAvJeCQ&rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 1300,
    location: "Monteverde",
    country: "Costa Rica"
  },
  {
    title: "Desert Villa in Dubai",
    description: "Luxurious villa in the heart of the desert with pool, modern interiors, and starry night views.",
    image: "https://tse1.mm.bing.net/th/id/OIP.3e2JV-muxajBJTv9DeHaYgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 3000,
    location: "Dubai",
    country: "UAE"
  },
  {
    title: "Historic Townhouse in Edinburgh",
    description: "Charming stone townhouse close to Edinburgh Castle and local pubs.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60",
    price: 1400,
    location: "Edinburgh",
    country: "Scotland"
  },
  {
    title: "Snow Cabin in Norway",
    description: "A warm wooden cabin ideal for skiing trips and Northern Lights viewing.",
    image: "https://tse1.mm.bing.net/th/id/OIP.NPdqKra1wfMcm68cOGvOpAHaFf?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 1600,
    location: "Tromsø",
    country: "Norway"
  },
  {
    title: "Artistic Loft in Buenos Aires",
    description: "Bohemian-style loft filled with local art, close to tango clubs and cafes.",
    image: "https://tse2.mm.bing.net/th/id/OIP.pFlmwEwnXvnGJVCwtYjMKgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 1000,
    location: "Buenos Aires",
    country: "Argentina"
  },
  {
    title: "Garden Cottage in Cambridge",
    description: "Quaint cottage with private garden in the academic heart of the UK.",
    image: "https://tse4.mm.bing.net/th/id/OIP.BxXZRnzFyPv81SrZX3Z32wHaDt?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 1200,
    location: "Cambridge",
    country: "United Kingdom"
  },
  {
    title: "Boho Flat in Barcelona",
    description: "Colorful, sunlit flat with balcony views near La Rambla.",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Barcelona",
    country: "Spain"
  },
  {
    title: "Seaside House in Santorini",
    description: "Traditional white house with a blue dome and caldera view.",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/590927298.jpg?k=b94f397618daa553fbcfc014179cb93c69513a7d770973acf0250794dfa9f7a6&o=",
    price: 2500,
    location: "Santorini",
    country: "Greece"
  },
  {
    title: "Jungle Treehouse in Thailand",
    description: "Elevated bamboo treehouse in a tropical paradise.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=60",
    price: 850,
    location: "Chiang Mai",
    country: "Thailand"
  },
  {
    title: "Ice Hotel in Sweden",
    description: "Sleep on ice in this famous hotel made entirely of snow and ice.",
    image: "https://www.icehotel.com/sites/cb_icehotel/files/icehotel-art-suite-haven.jpg",
    price: 3200,
    location: "Jukkasjärvi",
    country: "Sweden"
  },
  {
    title: "Safari Tent in Kenya",
    description: "Glamp in style with wildlife safaris just outside your luxury tent.",
    image: "https://www.myglobalviewpoint.com/wp-content/uploads/2023/08/Most-Beautiful-Places-in-Pakistan-featured-image-1170x780.jpg",
    price: 1800,
    location: "Masai Mara",
    country: "Kenya"
  },
  {
    title: "Canal House in Amsterdam",
    description: "Charming canal-side home with bike rentals included.",
    image: "https://cf.bstatic.com/xdata/images/hotel/max300/33625719.jpg?k=201a4ce3805730d3f592fbf7ad883fc5210563227e4b17691455982a30754f0f&o=",
    price: 1500,
    location: "Amsterdam",
    country: "Netherlands"
  },
  {
    title: 'JK Temple',
    description: 'Place of Lord Krishna And Radha Rani',
    price: '0',
    location: 'Kanpur',
    country: 'India',
    image: 'https://tse2.mm.bing.net/th/id/OIP.mZbX9osH3GGV3QyaIlr0AgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3'
  }
];

// db.listings.insertMany(sampleListings);
// console.log(sampleListings[0].image);
module.exports = { data: sampleListings };
