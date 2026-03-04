export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  badge?: string;
  inStock?: boolean;
  sku?: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  urduName?: string;
  urduLocation?: string;
  urduText?: string;
  image: string;
}

export interface TrustBadge {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}
