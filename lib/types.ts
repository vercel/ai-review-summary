export interface Review {
  review: string;
  authorName: string;
  date: string;
  stars: number;
}

export interface Product {
  name: string;
  reviews: Review[];
}
