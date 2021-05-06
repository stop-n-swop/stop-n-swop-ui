import type { Condition, Region } from "./enums";
import type { Status } from "../order";

export interface Stats {
  condition: Condition;
  region: Region;
  boxed: boolean;
  instructions: boolean;
}

export interface Listing {
  productId: string;
  platformId: string;
  listingId: string;
  images: string[];
  price: number;
  rating: number;
  location: string;
  stats: Stats;
  description: string;
  username: string;
  createdDate: Date;
}

export interface AuditItem {
  listingId: string;
  date: Date;
  username: string;
  status: Status;
}
