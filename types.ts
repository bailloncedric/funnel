// Fix: Define the application's shared types.
export enum FunnelStep {
  Landing,
  Details,
  Pricing,
  Checkout,
  Upsell,
  Downsell,
  ThankYou,
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}

export interface Order {
  mainProduct: boolean;
  upsellProduct: boolean;
  downsellProduct: boolean;
  total: number;
}
