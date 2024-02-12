import { Router } from "express";
//import {  getEditProduct, getProducts, postAddProduct, postEditProduct } from "../controllers/adminCtrl.js";
import { postDeleteEventById, getEvent, getEvents, postAddEvent, putEditEvent } from "../controllers/adminCtrl.js";
export const adminRouter = Router();
//todas las rutas que llegan aquí empiezan por /admin
adminRouter.get('/products', getEvents);
adminRouter.get('/get-event', getEvent); //GET para presentar el formulario
adminRouter.post('/add-event', postAddEvent); //POST para recibir los datos del formulario
adminRouter.put('/edit-event/:eventId', putEditEvent);
//adminRouter.post('/edit-product',postEditProduct);
adminRouter.delete('/delete-event/:eventId', postDeleteEventById);
//adminRouter.post('/delete-product') - Delete item - Ruta para eliminar un producto
