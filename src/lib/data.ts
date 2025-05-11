
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "tech",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Immersive sound with noise cancellation technology."
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    category: "tech",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=989&q=80",
    description: "Track your fitness and stay connected with this premium smartwatch."
  },
  {
    id: "3",
    name: "Designer Leather Bag",
    category: "fashion",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    description: "Handcrafted premium leather bag for the modern professional."
  },
  {
    id: "4",
    name: "Ultra-Thin Laptop",
    category: "tech",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    description: "Powerful performance in an incredibly thin and light design."
  },
  {
    id: "5",
    name: "Luxury Watch",
    category: "fashion",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    description: "Precision engineering meets timeless design."
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    category: "fashion",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    description: "Protection with style for the fashion-conscious."
  },
  {
    id: "7",
    name: "Premium Wireless Earbuds",
    category: "tech",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    description: "Crystal clear sound in a compact, wireless design."
  },
  {
    id: "8",
    name: "Smart Home Speaker",
    category: "tech",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1135&q=80",
    description: "Voice-controlled smart speaker with premium sound quality."
  },
];

export type CartItem = Product & {
  quantity: number;
};

// Initial mock cart data
export const initialCart: CartItem[] = [
  {
    ...products[0],
    quantity: 1,
  },
];
