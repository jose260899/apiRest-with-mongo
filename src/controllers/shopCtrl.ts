import { NextFunction, Request, Response } from "express";

import { Event } from "../models/Event.js";
import { User } from "../models/User.js";


/* export const getCart = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user as User;
    const items = await user.getCart();
    //console.log(items);
    res.render('shop/cart',{
                pageTitle: 'Carro de la compra',
                path: '/cart',
                items: items,
            })
} */


export const postCartIncreaseItem = async (req: Request,res: Response,next: NextFunction)=>{
    const user=  req.body.user as User;
    const eventId = req.body.eventId;
    await user.addToCart(eventId);
    res.status(200).json({ message: "añadido" });

};

export const getCart = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user as User;
    const items = await user.getCart();
    res.status(200).json({  items:items });
}

export const postCartDecreaseItem = async (req: Request,res: Response,next: NextFunction)=>{
    const user = req.body.user as User;
    const eventId = req.body.eventId;
    await user.decreaseCartItem(eventId);
    res.status(200).json({  user:user });

};