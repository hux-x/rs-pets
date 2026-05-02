import image1 from '../assets/hero/image-1.jpeg';
import image2 from '../assets/hero/image-2.jpeg';
import image3 from '../assets/hero/image-3.jpeg';
import image4 from '../assets/hero/image-4.jpeg';
import image5 from '../assets/hero/image-5.jpeg';

import CartIcon from './layout/cart_icon.png';
import SearchIcon from './layout/search_icon.png';
import MenuIcon from './layout/menu_icon.png';
import logo from '../../app/favicon.ico';
import bin_icon from './layout/bin_icon.png'

export const assets = {
  hero_images: [image1, image2, image3, image4, image5],
  cart_icon: CartIcon,
  search_icon: SearchIcon,
  menu_icon: MenuIcon,
  logo: logo,
  bin_icon
};

export const collections = [
  { 
    name: "Dog Food", 
    image: "/collections/dog-food.jpeg", 
    slug: "dog-food",
    description: "Shop premium dog food in Pakistan. From budget-friendly options to imported brands like Royal Canin and Josera, find the best nutrition for your pup."
  },
  { 
    name: "Cat Food", 
    image: "/collections/cat-food.jpeg", 
    slug: "cat-food",
    description: "Buy high-quality cat food online. Featuring top brands like Me-O, Reflex, and Bonnie. Nutritious dry and wet food available for delivery across Pakistan."
  },
  { 
    name: "Toys", 
    image: "/collections/pet-toys.jpg", 
    slug: "toys",
    description: "Interactive and durable pet toys. From teething chews for puppies to feather wands for cats, keep your pets active with the best toy selection in Pakistan."
  },
  { 
    name: "Beds & Houses", 
    image: "/collections/beds-and-houses.jpeg", 
    slug: "beds-houses",
    description: "Comfortable pet bedding and houses. Shop soft fleece beds for winter and elevated cooling beds perfect for the Pakistani summer heat."
  },
  { 
    name: "Collars & Leashes", 
    image: "/collections/collars-and-leashes.jpg", 
    slug: "collars-leashes",
    description: "High-quality leather and nylon collars, harnesses, and leashes. Secure and stylish walking gear for dogs of all sizes and breeds."
  },
  { 
    name: "Grooming", 
    image: "/collections/pets-grooming.jpg", 
    slug: "grooming",
    description: "Essential pet grooming kits. Find tick shampoos, slicker brushes, and nail clippers to keep your pets clean and healthy at home."
  },
  { 
    name: "Deals", 
    image: "/collections/pets-grooming.jpg", 
    slug: "deals",
    description: "Best pet supply discounts in Pakistan. Save on bulk food orders, monthly bundles, and seasonal pet essential sales."
  },
  { 
    name: "Litter & Hygiene", 
    image: "/collections/pets-grooming.jpg", 
    slug: "litter-hygiene",
    description: "Shop clumping cat litter and hygiene products. Odor-control solutions and training pads available at the best prices in Pakistan."
  },
];

export const getProduct = (id)=>{
  return products.find(product => product._id === id)
}

export const products = [
 {
    "_id": "scratching-arch",
    "name": "Scratching Arch",
    "description": "Keep your cat's claws healthy and your furniture safe with this innovative scratching arch. Designed to allow your cat to stretch, scratch, and play naturally, this arch promotes healthy nail maintenance while protecting your home. Made from durable and safe materials that can withstand even the most enthusiastic scratchers, it features a curved design that cats instinctively love. The perfect solution for redirecting scratching behavior away from sofas and carpets.",
    "price": 1299,
    "image": [
      "/products/scratching_arch.jpeg"
    ],
    "category": "beds-houses",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "complete-cat-litter-care-combo",
    "name": "Complete Cat Litter Care Combo",
    "description": "Everything your cat needs for a clean and comfortable litter experience in one convenient package. This comprehensive combo includes a small litter box perfect for compact spaces, a high-quality litter packet that provides excellent odor control and clumping, and a handy litter scoop for easy daily maintenance. Ideal for new cat owners or anyone looking to refresh their litter setup with quality essentials that work together seamlessly.",
    "price": 1299,
    "image": [
      "/products/complete_cat_litter_care_combo.jpeg"
    ],
    "category": "litter-hygiene",
    "stock": 15,
    "inStock": true
  },
  {
    "_id": "mito-cat-food-1kg",
    "name": "Mito Cat Food 1Kg",
    "description": "Premium nutrition packed with high-quality ingredients specially formulated for cats of all ages. This complete cat food provides essential vitamins, minerals, and proteins to support a healthy, active, and happy cat. Rich in taurine for heart and eye health, omega fatty acids for a lustrous coat, and balanced nutrients for optimal digestive health. Each kibble is carefully crafted to deliver both taste and nutrition that cats love.",
    "price": 1899,
    "image": [
      "/products/mito_cat_food_1kg.jpeg"
    ],
    "category": "cat-food",
    "stock": 25,
    "inStock": true
  },
  {
    "_id": "small-litter-box",
    "name": "Small Litter Box",
    "description": "Keep your cat's space clean and comfortable with this perfectly sized litter box. Made from durable, high-quality, non-toxic material that's built to last and easy to sanitize. The compact design makes it ideal for apartments, small bathrooms, or multi-cat households where space is at a premium. Features smooth edges for easy cleaning and a low entry point that's perfect for kittens or senior cats with mobility issues.",
    "price": 650,
    "image": [
      "/products/small_litter_box.jpeg"
    ],
    "category": "litter-hygiene",
    "stock": 30,
    "inStock": true
  },
  {
    "_id": "pet-calming-spray",
    "name": "Pet Calming Spray",
    "description": "Help your pet stay relaxed and stress-free with this gentle, natural calming spray. Formulated with soothing ingredients that promote relaxation without sedation, it's ideal for anxious or hyperactive pets who need a little extra support. Perfect for stressful situations like travel, vet visits, grooming sessions, thunderstorms, or fireworks. Simply spray in your pet's environment or on bedding to create a peaceful atmosphere. Safe for both cats and dogs.",
    "price": 699,
    "image": [
      "/products/pet_calming_spray.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat-fur-ball-small",
    "name": "Cat Fur Ball (Small)",
    "description": "A lightweight and bouncy fur ball toy that will keep your cat entertained for hours. This soft, colorful ball stimulates natural hunting instincts and provides endless fun as it rolls unpredictably across floors. The fuzzy texture is perfect for batting, carrying, and pouncing, while the small size makes it easy for cats to grab with their paws or mouth. Great for solo play or interactive sessions with you, helping to keep your indoor cat active and engaged.",
    "price": 75,
    "image": [
      "/products/cat_fur_ball_small.jpeg"
    ],
    "category": "toys",
    "stock": 50,
    "inStock": true
  },
  {
    "_id": "wimow-cat-treats",
    "name": "Wimow Cat Treats",
    "description": "Delicious, crunchy treats that cats absolutely love, packed with nutrients for optimal health. Perfect for rewarding good behavior, training sessions, or simply showing your feline friend some extra love throughout the day. Made with quality ingredients and fortified with vitamins and minerals, these treats support dental health while satisfying your cat's cravings. The irresistible flavor will have your cat coming back for more, making it easier to strengthen your bond.",
    "price": 480,
    "image": [
      "/products/wimow_cat_treats.jpeg"
    ],
    "category": "cat-food",
    "stock": 40,
    "inStock": true
  },
  {
    "_id": "pet-stain-odour-remover",
    "name": "Pet Stain & Odour Remover",
    "description": "Eliminate tough stains and unpleasant pet odors with this powerful yet safe cleaning solution. Specially formulated to break down organic compounds at the molecular level, it's effective on carpets, hardwood floors, tile, upholstery, and furniture. The enzymatic formula neutralizes odors rather than just masking them, preventing pets from remarking the same spots. Safe for use around pets and children when used as directed, making cleanup quick and worry-free.",
    "price": 1099,
    "image": [
      "/products/pet_stain_odour_remover.jpeg"
    ],
    "category": "litter-hygiene",
    "stock": 10,
    "inStock": true
  },
  {
    "_id": "cat-dry-clean-powder-225ml",
    "name": "Cat Dry Clean Powder 225ML",
    "description": "Revolutionary waterless grooming solution that absorbs dirt and excess oil from your cat's fur without the stress of bathing. This gentle powder formula is perfect for cats who dislike water or for quick clean-ups between baths. Simply apply, massage through the coat, and brush out to leave fur soft, shiny, and fresh-smelling. Ideal for senior cats, kittens, or any feline that finds traditional bathing stressful. Safe, non-toxic, and easy to use.",
    "price": 520,
    "image": [
      "/products/cat_dry_clean_powder.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "hand-grooming-brush",
    "name": "Hand Grooming Brush",
    "description": "This ergonomically designed grooming brush features gentle bristles that effectively remove loose hair, dirt, and dander while giving your cat a soothing massage they'll love. The comfortable hand-fitting design makes grooming sessions easier and more enjoyable for both you and your pet. Regular use helps reduce shedding around your home, prevents matting, and distributes natural oils for a healthier, shinier coat. Perfect for daily bonding time with your feline companion.",
    "price": 399,
    "image": [
      "/products/hand_grooming_brush.jpeg"
    ],
    "category": "grooming",
    "stock": 25,
    "inStock": true
  },
  {
    "_id": "flea-tick-protection-spray",
    "name": "Flea & Tick Protection Spray",
    "description": "Powerful protection that repels and eliminates fleas, ticks, and other unwanted pests from your cat's coat. This effective spray creates a protective barrier that keeps parasites away while protecting your cat from bites, irritation, and potential disease transmission. Easy to apply and fast-acting, it provides long-lasting protection between treatments. Safe for cats when used as directed, with a gentle formula that won't irritate sensitive skin.",
    "price": 599,
    "image": [
      "/products/flea_tick_protection_spray.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "imported-cat-litter-10l",
    "name": "Imported Cat Litter 10L",
    "description": "Premium imported cat litter featuring high-quality absorbent material that controls odors effectively and forms tight, easy-to-scoop clumps. This superior formula ensures a hygienic and comfortable environment for your cat while making cleanup simple and efficient. Virtually dust-free to protect both you and your cat's respiratory health, with excellent tracking control to keep your floors cleaner. The 10-liter size provides great value and lasts longer than standard litters.",
    "price": 1750,
    "image": [
      "/products/imported_cat_litter_10l.jpeg"
    ],
    "category": "litter-hygiene",
    "stock": 15,
    "inStock": true
  },
  {
    "_id": "cat-flea-comb",
    "name": "Cat Flea Comb",
    "description": "Essential grooming tool with finely-spaced metal teeth that gently removes fleas, flea eggs, and loose hair while providing a soothing massage your cat will enjoy. Perfect for regular grooming sessions and as part of your flea prevention routine, this comb allows you to check your cat's coat health and catch any pest problems early. The comfortable handle provides excellent control, making it easy to work through even thick or long coats thoroughly and safely.",
    "price": 299,
    "image": [
      "/products/cat_flea_comb.jpeg"
    ],
    "category": "grooming",
    "stock": 30,
    "inStock": true
  },
  {
    "_id": "push-button-cat-brush",
    "name": "Push Button Cat Brush",
    "description": "Innovative self-cleaning brush with a convenient push-button design that removes collected hair instantly with one press, making cleanup effortless. The gentle bristles effectively detangle and remove loose fur from your cat's coat without pulling or causing discomfort. Perfect for daily grooming sessions, this brush reduces shedding around your home while promoting healthy skin and a shiny coat. The ergonomic handle ensures comfortable use during longer grooming sessions.",
    "price": 680,
    "image": [
      "/products/push_button_cat_brush.jpeg"
    ],
    "category": "grooming",
    "stock": 25,
    "inStock": true
  },
  {
    "_id": "nourvet-gold-1kg",
    "name": "Nourvet Gold 1kg",
    "description": "Premium cat nutrition featuring high-quality protein sources, essential vitamins, and minerals carefully balanced to support healthy growth, strong immunity, and a lustrous, shiny coat. This complete food is formulated to meet all your cat's nutritional needs at every life stage, with optimal levels of taurine for heart and vision health, omega fatty acids for skin and coat condition, and antioxidants for immune support. Highly digestible and palatable for even picky eaters.",
    "price": 1499,
    "image": [
      "/products/nourvet_gold_1kg.jpeg"
    ],
    "category": "cat-food",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat-tower-toy",
    "name": "Cat Tower Toy",
    "description": "Multi-level cat activity center featuring multiple platforms, scratching posts, and cozy resting spots all in one space-saving design. Perfect for indoor cats who need vertical territory to climb, scratch, and lounge safely. The sturdy construction supports cats of all sizes while the various heights and hideaways satisfy natural climbing instincts. Covered in durable carpet and sisal rope for scratching, this tower provides mental stimulation and physical exercise while protecting your furniture.",
    "price": 1299,
    "image": [
      "/products/cat_tower_toy.jpeg"
    ],
    "category": "toys",
    "stock": 10,
    "inStock": true
  },
  {
    "_id": "klumpy-litter-5l",
    "name": "Klumpy Litter 5L",
    "description": "Super-absorbent clumping formula that makes daily litter box maintenance incredibly easy while controlling odors effectively. Forms tight, solid clumps on contact with moisture, allowing for efficient scooping and minimal waste. This high-performance litter locks away odors naturally without harsh chemicals or artificial fragrances. Perfect for daily use in single or multi-cat households, with low dust formula that's gentle on respiratory systems. The 5-liter size is ideal for regular refreshing.",
    "price": 550,
    "image": [
      "/products/klumpy_litter_5l.jpeg"
    ],
    "category": "litter-hygiene",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat-toys-combo-deal",
    "name": "Cat Toys Combo Deal",
    "description": "Exciting variety pack of fun and interactive toys designed to stimulate your cat's natural hunting instincts and keep them entertained for hours. This comprehensive combo includes different textures, sounds, and movements to appeal to all play preferences. Perfect for indoor cats who need mental and physical stimulation, these toys encourage exercise, reduce boredom, and help prevent destructive behavior. Great value bundle that keeps playtime fresh and engaging with multiple options to rotate.",
    "price": 2299,
    "image": [
      "/products/cat_toys_combo_deal.jpeg"
    ],
    "category": "toys",
    "stock": 10,
    "inStock": true
  },
  {
    "_id": "klumpy-litter-20l",
    "name": "Klumpy Litter 20L",
    "description": "Economy-sized super-absorbent clumping formula that quickly traps moisture and odors for long-lasting freshness. This large 20-liter package is perfect for multi-cat households or for those who prefer to stock up and save. Forms rock-solid clumps that are easy to scoop, reducing waste and making the litter last longer. Low-dust formula protects air quality while providing superior odor control without artificial fragrances. Great value for dedicated cat parents.",
    "price": 1700,
    "image": [
      "/products/klumpy_litter_20l.jpeg"
    ],
    "category": "litter-hygiene",
    "stock": 10,
    "inStock": true
  },
  {
    "_id": "lime-sulfur-spray-for-cats-dogs",
    "name": "Lime Sulfur Spray for Cats & Dogs",
    "description": "Veterinary-grade medicated spray that effectively treats skin infections, mange, fungal issues, ringworm, and other dermatological irritations in both cats and dogs. This therapeutic solution promotes healthy, clean, and comfortable skin while addressing the root causes of common skin problems. Easy to apply and fast-acting, it provides relief from itching and discomfort while supporting the healing process. Safe and effective when used as directed by your veterinarian.",
    "price": 750,
    "image": [
      "/products/lime_sulfur_spray.jpeg"
    ],
    "category": "grooming",
    "stock": 15,
    "inStock": true
  },
  {
    "_id": "cat-hair-brush",
    "name": "Cat Hair Brush",
    "description": "Classic grooming brush with gentle bristles that effectively remove loose hair, dirt, and mats while giving your cat a soothing massage they'll purr for. Perfect for daily grooming sessions that strengthen your bond while maintaining a healthy, beautiful coat. The soft bristles stimulate skin circulation and distribute natural oils throughout the fur for enhanced shine and softness. Lightweight and easy to handle, making grooming a pleasant experience for both you and your cat.",
    "price": 250,
    "image": [
      "/products/cat_hair_brush.jpeg"
    ],
    "category": "grooming",
    "stock": 25,
    "inStock": true
  },
  {
    "_id": "cat-wooden-house-small",
    "name": "Cat Wooden House (Small)",
    "description": "Charming and cozy retreat made from durable, high-quality wood that provides a safe and comfortable hideaway for your cat. This beautifully crafted house features a natural aesthetic that complements any home décor while giving your cat their own private sanctuary. Perfect for indoor use and ideal for small spaces or apartments. The solid construction ensures stability while the enclosed design satisfies your cat's natural instinct to seek out secure, den-like spaces.",
    "price": 1500,
    "image": [
      "/products/cat_wooden_house_small.jpeg"
    ],
    "category": "beds-houses",
    "stock": 10,
    "inStock": true
  },
  {
    "_id": "cat-wooden-house-extra-small",
    "name": "Cat Wooden House (Extra Small)",
    "description": "Adorable compact hideaway made from durable wood, perfectly sized for kittens or very small cats. This extra-small house provides a private and safe space for resting, hiding, and relaxing away from household activity. The quality wood construction ensures longevity while the cozy interior makes cats feel secure and protected. Ideal for shy cats or those who appreciate having their own quiet retreat. The natural materials are safe and eco-friendly.",
    "price": 999,
    "image": [
      "/products/cat_wooden_house_extra_small.jpeg"
    ],
    "category": "beds-houses",
    "stock": 12,
    "inStock": true
  },
  {
    "_id": "cat-bed",
    "name": "Cat Bed",
    "description": "Luxuriously soft and inviting cat bed made from durable, pet-safe materials that provide a warm and secure spot for your cat to sleep and lounge comfortably. The plush cushioning supports joints and muscles, making it especially beneficial for senior cats or those with arthritis. The raised edges create a sense of security while the non-slip bottom keeps the bed in place. Machine washable for easy care and maintaining freshness. Perfect for cats who love to curl up in cozy spots.",
    "price": 2250,
    "image": [
      "/products/cat_bed.jpeg"
    ],
    "category": "beds-houses",
    "stock": 10,
    "inStock": true
  },
  {
    "_id": "cat-vibrating-mouse",
    "name": "Cat Vibrating Mouse",
    "description": "Interactive mechanical toy featuring realistic movements and gentle vibrations that brilliantly stimulate your cat's natural hunting instincts. This lifelike mouse scurries unpredictably across floors, encouraging your cat to chase, pounce, and play actively. Perfect for keeping indoor cats mentally stimulated and physically active, helping to prevent boredom and maintain healthy weight. The durable construction withstands enthusiastic play while the engaging motion keeps cats entertained for extended periods.",
    "price": 399,
    "image": [
      "/products/cat_vibrating_mouse.jpeg"
    ],
    "category": "toys",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat-fur-ball-large",
    "name": "Cat Fur Ball (Large)",
    "description": "Oversized soft, lightweight, and bouncy fur ball that's perfect for cats who love to chase, pounce, and bat around. The larger size makes it easier to grab and carry, while the fuzzy texture appeals to cats' natural prey drive. Rolls unpredictably to keep play sessions exciting and engaging. Great for solo play when you're away or for interactive games that strengthen your bond. Durable construction withstands daily play from even the most energetic cats.",
    "price": 199,
    "image": [
      "/products/cat_fur_ball_large.jpeg"
    ],
    "category": "toys",
    "stock": 40,
    "inStock": true
  },
  {
    "_id": "washable-lint-roller-l",
    "name": "Washable Lint Roller (L)",
    "description": "Large eco-friendly lint roller with a sticky surface that easily picks up pet hair, lint, dust, and debris from clothing, furniture, and car interiors. Unlike disposable rollers, this washable version is reusable for long-lasting convenience and environmental sustainability. Simply rinse with water to restore stickiness and use again. The large size covers more surface area quickly, making cleanup faster and more efficient. Perfect for pet owners who want an effective, economical, and earth-friendly solution.",
    "price": 500,
    "image": [
      "/products/washable_lint_roller_l.jpeg"
    ],
    "category": "grooming",
    "stock": 15,
    "inStock": true
  },
  {
    "_id": "washable-lint-roller",
    "name": "Washable Lint Roller",
    "description": "Versatile sticky, reusable, and easy-to-clean lint roller that's perfect for homes with cats and dogs. This environmentally friendly alternative to disposable rollers effectively removes pet hair, lint, and dust from clothing, upholstery, and bedding. The adhesive surface rinses clean with water, restoring full stickiness for repeated use. Compact size makes it convenient for quick touch-ups at home or on the go. A must-have tool for every pet owner's cleaning arsenal.",
    "price": 499,
    "image": [
      "/products/washable_lint_roller.jpeg"
    ],
    "category": "grooming",
    "stock": 15,
    "inStock": true
  },
  {
    "_id": "wooden-cat-house-large",
    "name": "Wooden Cat House (Large)",
    "description": "Premium spacious and cozy retreat featuring an innovative built-in light and fan system for ultimate comfort. Made from high-quality durable wood with expert craftsmanship, this luxury cat house provides a climate-controlled environment perfect for indoor cats. The generous size accommodates multiple cats or larger breeds comfortably. The integrated ventilation and lighting create an inviting space your cat will love to call their own. A statement piece that combines functionality with elegant design.",
    "price": 25999,
    "image": [
      "/products/wooden_cat_house_large.jpeg"
    ],
    "category": "beds-houses",
    "stock": 5,
    "inStock": true
  },
  {
    "_id": "face-bowl-double-premium-quality",
    "name": "Face Bowl Double Premium Quality",
    "description": "Make mealtime convenient and fun with this cleverly designed Cat Double Face Bowl featuring two separate compartments for food and water in one stylish unit. The dual-bowl design prevents food and water from mixing while reducing the space needed for feeding stations. Made from durable, food-grade, and pet-safe materials that are easy to clean and maintain. The stable, weighted base prevents tipping and sliding during enthusiastic eating. Perfect for cats of all sizes and ages.",
    "price": 299,
    "image": [
      "/products/face_bowl_double.jpeg"
    ],
    "category": "litter-hygiene",
    "stock": 25,
    "inStock": true
  },
  {
    "_id": "premium-cat-food-maybel-elite-400g",
    "name": "Premium Cat Food Maybel Elite 400g",
    "description": "Superior quality cat food formulated with premium ingredients to provide essential proteins, vitamins, and minerals your cat needs for optimal health. This elite formula supports healthy growth, maintains a lustrous shiny coat, and strengthens the immune system against common illnesses. Carefully balanced nutrition includes omega fatty acids for skin health, taurine for heart and eye function, and antioxidants for cellular protection. Highly palatable with excellent digestibility for maximum nutrient absorption.",
    "price": 699,
    "image": [
      "/products/maybel_elite_cat_food_400g.jpeg"
    ],
    "category": "cat-food",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "mini-lint-roller",
    "name": "Mini Lint Roller",
    "description": "Compact, lightweight, and incredibly easy-to-use portable lint roller that's perfect for keeping clothes, furniture, car seats, and other surfaces free from pet hair, lint, and dust. The small size fits easily in purses, gloves boxes, desk drawers, or travel bags for quick touch-ups anywhere. Despite its compact design, it's highly effective at removing even stubborn pet hair. Ideal for pet owners who need a convenient solution for on-the-go cleaning and maintaining a polished appearance.",
    "price": 199,
    "image": [
      "/products/mini_lint_roller.jpeg"
    ],
    "category": "grooming",
    "stock": 30,
    "inStock": true
  },
  {
    "_id": "cat-bed-large",
    "name": "Cat Bed (Large)",
    "description": "Generously sized cozy and spacious bed providing ample room for larger cats or multiple cats to rest comfortably together. Crafted from soft, durable, and comfortable materials that maintain their shape and support over time, this bed is suitable for indoor use and accommodates cats of all sizes. The plush interior provides warmth and security while the sturdy construction ensures long-lasting use. Perfect for cats who love to stretch out while sleeping or prefer extra space.",
    "price": 3299,
    "image": [
      "/products/cat_bed_large.jpeg"
    ],
    "category": "beds-houses",
    "stock": 15,
    "inStock": true
  },
  {
    "_id": "royal-canin-jelly-cat-food",
    "name": "Royal Canin Jelly Cat Food",
    "description": "Premium cat food served in savory jelly for a delicious texture cats find irresistible. This gourmet formula provides essential proteins, vitamins, and minerals carefully balanced to support healthy growth, boost immunity, and maintain a shiny, healthy coat. The moisture-rich jelly helps with hydration while the tender chunks satisfy natural feeding instincts. Formulated by veterinary nutritionists to meet the specific nutritional needs of cats at all life stages. Perfect for cats who prefer wet food texture.",
    "price": 599,
    "image": [
      "/products/royal_canin_jelly_food.jpeg"
    ],
    "category": "cat-food",
    "stock": 25,
    "inStock": true
  },
  {
    "_id": "cat-nip-stick",
    "name": "Cat Nip Stick",
    "description": "Natural catnip-infused interactive toy stick that stimulates your cat's hunting instincts and provides enriching playtime. This enticing toy encourages chasing, pouncing, and playful exercise that keeps indoor cats physically active and mentally engaged. The potent catnip aroma is irresistible to most cats, creating excitement and joy during play sessions. Perfect for bonding time with your cat or as a special treat to brighten their day. Safe, non-toxic, and designed for feline enjoyment.",
    "price": 70,
    "image": [
      "/products/cat_nip_stick.jpeg"
    ],
    "category": "toys",
    "stock": 40,
    "inStock": true
  },
  {
    "_id": "wooden-cat-house-medium",
    "name": "Wooden Cat House (Medium)",
    "description": "Well-crafted durable wooden retreat designed specifically for medium-sized cats who appreciate having their own private space. This sturdy house provides a comfortable sanctuary for resting, hiding from household activity, and relaxing peacefully indoors. The quality wood construction ensures stability and longevity while the natural material is safe and environmentally friendly. Features smooth interior surfaces and proper ventilation for comfort. Blends beautifully with home décor while serving as your cat's favorite hideaway.",
    "price": 8500,
    "image": [
      "/products/wooden_cat_house_medium.jpeg"
    ],
    "category": "beds-houses",
    "stock": 8,
    "inStock": true
  },
  {
    "_id": "kitten-milk-replacer-150ml",
    "name": "Kitten Milk Replacer 150ML",
    "description": "Complete nutrition specially formulated for newborn kittens who cannot nurse or need supplemental feeding. This premium milk replacer provides all the essential vitamins, minerals, and proteins required for healthy growth, development, and strong immunity during critical early weeks. Closely mimics mother's milk in composition and digestibility, ensuring optimal nutrition for orphaned, rejected, or weak kittens. Easy to prepare and gentle on developing digestive systems. Veterinarian recommended for kitten care.",
    "price": 850,
    "image": [
      "/products/kitten_milk_replacer_150ml.jpeg"
    ],
    "category": "cat-food",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "litter-scoop-large",
    "name": "Litter Scoop (Large)",
    "description": "Heavy-duty litter scoop with a durable and spacious design that allows for easy, efficient scooping of clumps and waste. The large capacity means fewer trips to the trash, while the sturdy construction ensures it won't bend or break during use. Slotted design allows clean litter to sift through while retaining clumps perfectly. Keeps the litter box clean and hygienic with minimal effort. Perfect for cats of all sizes and especially useful in multi-cat households where daily maintenance is essential.",
    "price": 170,
    "image": [
      "/products/litter_scoop_l.jpeg"
    ],
    "category": "litter-hygiene",
    "stock": 25,
    "inStock": true
  },
  {
    "_id": "waterless-cat-shampoo",
    "name": "Waterless Cat Shampoo",
    "description": "Revolutionary no-rinse grooming solution with a gentle formula that removes dirt, odors, and loose hair without the need for water or bathing. This innovative shampoo keeps your cat clean and shiny while eliminating the stress associated with traditional baths. Ideal for quick grooming sessions, spot cleaning, or for cats who become anxious around water. Simply apply, massage into coat, and wipe or brush away. Perfect for senior cats, kittens, or any cat that finds bathing traumatic. Pleasant scent leaves fur fresh.",
    "price": 450,
    "image": [
      "/products/waterless_cat_shampoo.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat-house-large",
    "name": "Cat House Large",
    "description": "Spacious, cozy, and secure retreat that gives your cat plenty of room for resting, hiding, and playing in complete comfort. Made from durable and pet-safe materials with quality construction that ensures long-lasting use. The generous interior space accommodates larger cats or provides extra room for smaller cats who like to stretch out. Features multiple entry/exit points for easy access and ventilation. Perfect for cats who value their privacy and security while still wanting space to move around.",
    "price": 1299,
    "image": [
      "/products/cat_house_large.jpeg"
    ],
    "category": "beds-houses",
    "stock": 12,
    "inStock": true
  },
  {
    "_id": "cat-collar",
    "name": "Cat Collar",
    "description": "Durable and comfortable cat collar designed to provide a secure fit while allowing complete freedom of movement. Made from quality materials that withstand daily wear while remaining gentle on your cat's neck. Adjustable sizing ensures the perfect fit as your cat grows. Features a sturdy buckle and attachment point for ID tags, ensuring your cat's safety and identification if they ever wander. Available in attractive colors that suit any cat's personality. Essential for responsible pet ownership.",
    "price": 140,
    "image": [
      "/products/cat_collar.jpeg"
    ],
    "category": "collars-leashes",
    "stock": 50,
    "inStock": true
  },
  {
    "_id": "cat-collar-chain",
    "name": "Cat Collar Chain",
    "description": "Stylish and functional chain that attaches securely to your cat's collar while allowing comfortable, unrestricted movement during walks or supervised outdoor time. Made from durable, rust-resistant materials that are safe for daily wear and built to last. The lightweight design ensures your cat won't feel weighed down while the sturdy construction provides peace of mind. Perfect for training sessions, vet visits, or controlled outdoor exploration. Easy to attach and detach as needed.",
    "price": 180,
    "image": [
      "/products/cat_collar_chain.jpeg"
    ],
    "category": "collars-leashes",
    "stock": 40,
    "inStock": true
  },
  {
    "_id": "reflex-cat-food-2kg",
    "name": "Reflex Cat Food 2kg",
    "description": "Premium high-quality cat food delivering essential proteins, vitamins, and minerals in perfect balance for optimal feline health. This comprehensive formula supports healthy growth and development, strengthens the immune system against disease, and promotes a lustrous, shiny coat. Packed with real meat proteins, omega fatty acids, and vital nutrients, it's formulated to meet all your cat's dietary needs. Excellent palatability ensures even picky eaters will love it. The 2kg size provides great value for regular feeding.",
    "price": 4499,
    "image": [
      "/products/reflex_cat_food_2kg.jpeg"
    ],
    "category": "cat-food",
    "stock": 15,
    "inStock": true
  },
  {
    "_id": "deal-2199-xl-cat-house-kit",
    "name": "Deal 2199 – XL Cat House Kit",
    "description": "Complete premium starter kit for cats featuring a spacious XL house for comfort and privacy. Includes a double frog bowl for food and water, litter scoop for easy cleaning, food scoop for accurate portions, a playful ball to keep your cat active, a grooming brush for coat care, and a tasty treat as a reward. Ideal for cat owners looking for comfort, hygiene, and entertainment in one bundle.",
    "price": 2199,
    "image": [
      "/products/deal_2199_xl_house.jpeg"
    ],
    "category": "deals",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "deal-1399-kitten-starter-pack",
    "name": "Deal 1399 – Kitten Starter Pack",
    "description": "Perfect starter pack for kittens, including a cozy small house for resting, 100g nutritious cat food for healthy growth, a delicious treat, a fun playing ball, a lightweight collar for safety, a food scoop for portion control, and a soft kitten cloth. Designed to meet the basic needs of young cats in an affordable bundle.",
    "price": 1399,
    "image": [
      "/products/deal_1399_kitten_pack.jpeg"
    ],
    "category": "deals",
    "stock": 25,
    "inStock": true
  },
  {
    "_id": "deal-1699-large-cat-care-combo",
    "name": "Deal 1699 – Large Cat Care Combo",
    "description": "Value-packed cat care combo featuring a large comfortable house, 100g quality cat food, a tasty treat, grooming brush to maintain a healthy coat, double frog bowl for feeding convenience, and a nail scissor for safe claw trimming. A balanced bundle focused on comfort, nutrition, and grooming essentials.",
    "price": 1699,
    "image": [
      "/products/deal_1699_large_house.jpeg"
    ],
    "category": "deals",
    "stock": 18,
    "inStock": true
  },
    {
    "_id": "food_despenser_for_cats",
    "name": "Food Despenser for cats",
    "description": "Food dispenser for cats and dogs keeps food fresh, clean, and easily accessible while providing controlled portions for daily feeding.",
    "price": 1299,
    "image": [
      "/products/food_despenser_for_cats.jpeg"
    ],
    "category": "cat-food",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "bird_scratcher_for_cat",
    "name": "Bird scratcher for cat",
    "description": "Bird scratcher for cats provides a fun and safe way for your cat to scratch, play, and stay active while protecting your furniture from damage.",
    "price": 699,
    "image": [
      "/products/bird_scratcher_for_cat.jpeg"
    ],
    "category": "toys",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_perfume_shampoo",
    "name": "Cat perfume shampoo",
    "description": "Cat perfume shampoo gently cleans your cat’s fur while leaving a fresh, long-lasting fragrance. It keeps the coat soft, shiny, and healthy with every wash.",
    "price": 499,
    "image": [
      "/products/cat_perfume_shampoo.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "lint_brush_for_cats",
    "name": "Lint brush for cats",
    "description": "Lint brush easily removes pet hair, lint, and dust from clothes and furniture. It keeps your fabrics clean and fresh in just a few strokes.",
    "price": 299,
    "image": [
      "/products/lint_brush_for_cats.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "tower_toy_for_cats",
    "name": "Tower toy for cats",
    "description": "Tower toy for cats keeps your pet entertained and active with multiple levels for play and exploration. It helps reduce boredom and encourages healthy exercise.",
    "price": 1399,
    "image": [
      "/products/tower_toy_for_cats.jpeg"
    ],
    "category": "toys",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_cloths",
    "name": "Cat cloths",
    "description": "Cat clothes are soft and comfortable outfits designed to keep your cat warm and stylish while allowing easy movement and a perfect fit for daily wear.",
    "price": 799,
    "image": [
      "/products/cat_cloths.jpeg"
    ],
    "category": "toys",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_tunnel",
    "name": "Cat tunnel",
    "description": "Cat tunnel provides a fun and cozy space for your cat to play, hide, and explore. It encourages exercise and keeps your pet active and entertained.",
    "price": 1299,
    "image": [
      "/products/cat_tunnel.jpeg"
    ],
    "category": "toys",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_lice_removal_comb",
    "name": "Cat lice removal comb",
    "description": "Cat comb is specially designed to remove lice, fleas, and dirt from your cat’s fur. It helps keep the coat clean, healthy, and well-groomed.",
    "price": 599,
    "image": [
      "/products/cat_lice_removal_comb.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_electric_playing_ball",
    "name": "Cat electric playing ball",
    "description": "Cat electric playing ball is an interactive toy that moves automatically to keep your cat engaged and active. It helps reduce boredom and encourages natural hunting instincts.",
    "price": 1099,
    "image": [
      "/products/cat_electric_playing_ball.jpeg"
    ],
    "category": "toys",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_harness",
    "name": "Cat harness",
    "description": "Cat harness is a comfortable and secure gear designed to safely control your cat during walks. It provides a snug fit while allowing easy movement and outdoor exploration.",
    "price": 399,
    "image": [
      "/products/cat_harness.jpeg"
    ],
    "category": "collars-leashes",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_dori_collar",
    "name": "Cat dori collar",
    "description": "Cat dori collar is a lightweight and comfortable collar designed for everyday use. It provides a secure fit while being gentle on your cat’s neck and easy to adjust.",
    "price": 299,
    "image": [
      "/products/cat_dori_collar.jpeg"
    ],
    "category": "collars-leashes",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_electric_nail_cutter",
    "name": "Cat electric nail cutter",
    "description": "Cat electric nail cutter is a safe and easy grooming tool designed to trim your cat’s nails smoothly without causing pain or stress.",
    "price": 2699,
    "image": [
      "/products/cat_electric_nail_cutter.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_face_house",
    "name": "Cat face house",
    "description": "Cat face house is a cozy and cute shelter designed for your cat to rest, sleep, and feel safe. It provides comfort, warmth, and a private space for relaxation.",
    "price": 1299,
    "image": [
      "/products/cat_face_house.jpeg"
    ],
    "category": "beds-houses",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_comb",
    "name": "Cat comb",
    "description": "Cat comb is a gentle grooming tool that helps remove loose hair, dirt, and tangles. It keeps your cat’s coat clean, soft, and healthy with regular use.",
    "price": 990,
    "image": [
      "/products/cat_comb.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_travelling_bag",
    "name": "Cat travelling bag",
    "description": "Cat travelling bag is a safe and comfortable carrier designed for easy transport of your cat. It provides proper ventilation, security, and convenience during travel.",
    "price": 2999,
    "image": [
      "/products/cat_travelling_bag.jpeg"
    ],
    "category": "toys",
    "stock": 20,
    "inStock": true
  },
  {
    "_id": "cat_hair_trimmer",
    "name": "Cat hair trimmer",
    "description": "Cat hair trimmer is a safe and easy grooming tool designed to trim your cat’s fur smoothly and evenly. It helps keep the coat neat, clean, and well-maintained at home. Car scratcher",
    "price": 3999,
    "image": [
      "/products/cat_hair_trimmer.jpeg"
    ],
    "category": "grooming",
    "stock": 20,
    "inStock": true
  }
]