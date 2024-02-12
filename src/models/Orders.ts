import { ObjectId } from "mongodb";

import { Event } from "./Event.js";
import { User } from "./User.js";

export interface OrderItem {
    event: Event,
    qty: number
}

export interface Order {
    date: Date,
    user: User,
    items: OrderItem[]
}


