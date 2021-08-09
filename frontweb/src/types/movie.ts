import { Review } from "./review";

export type Movie = {
  id: number;
  title: string;
  imgUrl?: string;
  reviews?: Review;
};
