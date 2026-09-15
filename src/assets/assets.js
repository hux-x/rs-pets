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



export const getProduct = (id)=>{
  return products.find(product => product._id === id)
}



export const collections = [
  {
    name: "Grooming",
    image: "/collections/pets-grooming.jpg",
    slug: "grooming-and-care",
    description: "Essential cat grooming supplies. Brushes, shampoos, nail grinders, and wipes to keep your cat clean, healthy, and comfortable."
  },
  {
    name: "Other Accessories",
    image: "/collections/pet-accessories.webp",
    slug: "other-cat-accessories",
    description: "A mix of handy cat accessories that don't fit elsewhere, from calming sprays to catnip tubes, for everyday cat care."
  },
  {
    name: "Litter & Hygiene",
    image: "/collections/pet-litter-and-hygiene.webp",
    slug: "litter-and-hygiene",
    description: "Litter boxes, scoops, deodorizers, and odour control solutions to keep your cat's space clean and fresh."
  },
  {
    name: "Food & Treats",
    image: "/collections/pet-food-and-treats.webp",
    slug: "food",
    description: "Cat food, treats, and feeding accessories from trusted brands, formulated for taste and nutrition."
  },
  {
    name: "Collars & Harnesses",
    image: "/collections/collars-and-leashes.jpg",
    slug: "collars-and-harnesses",
    description: "Collars, chains, and harnesses for safe and stylish walks, in a range of sizes and designs."
  },
  {
    name: "Toys & Play",
    image: "/collections/pet-toys.jpg",
    slug: "toys-and-play",
    description: "Interactive toys, laser pointers, and scratchers to keep your cat active, playful, and entertained."
  },
  {
    name: "Beds & Houses",
    image: "/collections/beds-and-houses.jpeg",
    slug: "beds-and-houses",
    description: "Comfortable beds, houses, kennels, and cooling mats for your cat to rest and relax in."
  },
  {
    name: "Feeding & Water",
    image: "/collections/feeding-and-water.jpeg",
    slug: "feeding-and-water",
    description: "Bowls, water fountains, and dispensers to keep your cat fed and hydrated throughout the day."
  },
  {
    name: "Travel & Carriers",
    image: "/collections/travel-and-carriers.jpeg",
    slug: "travel-and-carriers",
    description: "Carriers, travel bags, and jet boxes for safe and comfortable trips with your cat."
  },
];

export const products = [
  {
    _id: "1",
    name: "Electric Nail Grinder",
    description: "Electric Nail Grinder is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1890,
    image: ["/product-image-1.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "2",
    name: "Unitex Ear Mites & Cleaner",
    description: "Unitex Ear Mites & Cleaner is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 690,
    image: ["/product-image-2.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "3",
    name: "Antiseptic Pink Wound Healer 120 ml",
    description: "Antiseptic Pink Wound Healer 120 ml is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 690,
    image: ["/product-image-3.jpg"],
    category: "other-cat-accessories",
    stock: 50,
    inStock: true
  },
  {
    _id: "4",
    name: "Tear Stain Remover",
    description: "Tear Stain Remover is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 590,
    image: ["/product-image-4.jpg"],
    category: "litter-and-hygiene",
    stock: 50,
    inStock: true
  },
  {
    _id: "5",
    name: "Cat Eye Cleaner",
    description: "Cat Eye Cleaner is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 690,
    image: ["/product-image-5.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "6",
    name: "Renovo Lava Cake Treat",
    description: "Renovo Lava Cake Treat is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 430,
    image: ["/product-image-6.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "7",
    name: "Renovo Yogurt Candy Treat",
    description: "Renovo Yogurt Candy Treat is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 90,
    image: ["/product-image-7.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "8",
    name: "Whiskas Jelly Food 85g",
    description: "Whiskas Jelly Food 85g is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 330,
    image: ["/product-image-8.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "9",
    name: "Cat Collar & Chain",
    description: "Cat Collar & Chain is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 390,
    image: ["/product-image-9.jpg"],
    category: "collars-and-harnesses",
    stock: 50,
    inStock: true
  },
  {
    _id: "10",
    name: "Cat Scratching Pad",
    description: "Cat Scratching Pad is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1290,
    image: ["/product-image-10.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "11",
    name: "Cat Bed Cum House",
    description: "Cat Bed Cum House is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1990,
    image: ["/product-image-11.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true
  },
  {
    _id: "12",
    name: "Cat Scratching Mat",
    description: "Cat Scratching Mat is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 390,
    image: ["/product-image-12.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "13",
    name: "Cat Training Bell",
    description: "Cat Training Bell is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 550,
    image: ["/product-image-13.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "14",
    name: "Cat Litter Box Medium",
    description: "Cat Litter Box Medium is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 890,
    image: ["/product-image-14.jpg"],
    category: "litter-and-hygiene",
    stock: 50,
    inStock: true
  },
  {
    _id: "15",
    name: "Cat Harness Simple",
    description: "Cat Harness Simple is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 290,
    image: ["/product-image-15.jpg"],
    category: "collars-and-harnesses",
    stock: 50,
    inStock: true
  },
  {
    _id: "16",
    name: "Cat Fur Removal Stick",
    description: "Cat Fur Removal Stick is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 290,
    image: ["/product-image-16.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "17",
    name: "Cat Lint Brush",
    description: "Cat Lint Brush is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 290,
    image: ["/product-image-17.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "18",
    name: "Cat Single Bowl",
    description: "Cat Single Bowl is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 180,
    image: ["/product-image-18.jpg"],
    category: "feeding-and-water",
    stock: 50,
    inStock: true
  },
  {
    _id: "19",
    name: "Cat Treat Feeding Spoon",
    description: "Cat Treat Feeding Spoon is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 350,
    image: ["/product-image-19.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "20",
    name: "Cat Laser Collar Toy",
    description: "Cat Laser Collar Toy is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 710,
    image: ["/product-image-20.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "21",
    name: "Cat Water Fountain Premium",
    description: "Cat Water Fountain Premium is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 2590,
    image: ["/product-image-21.jpg"],
    category: "feeding-and-water",
    stock: 50,
    inStock: true
  },
  {
    _id: "22",
    name: "Pet Stain & Odour Remover 300 Ml",
    description: "Pet Stain & Odour Remover 300 Ml is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 990,
    image: ["/product-image-22.jpg"],
    category: "litter-and-hygiene",
    stock: 50,
    inStock: true
  },
  {
    _id: "23",
    name: "Cat Banana House",
    description: "Cat Banana House is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 2890,
    image: ["/product-image-23.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true
  },
  {
    _id: "24",
    name: "Cat Double Bowl",
    description: "Cat Double Bowl is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 290,
    image: ["/product-image-24.jpg"],
    category: "feeding-and-water",
    stock: 50,
    inStock: true
  },
  {
    _id: "25",
    name: "Electric Mouse Toy",
    description: "Electric Mouse Toy is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 780,
    image: ["/product-image-25.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "26",
    name: "Cat Lint Removal Gloves",
    description: "Cat Lint Removal Gloves is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 590,
    image: ["/product-image-26.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "27",
    name: "Cat Wipes",
    description: "Cat Wipes is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 490,
    image: ["/product-image-27.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "28",
    name: "Cat Collar",
    description: "Cat Collar is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 185,
    image: ["/product-image-28.jpg"],
    category: "collars-and-harnesses",
    stock: 50,
    inStock: true
  },
  {
    _id: "29",
    name: "Cat Paw Wipes",
    description: "Cat Paw Wipes is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 550,
    image: ["/product-image-29.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "30",
    name: "Cat Eye Wipes",
    description: "Cat Eye Wipes is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 550,
    image: ["/product-image-30.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "31",
    name: "Cat Laser Toy",
    description: "Cat Laser Toy is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 189,
    image: ["/product-image-31.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "32",
    name: "Cat Litter Deodorizer Cookie",
    description: "Cat Litter Deodorizer Cookie is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 590,
    image: ["/product-image-32.jpg"],
    category: "litter-and-hygiene",
    stock: 50,
    inStock: true
  },
  {
    _id: "33",
    name: "Cat Litter Deodorizer Remu",
    description: "Cat Litter Deodorizer Remu is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 790,
    image: ["/product-image-33.jpg"],
    category: "litter-and-hygiene",
    stock: 50,
    inStock: true
  },
  {
    _id: "34",
    name: "Cat Knot Cutter",
    description: "Cat Knot Cutter is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 190,
    image: ["/product-image-34.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "36",
    name: "Cat Chain Collar",
    description: "Cat Chain Collar is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 390,
    image: ["/product-image-36.jpg"],
    category: "collars-and-harnesses",
    stock: 50,
    inStock: true
  },
  {
    _id: "37",
    name: "Cat Water Fountain Normal",
    description: "Cat Water Fountain Normal is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1790,
    image: ["/product-image-37.jpg"],
    category: "feeding-and-water",
    stock: 50,
    inStock: true
  },
  {
    _id: "38",
    name: "Cat Litter Box Medium",
    description: "Cat Litter Box Medium is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 690,
    image: ["/product-image-38.jpg"],
    category: "litter-and-hygiene",
    stock: 50,
    inStock: true
  },
  {
    _id: "39",
    name: "Cat Litter Box Large",
    description: "Cat Litter Box Large is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1390,
    image: ["/product-image-39.jpg"],
    category: "litter-and-hygiene",
    stock: 50,
    inStock: true
  },
  {
    _id: "40",
    name: "Cat Litter Scoop",
    description: "Cat Litter Scoop is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 159,
    image: ["/product-image-40.jpg"],
    category: "litter-and-hygiene",
    stock: 50,
    inStock: true
  },
  {
    _id: "41",
    name: "Cat Food Scoop",
    description: "Cat Food Scoop is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 125,
    image: ["/product-image-41.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "42",
    name: "Cat Spring Toy",
    description: "Cat Spring Toy is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 710,
    image: ["/product-image-42.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "43",
    name: "Cat Dry Clean Powder",
    description: "Cat Dry Clean Powder is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 560,
    image: ["/product-image-43.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "44",
    name: "Cat Catnip Tube",
    description: "Cat Catnip Tube is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 285,
    image: ["/product-image-44.jpg"],
    category: "other-cat-accessories",
    stock: 50,
    inStock: true
  },
  {
    _id: "45",
    name: "Cat Stream Massage Brush",
    description: "Cat Stream Massage Brush is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 678,
    image: ["/product-image-45.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "46",
    name: "Cat Grooming Brush",
    description: "Cat Grooming Brush is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 285,
    image: ["/product-image-46.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "47",
    name: "Cat Feeding Kit",
    description: "Cat Feeding Kit is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 275,
    image: ["/product-image-47.jpg"],
    category: "feeding-and-water",
    stock: 50,
    inStock: true
  },
  {
    _id: "49",
    name: "Pet Lint Roller",
    description: "Pet Lint Roller is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 335,
    image: ["/product-image-49.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "50",
    name: "Pet Bath Brush",
    description: "Pet Bath Brush is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 325,
    image: ["/product-image-50.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "51",
    name: "Zoofari DC-18 Pet Trimmer",
    description: "Zoofari DC-18 Pet Trimmer is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 3990,
    image: ["/product-image-51.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "52",
    name: "Cat Traveling Bag",
    description: "Cat Traveling Bag is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 2790,
    image: ["/product-image-52.jpg"],
    category: "travel-and-carriers",
    stock: 50,
    inStock: true
  },
  {
    _id: "53",
    name: "Cat Kennel Small",
    description: "Cat Kennel is a practical pet accessory for everyday use, available in Small, Medium, and Large sizes. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    variants: [
      { name: "Small", price: 2880 },
      { name: "Medium", price: 3490 },
      { name: "Large", price: 3990 },
    ],
    image: ["/product-image-53.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true,
    price:2800
  },
   {
    _id: "53.1",
    name: "Cat Kennel Medium",
    description: "Cat Kennel is a practical pet accessory for everyday use, available in Small, Medium, and Large sizes. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    variants: [
      { name: "Small", price: 2880 },
      { name: "Medium", price: 3490 },
      { name: "Large", price: 3990 },
    ],
    image: ["/product-image-53.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true,
    price:3490
  },
   {
    _id: "53.2",
    name: "Cat Kennel Large",
    description: "Cat Kennel is a practical pet accessory for everyday use, available in Small, Medium, and Large sizes. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    variants: [
      { name: "Small", price: 2880 },
      { name: "Medium", price: 3490 },
      { name: "Large", price: 3990 },
    ],
    image: ["/product-image-53.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true,
    price:3990
  },
  {
    _id: "54",
    name: "Cat Traveling Jet Box",
    description: "Cat Traveling Jet Box is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1990,
    image: ["/product-image-54.jpg"],
    category: "travel-and-carriers",
    stock: 50,
    inStock: true
  },
  {
    _id: "55",
    name: "Cat Cooling Mat",
    description: "Cat Cooling Mat is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1590,
    image: ["/product-image-55.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true
  },
  {
    _id: "56",
    name: "Kitten Milk 200Ml",
    description: "Kitten Milk 200Ml is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 890,
    image: ["/product-image-56.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "57",
    name: "Cat Shampoo 120 ml",
    description: "Cat Shampoo 120 ml is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 390,
    image: ["/product-image-57.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "58",
    name: "Cat E-Collar",
    description: "Cat E-Collar is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 490,
    image: ["/product-image-58.jpg"],
    category: "collars-and-harnesses",
    stock: 50,
    inStock: true
  },
  {
    _id: "59",
    name: "Catnip Ball",
    description: "Catnip Ball is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 350,
    image: ["/product-image-59.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "60",
    name: "Cat Harness Fancy",
    description: "Cat Harness Fancy is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 745,
    image: ["/product-image-60.jpg"],
    category: "collars-and-harnesses",
    stock: 50,
    inStock: true
  },
  {
    _id: "61",
    name: "Pet Calming Spray 120 ml",
    description: "Pet Calming Spray 120 ml is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 830,
    image: ["/product-image-61.jpg"],
    category: "other-cat-accessories",
    stock: 50,
    inStock: true
  },
  {
    _id: "62",
    name: "Dry Bath Shampoo 120 ml",
    description: "Dry Bath Shampoo 120 ml is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 490,
    image: ["/product-image-62.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "63",
    name: "Oral Care Fluff & Buff 120 ml",
    description: "Oral Care Fluff & Buff 120 ml is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 710,
    image: ["/product-image-63.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "64",
    name: "Cat Teething Kit",
    description: "Cat Teething Kit is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 590,
    image: ["/product-image-64.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "65",
    name: "Pet Feeding Bottle",
    description: "Pet Feeding Bottle is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 590,
    image: ["/product-image-65.jpg"],
    category: "feeding-and-water",
    stock: 50,
    inStock: true
  },
  {
    _id: "66",
    name: "Renovo Cat Lollipop Treat",
    description: "Renovo Cat Lollipop Treat is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 179,
    image: ["/product-image-66.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "67",
    name: "Cat Kennel Medium",
    description: "Cat Kennel Medium is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 2390,
    image: ["/product-image-67.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true
  },
  {
    _id: "68",
    name: "2-in-1 Water & Food Dispenser",
    description: "2-in-1 Water & Food Dispenser is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1990,
    image: ["/product-image-68.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "69",
    name: "Cat Flea Comb",
    description: "Cat Flea Comb is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 290,
    image: ["/product-image-69.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "70",
    name: "Cat Dori Collar",
    description: "Cat Dori Collar is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 290,
    image: ["/product-image-70.jpg"],
    category: "collars-and-harnesses",
    stock: 50,
    inStock: true
  },
  {
    _id: "71",
    name: "Cat Cooling Mat",
    description: "Cat Cooling Mat is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1099,
    image: ["/product-image-71.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true
  },
  {
    _id: "72",
    name: "XL Cat Lint Brush",
    description: "XL Cat Lint Brush is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 890,
    image: ["/product-image-72.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "73",
    name: "Push Button Cat Brush",
    description: "Push Button Cat Brush is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 510,
    image: ["/product-image-73.jpg"],
    category: "grooming-and-care",
    stock: 50,
    inStock: true
  },
  {
    _id: "74",
    name: "Cat Water & Food Dispenser",
    description: "Cat Water & Food Dispenser is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 590,
    image: ["/product-image-74.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "75",
    name: "Cat Play Tunnel",
    description: "Cat Play Tunnel is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1580,
    image: ["/product-image-75.jpg"],
    category: "toys-and-play",
    stock: 50,
    inStock: true
  },
  {
    _id: "76",
    name: "Cat House",
    description: "Cat House is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1090,
    image: ["/product-image-76.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true
  },
  {
    _id: "77",
    name: "Crunchy Cat Food 1 kg",
    description: "Crunchy Cat Food 1 kg is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1210,
    image: ["/product-image-77.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "78",
    name: "Pet Nosh Cat Food 1 kg",
    description: "Pet Nosh Cat Food 1 kg is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1140,
    image: ["/product-image-78.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "79",
    name: "Mito Cat Food 1 kg",
    description: "Mito Cat Food 1 kg is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1810,
    image: ["/product-image-79.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "80",
    name: "Pawfact Cat Food 1 kg",
    description: "Pawfact Cat Food 1 kg is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1290,
    image: ["/product-image-80.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "81",
    name: "Nourvet Cat Food 1 kg",
    description: "Nourvet Cat Food 1 kg is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1390,
    image: ["/product-image-81.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
  {
    _id: "82",
    name: "XL Cat House",
    description: "XL Cat House is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 1820,
    image: ["/product-image-82.jpg"],
    category: "beds-and-houses",
    stock: 50,
    inStock: true
  },
  {
    _id: "83",
    name: "Cat Premium Jet Box",
    description: "Cat Premium Jet Box is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 2499,
    image: ["/product-image-83.jpg"],
    category: "travel-and-carriers",
    stock: 50,
    inStock: true
  },
  {
    _id: "84",
    name: "Cat Wimow Treat",
    description: "Cat Wimow Treat is a practical pet accessory for everyday use. It is designed to make cat care more convenient and comfortable. Suitable for routine home use when used according to its intended purpose. Keep the product clean and store it safely after use. Please check the size, instructions, and suitability for your pet before use.",
    price: 399,
    image: ["/product-image-84.jpg"],
    category: "food",
    stock: 50,
    inStock: true
  },
];