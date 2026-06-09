const PHOTO = {
  hero: src="assets/Pizza.jpg",
  about: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1200&q=85",
  pizzaBbq: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  pizzaTikka: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=900&q=85",
  pizzaItalian: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=85",
  burgerZinger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  burgerBeef: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
  deal: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85",
  drink: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=85",
  fries: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=85"
};

window.DEFAULT_SITE_DATA = {
  password: "italian1000",
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  heroImage: PHOTO.hero,
  aboutImage: PHOTO.about,
  about: {
    title: "Fresh ingredients, authentic technique, honest flavor.",
    text: "At Italian Pizza, every order starts with fresh ingredients, hand-prepared dough, and classic Italian cooking techniques adapted for the flavors our customers love. From loaded pizzas to quick family deals, we care about generous portions, consistent taste, and food that arrives hot, satisfying, and made with pride."
  },
  footer: {
    tagline: "Modern Italian-inspired comfort food with dine-in, takeaway, and home delivery.",
    location: "Blue Area, Islamabad",
    address: "Fazal-e-Haq Road, Blue Area, Islamabad",
    mapUrl: "https://maps.google.com/?q=Italian%20Pizza%20Blue%20Area%20Islamabad",
    timings: "Mon-Sat: 11:30 AM - 11:15 PM\nSunday: 3:00 PM - 11:15 PM",
    phones: ["051-2150339", "051-2150340", "0310-9363494", "0332-8519028"],
    facebook: "#",
    tiktok: "#",
    instagram: "#"
  },
  categories: [
    { id: "deals", label: "Deals" },
    { id: "memberDeals", label: "Member Deals" },
    { id: "pizza", label: "Pizza" },
    { id: "burgers", label: "Burgers" },
    { id: "drinks", label: "Drinks" }
  ],
  menu: {
    deals: [
      { id: "deal-01", name: "Deal 01", desc: "1 BBQ medium pizza, 1 zinger burger, 1 drink 1.5L.", price: 2200, image: PHOTO.deal },
      { id: "deal-02", name: "Deal 02", desc: "1 BBQ large pizza, 1 zinger burger, 1 drink 1.5L.", price: 3000, image: PHOTO.deal },
      { id: "deal-03", name: "Deal 03", desc: "1 BBQ regular pizza, 1 zinger burger, 1 drink 345ml.", price: 1440, image: PHOTO.deal },
      { id: "deal-04", name: "Deal 04", desc: "1 BBQ medium pizza, 2 zinger burgers, 1 drink 1.5L.", price: 2220, image: PHOTO.deal },
      { id: "deal-05", name: "Deal 05", desc: "1 BBQ regular pizza, 2 zinger burgers, 1 regular drink.", price: 2980, image: PHOTO.deal },
      { id: "deal-06", name: "Deal 06", desc: "1 BBQ regular pizza, 2 zinger burgers, 1 drink regular.", price: 2240, image: PHOTO.deal },
      { id: "deal-07", name: "Deal 07", desc: "1 BBQ mega pizza, 1 BBQ maxi pizza, 1 drink 1.5L.", price: 3680, image: PHOTO.deal },
      { id: "deal-08", name: "Deal 08", desc: "1 BBQ large pizza, 1 zinger burger, 1 shawarma, 1 drink 1.5L.", price: 4000, image: PHOTO.deal },
      { id: "deal-09", name: "Deal 09", desc: "1 BBQ XL pizza, 1 zinger burger, 1 drink 1.5L.", price: 5780, image: PHOTO.deal },
      { id: "deal-10", name: "Deal 10", desc: "1 BBQ large pizza, 1 BBQ regular pizza, 1 drink 1.5L.", price: 4380, image: PHOTO.deal },
      { id: "deal-11", name: "Deal 11", desc: "1 BBQ XL pizza, 1 BBQ large pizza, 1 drink 1.5L.", price: 6580, image: PHOTO.deal },
      { id: "deal-12", name: "Deal 12", desc: "1 BBQ large pizza, 1 BBQ medium pizza, 1 BBQ regular pizza, 1 drink 1.5L.", price: 6180, image: PHOTO.deal }
    ],
    memberDeals: [
      { id: "member-deal-01", name: "Member Deal 01", desc: "1 BBQ medium pizza, 1 zinger burger, 1 drink 1.5L.", price: 2050, image: PHOTO.deal },
      { id: "member-deal-02", name: "Member Deal 02", desc: "1 BBQ medium pizza, 1 zinger burger, 1 drink 1.5L.", price: 3180, image: PHOTO.deal },
      { id: "member-deal-03", name: "Member Deal 03", desc: "1 BBQ large pizza, 1 zinger burger, 1 drink 1.5L.", price: 4200, image: PHOTO.deal },
      { id: "member-deal-04", name: "Member Deal 04", desc: "1 BBQ XL pizza, 1 BBQ large pizza, 1 drink 1.5L.", price: 5250, image: PHOTO.deal },
      { id: "member-deal-05", name: "Member Deal 05", desc: "2 zinger burgers, 1 drink 1.5L.", price: 3000, image: PHOTO.deal },
      { id: "member-deal-06", name: "Member Deal 06", desc: "2 BBQ large pizzas, 1 zinger burger, 1 drink 1.5L.", price: 4550, image: PHOTO.deal },
      { id: "member-deal-07", name: "Member Deal 07", desc: "1 BBQ XL pizza, 2 zinger burgers, 1 drink 1.5L.", price: 5550, image: PHOTO.deal },
      { id: "member-deal-08", name: "Member Deal 08", desc: "2 BBQ large pizzas, 1 zinger burger, 1 drink 1.5L.", price: 6590, image: PHOTO.deal },
      { id: "birthday-01", name: "Birthday Deal 01", desc: "3 BBQ medium pizzas, 3 zinger burgers, 1 cake, 1 drink 1.5L.", price: 5200, image: PHOTO.deal },
      { id: "birthday-02", name: "Birthday Deal 02", desc: "3 BBQ large pizzas, 3 zinger burgers, 1 cake, 1 drink 1.5L.", price: 6400, image: PHOTO.deal }
    ],
    pizza: [
      { id: "bar-bq", name: "Bar B.Q Pizza", desc: "Chicken, capsicum, onion, cheese, olives, and signature BBQ sauce.", price: 1280, image: PHOTO.pizzaBbq },
      { id: "chicken-tikka", name: "Chicken Tikka Pizza", desc: "Tikka chicken, capsicum, onion, cheese, and house pizza sauce.", price: 1280, image: PHOTO.pizzaTikka },
      { id: "chicken-fajita", name: "Chicken Fajita Pizza", desc: "Chicken, capsicum, onion, cheese, and fajita seasoning.", price: 1280, image: PHOTO.pizzaTikka },
      { id: "chicken-tandoori", name: "Chicken Tandoori Pizza", desc: "Tandoori chicken, onions, olives, cheese, and tomato sauce.", price: 1280, image: PHOTO.pizzaTikka },
      { id: "chicken-supreme", name: "Chicken Supreme Pizza", desc: "Chicken, mushrooms, capsicum, onion, olives, and cheese.", price: 1280, image: PHOTO.pizzaItalian },
      { id: "hot-spicy", name: "Hot & Spicy Pizza", desc: "Spicy chicken, jalapeno, capsicum, olives, cheese, and tomato sauce.", price: 1280, image: PHOTO.pizzaTikka },
      { id: "grilled", name: "Grilled Pizza", desc: "Grilled chicken, capsicum, olives, cheese, and special sauce.", price: 1280, image: PHOTO.pizzaBbq },
      { id: "chicken-achar", name: "Chicken Achar Pizza", desc: "Achar chicken, onion, capsicum, olives, cheese, and sauce.", price: 1280, image: PHOTO.pizzaTikka },
      { id: "mushroom", name: "Mushroom Pizza", desc: "Mushrooms, cheese, onion, capsicum, olives, and tomato sauce.", price: 1280, image: PHOTO.pizzaItalian },
      { id: "vegetarian", name: "Vegetarian Pizza", desc: "Vegetables, mushrooms, olives, onion, capsicum, and cheese.", price: 1280, image: PHOTO.pizzaItalian },
      { id: "cheese-gold", name: "Cheese Gold Pizza", desc: "Rich cheese blend with house pizza sauce.", price: 1280, image: PHOTO.pizzaItalian },
      { id: "italian-special", name: "Italian Special Pizza", desc: "Chicken, mushrooms, sweet corn, onion, olives, and mozzarella.", price: 1480, image: PHOTO.pizzaItalian },
      { id: "own-choice", name: "Own Choice Pizza", desc: "Build your favorite flavor with selected toppings.", price: 2000, image: PHOTO.pizzaBbq },
      { id: "double-cheese", name: "Double Cheese Crust", desc: "Extra cheese, soft crust, and a rich baked finish.", price: 2000, image: PHOTO.pizzaItalian }
    ],
    burgers: [
      { id: "zinger", name: "Zinger Burger", desc: "Crispy chicken fillet with fresh salad and creamy sauce.", price: 800, image: PHOTO.burgerZinger },
      { id: "zinger-cheese", name: "Zinger Cheese Burger", desc: "Crispy chicken fillet, melted cheese, salad, and sauce.", price: 1100, image: PHOTO.burgerZinger },
      { id: "grilled-burger", name: "Grilled Burger", desc: "Grilled chicken patty with salad and house sauce.", price: 800, image: PHOTO.burgerZinger },
      { id: "grilled-cheese", name: "Grilled Cheese Burger", desc: "Grilled chicken, cheese, salad, and sauce.", price: 880, image: PHOTO.burgerZinger },
      { id: "beef", name: "Beef Burger", desc: "Juicy beef patty with salad, sauce, and a toasted bun.", price: 1080, image: PHOTO.burgerBeef },
      { id: "beef-cheese", name: "Beef Cheese Burger", desc: "Beef patty, melted cheese, salad, and house sauce.", price: 1180, image: PHOTO.burgerBeef },
      { id: "double-beef", name: "Double Patty Beef Burger", desc: "Double beef patty with salad and sauce.", price: 1500, image: PHOTO.burgerBeef },
      { id: "double-beef-cheese", name: "Double Patty Beef Cheese Burger", desc: "Double beef patty, cheese, salad, and house sauce.", price: 1680, image: PHOTO.burgerBeef },
      { id: "chicken-roll", name: "Chicken Roll Paratha", desc: "Chicken, sauce, and fresh salad wrapped in paratha.", price: 680, image: PHOTO.burgerZinger },
      { id: "shawarma", name: "Chicken Shawarma", desc: "Chicken, fresh vegetables, and creamy sauce wrapped warm.", price: 500, image: PHOTO.burgerZinger }
    ],
    drinks: [
      { id: "drink-15", name: "Drink 1.5L", desc: "Family-size chilled soft drink.", price: 200, image: PHOTO.drink },
      { id: "drink-500", name: "Drink 500ml", desc: "Regular chilled soft drink.", price: 120, image: PHOTO.drink },
      { id: "drink-345", name: "Drink 345ml", desc: "Small chilled soft drink.", price: 80, image: PHOTO.drink },
      { id: "water-small", name: "Mineral Water 500ml", desc: "Small mineral water bottle.", price: 60, image: PHOTO.drink },
      { id: "water-large", name: "Mineral Water 1.5L", desc: "Large mineral water bottle.", price: 120, image: PHOTO.drink },
      { id: "small-fries", name: "Small Fries", desc: "Crispy fries for one.", price: 300, image: PHOTO.fries },
      { id: "medium-fries", name: "Medium Fries", desc: "Crispy fries for sharing.", price: 400, image: PHOTO.fries },
      { id: "large-fries", name: "Large Fries", desc: "Crispy fries, perfect for family orders.", price: 500, image: PHOTO.fries }
    ]
  }
};

function mergeDefaults(defaultValue, savedValue) {
  if (Array.isArray(defaultValue)) return Array.isArray(savedValue) ? savedValue : structuredClone(defaultValue);
  if (!defaultValue || typeof defaultValue !== "object") return savedValue ?? defaultValue;

  const merged = structuredClone(defaultValue);
  if (!savedValue || typeof savedValue !== "object") return merged;
  Object.keys(savedValue).forEach((key) => {
    merged[key] = key in defaultValue ? mergeDefaults(defaultValue[key], savedValue[key]) : savedValue[key];
  });
  return merged;
}

window.loadSiteData = function loadSiteData() {
  try {
    const saved = JSON.parse(localStorage.getItem("italianPizzaSiteData"));
    return mergeDefaults(window.DEFAULT_SITE_DATA, saved);
  } catch {
    return structuredClone(window.DEFAULT_SITE_DATA);
  }
};

window.saveSiteData = function saveSiteData(data) {
  localStorage.setItem("italianPizzaSiteData", JSON.stringify(data));
};
