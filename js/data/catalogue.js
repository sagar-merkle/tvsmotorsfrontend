/* Vehicle catalogue: every vehicle the personalised view can feature.
   Content lives on the front end; the backend only returns a vehicle id. */
window.TVS = window.TVS || {};

(function () {
  var IMG = "assets/img/";
  var BNR = "assets/img/banners/";

  function banner(id, ext) {
    ext = ext || "webp";
    return { desktop: BNR + id + "-desktop." + ext, mobile: BNR + id + "-mobile." + ext };
  }

  TVS.catalogue = {
    "apache-rtx": {
      name: "TVS Apache RTX", category: "motorcycles",
      card: IMG + "apache-rtx.webp", banner: banner("apache-rtx"),
      tagline: "Indian Motorcycle of the Year",
      summary: "A 299.1 cc adventure tourer built to take on every terrain.",
      price: "1,99,500", specs: [["Engine", "299.1 cc"], ["Power", "36 PS"], ["Weight", "180 kg"]],
      url: "https://www.tvsmotor.com/premium/tvs-apache/apache-rtx"
    },
    "apache-rr-310": {
      name: "TVS Apache RR 310", category: "motorcycles",
      card: IMG + "apache-rr-310.webp", banner: banner("apache-rr-310"),
      tagline: "Race-derived. Road-ready.",
      summary: "A high-performance 312 cc supersport with track-bred technology.",
      price: "2,66,190", specs: [["Engine", "312.12 cc"], ["Power", "38 PS"], ["Weight", "174 kg"]],
      url: "https://www.tvsmotor.com/tvs-apache/rr-310"
    },
    "apache-rtr-310": {
      name: "TVS Apache RTR 310", category: "motorcycles",
      card: IMG + "apache-rtr-310.webp", banner: banner("apache-rtr-310"),
      tagline: "Unleash the Freestyle Sport",
      summary: "A 312 cc naked sports bike, available in 3 variants and 2 colours.",
      price: "2,29,990", specs: [["Engine", "312.12 cc"], ["Power", "35.6 PS"], ["Weight", "169 kg"]],
      url: "https://www.tvsmotor.com/tvs-apache/apache-rtr-310"
    },
    "apache-rtr-series": {
      name: "TVS Apache RTR Series", category: "motorcycles",
      card: IMG + "apache-rtr-series.webp", banner: banner("apache-rtr-series"),
      tagline: "Racing DNA in every RTR",
      summary: "The iconic RTR 160, 180 and 200 4V with race-bred performance and tech.",
      price: "1,13,890", specs: [["Variants", "160 / 180 / 200"]],
      url: "https://www.tvsmotor.com/tvs-apache"
    },
    "ronin": {
      name: "TVS Ronin", category: "motorcycles",
      card: IMG + "ronin.webp", banner: banner("ronin"),
      tagline: "Unscripted",
      summary: "A stylish 225 cc modern-retro motorcycle that's evolved like no other.",
      price: "1,30,790", specs: [["Engine", "225.9 cc"], ["Power", "20.4 PS"], ["Weight", "160 kg"]],
      url: "https://www.tvsmotor.com/tvs-ronin"
    },
    "raider": {
      name: "TVS Raider 125", category: "motorcycles",
      card: IMG + "raider.webp", banner: banner("raider"),
      tagline: "Wicked smart 125",
      summary: "India's first commuter bike with a connected TFT console and iGO assist.",
      price: "84,460", specs: [["Engine", "124.8 cc"], ["Power", "8.37 kW"], ["Weight", "123 kg"]],
      url: "https://www.tvsmotor.com/tvs-raider"
    },
    "new-radeon": {
      name: "TVS New Radeon", category: "motorcycles",
      card: IMG + "new-radeon.webp", banner: banner("new-radeon"),
      tagline: "The smarter everyday commuter",
      summary: "Digital cluster, LED lamps and the trusted Radeon mileage.",
      price: "67,100", specs: [["Engine", "109.7 cc"], ["Power", "6.03 kW"], ["Weight", "113 kg"]],
      url: "https://www.tvsmotor.com/commuter/tvs-radeon/digi"
    },
    "radeon": {
      name: "TVS Radeon", category: "motorcycles",
      card: IMG + "radeon.webp", banner: banner("radeon"),
      tagline: "20 best-in-class features",
      summary: "15% more mileage and best-in-class features for the daily commute.",
      price: "59,950", specs: [["Engine", "109.7 cc"], ["Power", "6.03 kW"], ["Weight", "113 kg"]],
      url: "https://www.tvsmotor.com/tvs_radeon"
    },
    "sport": {
      name: "TVS Sport", category: "motorcycles",
      card: IMG + "sport.webp", banner: banner("sport"),
      tagline: "Built for mileage",
      summary: "A light, reliable 110 cc commuter made for every day.",
      price: "59,100", specs: [["Engine", "109.7 cc"], ["Power", "6.03 kW"], ["Weight", "112 kg"]],
      url: "https://www.tvsmotor.com/tvs-sport"
    },
    "ntorq-150": {
      name: "TVS Ntorq 150", category: "scooters",
      card: IMG + "ntorq-150.webp", banner: banner("ntorq-150"),
      tagline: "The hyper sport scooter",
      summary: "149.7 cc of race-bred performance with connected tech.",
      price: "1,12,900", specs: [["Engine", "149.7 cc"], ["Power", "9.7 kW"], ["Weight", "115 kg"]],
      url: "https://www.tvsmotor.com/commuter/tvs-ntorq/ntorq-150"
    },
    "ntorq-125": {
      name: "TVS Ntorq 125", category: "scooters",
      card: IMG + "ntorq-125.webp", banner: banner("ntorq-125"),
      tagline: "Race-inspired editions",
      summary: "A sporty 125 cc scooter with SmartXonnect and race-inspired styling.",
      price: "84,350", specs: [["Engine", "124.8 cc"], ["Power", "7.5 kW"], ["Weight", "110 kg"]],
      url: "https://www.tvsmotor.com/commuter/tvs-ntorq/ntorq-125"
    },
    "jupiter": {
      name: "TVS Jupiter", category: "scooters",
      card: IMG + "jupiter.webp", banner: banner("jupiter"),
      tagline: "India's 1st spectral colour scooter",
      summary: "ETFi technology, a digital-analogue speedometer and exceptional comfort.",
      price: "74,400", specs: [["Engine", "113.3 cc"], ["Power", "5.9 kW"], ["Weight", "106 kg"]],
      url: "https://www.tvsmotor.com/tvs-jupiter/jupiter-disc-smartxonnect"
    },
    "jupiter-125": {
      name: "TVS Jupiter 125", category: "scooters",
      card: IMG + "jupiter-125.webp", banner: banner("jupiter-125"),
      tagline: "More space, more comfort",
      summary: "ETFi technology with a mobile charging function and big under-seat storage.",
      price: "82,100", specs: [["Engine", "124.76 cc"], ["Power", "6 kW"], ["Weight", "108 kg"]],
      url: "https://www.tvsmotor.com/tvs-jupiter-125/disc"
    },
    "zest-110": {
      name: "TVS Zest 110", category: "scooters",
      card: IMG + "zest-110.webp", banner: banner("zest-110"),
      tagline: "Light, peppy, made for you",
      summary: "A 110 cc scooter with ETFi technology and great everyday features.",
      price: "71,350", specs: [["Engine", "109.7 cc"], ["Power", "5.75 kW"], ["Weight", "103 kg"]],
      url: "https://www.tvsmotor.com/tvs-zest"
    },
    "iqube": {
      name: "TVS iQube", category: "electric",
      card: IMG + "iqube.webp", banner: banner("iqube"),
      tagline: "India's favourite family EV",
      summary: "A smart electric scooter with up to 212 km IDC range and SmartXonnect.",
      price: "1,13,663", specs: [["IDC Range", "212 km*"], ["Battery", "5.3 kWh"], ["Top Speed", "82 km/h"]],
      url: "https://www.tvsmotor.com/electric-scooters/tvs-iqube"
    },
    "tvs-x": {
      name: "TVS X", category: "electric",
      card: IMG + "tvs-x.webp",
      // No official desktop banner available: rendered as a designed banner.
      banner: { desktop: null, mobile: BNR + "tvs-x-mobile.webp" },
      tagline: "Electric goes Thrillectric",
      summary: "Born of thrill: a 105 km/h premium electric scooter with 140 km IDC range.",
      price: "2,66,141", specs: [["IDC Range", "140 km*"], ["Battery", "3.8 kWh"], ["Top Speed", "105 km/h"]],
      url: "https://www.tvsmotor.com/electric-scooters/tvs-x"
    },
    "orbiter": {
      name: "TVS Orbiter", category: "electric",
      card: IMG + "orbiter.webp", banner: banner("orbiter"),
      tagline: "Built for convenience",
      summary: "An affordable electric scooter with 158 km IDC range and unmatched comfort.",
      price: "99,250", specs: [["IDC Range", "158 km*"], ["Battery", "3.1 kWh"]],
      url: "https://www.tvsmotor.com/electric-scooters/tvs-orbiter"
    },
    "xl100": {
      name: "TVS XL100", category: "mopeds",
      card: IMG + "xl100.webp", banner: banner("xl100"),
      tagline: "Har kaam ka partner",
      summary: "India's trusted 99.7 cc moped, built to carry every load.",
      price: "48,250", specs: [["Engine", "99.7 cc"], ["Power", "3.2 kW"], ["Weight", "88 kg"]],
      url: "https://www.tvsmotor.com/commuter/tvs-xl100"
    },
    "king-deluxe": {
      name: "TVS King Deluxe", category: "three-wheelers",
      card: IMG + "king-deluxe.webp", banner: banner("king-deluxe"),
      tagline: "Built to earn more",
      summary: "A 200 cc passenger auto in CNG, LPG and petrol variants.",
      price: null, specs: [["Engine", "200 cc"], ["Fuel", "CNG / LPG / Petrol"]],
      url: "https://www.tvsmotor.com/three-wheelers/king-deluxe"
    },
    "king-duramax-plus": {
      name: "TVS King Duramax Plus", category: "three-wheelers",
      card: IMG + "king-duramax-plus.webp", banner: banner("king-duramax-plus", "jpg"),
      tagline: "Durable. Powerful. Profitable.",
      summary: "A 225 cc passenger auto available in CNG and petrol variants.",
      price: null, specs: [["Engine", "225 cc"], ["Fuel", "CNG / Petrol"]],
      url: "https://www.tvsmotor.com/three-wheelers/king-duramax-plus"
    },
    "king-ev-max": {
      name: "TVS King EV Max", category: "three-wheelers",
      card: IMG + "king-ev-max.webp", banner: banner("king-ev-max"),
      tagline: "Mushkil raaste, aasaan safar",
      summary: "A lithium-ion electric passenger auto with a 65 km/h top speed.",
      price: null, specs: [["Battery", "Lithium-ion"], ["Top Speed", "65 km/h"]],
      url: "https://www.tvsmotor.com/three-wheelers/king-ev-max"
    },
    "king-kargo": {
      name: "TVS King Kargo", category: "three-wheelers",
      card: IMG + "king-kargo.webp", banner: banner("king-kargo"),
      tagline: "Loads more business",
      summary: "A 225 cc commercial cargo auto available in CNG and LPG variants.",
      price: null, specs: [["Engine", "225 cc"], ["Fuel", "CNG / LPG"]],
      url: "https://www.tvsmotor.com/three-wheelers/king-kargo"
    },
    "king-kargo-hd-ev": {
      name: "TVS King Kargo HD EV", category: "three-wheelers",
      card: IMG + "king-kargo-hd-ev.webp", banner: banner("king-kargo-hd-ev"),
      tagline: "Heavy duty goes electric",
      summary: "A lithium-ion electric cargo loader with 156 km range and 61 km/h top speed.",
      price: null, specs: [["Range", "156 km"], ["Top Speed", "61 km/h"]],
      url: "https://www.tvsmotor.com/three-wheelers/king-kargo-ev-hd"
    },
    "king-kargo-hd-cng": {
      name: "TVS King Kargo HD CNG", category: "three-wheelers",
      card: IMG + "king-kargo-hd-cng.webp", banner: banner("king-kargo-hd-cng"),
      tagline: "Heavy duty, low running cost",
      summary: "A high-quality 4-stroke CNG cargo auto with 61 km/h top speed.",
      price: null, specs: [["Fuel", "CNG"], ["Top Speed", "61 km/h"]],
      url: "https://www.tvsmotor.com/three-wheelers/king-kargo-cng-hd"
    }
  };

  // Discover Your Ride tab radio id for each category.
  TVS.categoryTab = {
    "motorcycles": "tab-moto",
    "scooters": "tab-scooter",
    "electric": "tab-electric",
    "mopeds": "tab-moped",
    "three-wheelers": "tab-three"
  };
})();
