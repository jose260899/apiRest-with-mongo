import { Router } from "express";
// import { getIndex, getProducts, getProductById, getSaludo, postCart, getCart, deleteCartItem, postCartIncreaseItem, postCartDecreaseItem } from "../controllers/shopCtrl.js";
import { postCartIncreaseItem, getCart, postCartDecreaseItem } from "../controllers/shopCtrl.js";
export const shopRouter = Router();
//Usamos get y por lo tanto exige coincidencia "completa", no capa otras rutas
/* shopRouter.get('/',getIndex);
shopRouter.get('/products',getProducts);
shopRouter.get('/products/:productId',getProductById);

shopRouter.post('/add-to-cart', postCart);
shopRouter.post('/cart-delete-item',deleteCartItem); */
shopRouter.post('/cart-increase-item', postCartIncreaseItem);
/*
shopRouter.get('/checkout', getCheckOut);
shopRouter.get('/orders', getOrders); */
// shopRouter.get('/saludo', getSaludo);
shopRouter.get('/cart', getCart);
shopRouter.delete('/cart-decrease-item', postCartDecreaseItem);
