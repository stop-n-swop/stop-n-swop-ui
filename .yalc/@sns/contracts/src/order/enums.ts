export enum Status {
  OPEN = "open", // the default - listing is open
  CLOSED = "closed", // listing has been closed by the seller
  CREATED = "created", // a buyer has started the checkout process
  PENDING = "pending", // the buyer has partially progressed through the checkout process
  PLACED = "placed", // the buyer has submitted their order with payment details and is waiting for the payment to succeed
  PAID = "paid", // the buyer's payment has gone through
  NOT_PAID = "notPaid", // the buyer's payment has failed
  APPROVED = "approved", // the seller has approved the order
  DECLINED = "declined", // the seller has declined the order
  POSTED = "posted", // the seller has posted the item
  RECEIVED = "received", // the buyer has received the item
  DISPUTED = "disputed", // the buyer has received the item but is not happy with it
  NOT_RECEIVED = "notReceived", // the buyer has not received the item after a certain amount of time
  NO_RESPONSE = "noResponse", // the buyer never told us the order arrived so we just assumed it
  COMPLETE = "complete", // the order is complete and the funds have been transferred into the seller's wallet
  CANCELLED = "cancelled", // the transaction has been cancelled by the buyer
}
