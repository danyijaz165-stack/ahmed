export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  onSale?: boolean
  description?: string
  images?: string[]
  category: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'SMD Metallic Light',
    price: 280,
    image: '/smd metalic light.png',
    slug: 'smd-metallic-light',
    category: "gentleman's-reserve",
    description: 'Ecoplus SMD Downlight - Power: 7 Watt / 12 Watt, Size: Adjustable 3 Inch hole size, Material: Aluminum Base, Warranty: One Year, Colour Options: 3000K (Warm) / 6500K (White). Modern SMD downlight with metallic finish and smooth matte white design, perfect for contemporary ceiling installations.',
  },
  {
    id: '2',
    name: 'Ice Panel Moon Light',
    price: 450,
    image: '/ice panel moon light.png',
    slug: 'ice-panel-moon-light',
    category: "gentleman's-reserve",
    description: 'Scoplus Ice Panel Moon Light - Power: 12 Watt / 24 Watt, Size: Adjustable 2-3 Inch / 2-4 Inch hole size, Material: Aluminum Base, Warranty: One Year, Colour Options: 3000K (Warm) / 6500K (White). Premium adjustable moon light with smooth white diffuser and spring-loaded mounting clips for easy installation.',
  },
  {
    id: '3',
    name: 'LED Bulb',
    price: 180,
    image: '/led bulb.png',
    slug: 'led-bulb',
    category: "gentleman's-reserve",
    description: 'Scoplus LED Bulb - Power: 12W LED (equivalent to 42W traditional bulb), Warranty: One Year Guaranteed, Features: 90% Energy Saving, Eye Comfort Technology. Energy-efficient LED bulb with frosted dome design and silver screw-in base, ideal for all lighting needs. Shine like the stars with this high-quality LED bulb.',
  },
  {
    id: '4',
    name: 'COB Light',
    price: 320,
    image: '/cob light.png',
    slug: 'cob-light',
    category: "gentleman's-reserve",
    description: 'Scoplus COB Light - Power: 5 Watt, Size: Adjustable 2 Inch hole size, Material: Aluminum Base, Warranty: One Year, Colour Options: 3000K (Warm) / 6500K (White). High-quality COB LED downlight with bright yellow COB LED, silver reflector for uniform illumination, and aluminum heat sink for optimal thermal management.',
  },
  {
    id: '5',
    name: 'Adjustable Moon Light',
    price: 380,
    image: '/ice panel moon light.png',
    slug: 'adjustable-moon-light',
    category: "gentleman's-reserve",
    description: 'Scoplus PK Moon Light - Power: 12 Watt, Size: Adjustable 3 Inch hole size, Material: Aluminum Base, Warranty: One Year, Colour Options: 3000K (Warm) / 6500K (White). Elegant PK Moon Light with smooth white circular design, perfect for ambient lighting. Features spring-loaded mounting clips for easy installation.',
  },
  {
    id: '6',
    name: 'SMD Metallic Light',
    price: 280,
    image: '/smd metalic light.png',
    slug: 'smd-metallic-light-products',
    category: 'products',
    description: 'Ecoplus SMD Downlight - Power: 7 Watt / 12 Watt, Size: Adjustable 3 Inch hole size, Material: Aluminum Base, Warranty: One Year, Colour Options: 3000K (Warm) / 6500K (White). Modern SMD downlight with metallic finish and smooth matte white design, perfect for contemporary ceiling installations.',
  },
  {
    id: '7',
    name: 'Ice Panel Moon Light',
    price: 450,
    image: '/ice panel moon light.png',
    slug: 'ice-panel-moon-light-products',
    category: 'products',
    description: 'Scoplus Ice Panel Moon Light - Power: 12 Watt / 24 Watt, Size: Adjustable 2-3 Inch / 2-4 Inch hole size, Material: Aluminum Base, Warranty: One Year, Colour Options: 3000K (Warm) / 6500K (White). Premium adjustable moon light with smooth white diffuser and spring-loaded mounting clips for easy installation.',
  },
  {
    id: '8',
    name: 'LED Bulb',
    price: 180,
    image: '/led bulb.png',
    slug: 'led-bulb-products',
    category: 'products',
    description: 'Scoplus LED Bulb - Power: 12W LED (equivalent to 42W traditional bulb), Warranty: One Year Guaranteed, Features: 90% Energy Saving, Eye Comfort Technology. Energy-efficient LED bulb with frosted dome design and silver screw-in base, ideal for all lighting needs. Shine like the stars with this high-quality LED bulb.',
  },
  {
    id: '9',
    name: 'COB Light',
    price: 320,
    image: '/cob light.png',
    slug: 'cob-light-products',
    category: 'products',
    description: 'Scoplus COB Light - Power: 5 Watt, Size: Adjustable 2 Inch hole size, Material: Aluminum Base, Warranty: One Year, Colour Options: 3000K (Warm) / 6500K (White). High-quality COB LED downlight with bright yellow COB LED, silver reflector for uniform illumination, and aluminum heat sink for optimal thermal management.',
  },
  {
    id: '10',
    name: 'Adjustable Moon Light',
    price: 380,
    image: '/ice panel moon light.png',
    slug: 'adjustable-moon-light-products',
    category: 'products',
    description: 'Scoplus PK Moon Light - Power: 12 Watt, Size: Adjustable 3 Inch hole size, Material: Aluminum Base, Warranty: One Year, Colour Options: 3000K (Warm) / 6500K (White). Elegant PK Moon Light with smooth white circular design, perfect for ambient lighting. Features spring-loaded mounting clips for easy installation.',
  },
]

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category)
}


