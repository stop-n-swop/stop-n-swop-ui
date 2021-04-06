import { Status } from "./enums";

export interface Order {
  listingId: string;
  username: string;
  status: Status;
}
