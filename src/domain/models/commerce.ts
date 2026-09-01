export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  priceSnapshot: number;
}

export interface Cart {
  items: CartItem[];
  updatedAt: string;
}

export interface Wishlist {
  productIds: string[];
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  body: string;
  createdAt: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscriptionData {
  email: string;
}
