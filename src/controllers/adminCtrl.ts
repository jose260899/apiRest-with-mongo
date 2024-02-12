import { Request, Response, NextFunction } from "express";

import { Event } from "../models/Event.js";


export const getEvents = async (req: Request, res: Response) => {
    res.render('admin/products', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        prods: await Event.fetchAll()
    });
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.body._id; // Suponiendo que estás pasando el ID como parámetro en la URL
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        res.status(200).json({ event: event });
    } catch (error) {
        console.error('Error al obtener el evento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const postAddEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Añadimos un producto");
        const { title, date, description, price } = req.body;

        if (!title || !price) {
            return res.status(400).json({ error: 'El título y el precio son obligatorios' });
        }
        const product = new Event(title, date, description, +price);
        await product.save();
        res.status(201).json({ message: 'Producto agregado correctamente', product: product });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


export const putEditEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId; // Suponiendo que el ID está en la URL, por ejemplo: /events/:id
        const { title, date, description, price } = req.body;
        if (!title || !price) {
            return res.status(400).json({ error: 'El título y el precio son obligatorios' });
        }
        const evento = await Event.findById(eventId);
        if (evento) {
            evento.title = title;
            evento.date = date;
            evento.description = description;
            evento.price = +price;
            const newEvento = new Event(evento?.title, evento?.date, evento?.description, evento?.price, evento?._id.toHexString());
            console.log(newEvento);
            await newEvento.save();
            res.status(200).json({ message: 'Evento actualizado correctamente', event: evento });
        } else {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
    } catch (error) {
        console.error('Error al editar el evento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const postDeleteEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId; // Suponiendo que el ID está en la URL, por ejemplo: /events/:id
        const event = await Event.findById(eventId);
        console.log(event);
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        await Event.deleteById(eventId);
        res.status(200).json({ message: 'Evento eliminado correctamente', event: event });
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


