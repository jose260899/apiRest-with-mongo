import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";
export class User {
    constructor(DNI, name, mail, contacto, cart, id) {
        this.DNI = DNI;
        this.name = name;
        this.mail = mail;
        this.contacto = contacto;
        this.cart = [];
        if (id)
            this._id = new ObjectId(id);
        cart ? this.cart = cart : this.cart = [];
    }
    async save() {
        var _a, _b;
        const result1 = await ((_a = collections.users) === null || _a === void 0 ? void 0 : _a.findOne({ DNI: this.DNI }));
        if (result1) {
            this._id = result1._id;
            console.log("Usuario ya disponible");
            return this;
        }
        const result = await ((_b = collections.users) === null || _b === void 0 ? void 0 : _b.insertOne(this));
        console.log(result);
        result
            ? console.log(`Successfully created a new user with id ${result.insertedId}`)
            : console.log("Failed to create a new user.");
        return; //this;
    }
    static async fetchById(id) {
        var _a;
        return await ((_a = collections.users) === null || _a === void 0 ? void 0 : _a.findOne({ _id: new ObjectId(id) }));
    }
    async addToCart(id) {
        var _a;
        //Ver si el producto está en el carro
        const index = this.cart.findIndex(c => c.pid.toHexString() === id);
        if (index >= 0) {
            this.cart[index].qty += 1;
        }
        else {
            const prodId = new ObjectId(id);
            this.cart.push({ pid: prodId, qty: 1 });
        }
        return await ((_a = collections.users) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: this._id }, { $set: { cart: this.cart } }));
    }
    async getCart() {
        var _a;
        const prodIds = this.cart.map(ci => ci.pid);
        const events = await ((_a = collections.events) === null || _a === void 0 ? void 0 : _a.find({ _id: { $in: prodIds } }).toArray());
        return events === null || events === void 0 ? void 0 : events.map(p => {
            var _a;
            const qty = (_a = this.cart.find(ci => p._id.toHexString() === ci.pid.toHexString())) === null || _a === void 0 ? void 0 : _a.qty;
            return {
                _id: p._id,
                title: p.title,
                price: p.price,
                qty: qty
            };
        });
    }
    async deleteCartItem(id) {
        var _a;
        const index = this.cart.findIndex(c => c.pid.toHexString() === id);
        console.log(index);
        if (index >= 0) {
            this.cart.splice(index, 1);
            return await ((_a = collections.users) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: this._id }, { $set: { cart: this.cart } }));
        }
    }
    async decreaseCartItem(id) {
        var _a;
        const index = this.cart.findIndex(c => c.pid.toHexString() === id);
        if (index >= 0) {
            const qty = this.cart[index].qty;
            if (qty === 1) {
                await this.deleteCartItem(id);
            }
            else {
                this.cart[index].qty -= 1;
            }
            return await ((_a = collections.users) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: this._id }, { $set: { cart: this.cart } }));
        }
        else {
            return;
        }
    }
    ;
    async addOrder() {
        var _a, _b;
        if (this.cart.length > 0 && this._id) {
            const prodsId = this.cart.map(ci => ci.pid); //Listado de todos los ids de los productos que tengo en el cart
            const events = await ((_a = collections.events) === null || _a === void 0 ? void 0 : _a.find({ _id: { $in: prodsId } }).toArray());
            if (events) {
                const items = events.map(event => {
                    return {
                        event: event,
                        qty: this.cart.find(ci => ci.pid.toHexString() === event._id.toHexString()).qty
                    };
                });
                const time = new Date();
                this.cart = [];
                const result = await collections.users.updateOne({ _id: this._id }, { $set: { cart: [] } });
                result
                    ? console.log('UpdateCart: ', result)
                    : console.log('Cart no vaciado');
                const newOrder = { user: this, date: time, items: items };
                return await ((_b = collections.orders) === null || _b === void 0 ? void 0 : _b.insertOne(newOrder));
            }
        }
        else {
            return null;
        }
    }
    ;
    async getOrders() {
        var _a;
        return await ((_a = collections.orders) === null || _a === void 0 ? void 0 : _a.find({ 'user._id': this._id }).toArray());
    }
    ;
}
