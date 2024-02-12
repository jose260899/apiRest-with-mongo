import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";
const products = []; //Base de datos antigua
export class Event {
    constructor(title, date, description, price, id) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.price = price;
        this.id = id;
        if (id)
            this._id = new ObjectId(id);
    }
    async save() {
        var _a, _b;
        if (this._id) {
            const result = await ((_a = collections.events) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: this._id }, { $set: this }));
            result
                ? console.log(`Successfully updated product with id ${this._id}`)
                : console.log("Failed to create a new product.");
            return;
        }
        else {
            const result = await ((_b = collections.events) === null || _b === void 0 ? void 0 : _b.insertOne(this));
            result
                ? console.log(`Successfully created a new product with id ${result.insertedId}`)
                : console.log("Failed to create a new product.");
        }
    }
    ;
    static async fetchAll() {
        var _a;
        return await ((_a = collections.events) === null || _a === void 0 ? void 0 : _a.find().toArray());
    }
    ;
    static async findById(productId) {
        var _a;
        console.log('FindById', productId);
        return await ((_a = collections.events) === null || _a === void 0 ? void 0 : _a.findOne({ _id: new ObjectId(productId) }));
    }
    static deleteById(productId) {
        var _a;
        console.log('DeleteById', productId);
        return (_a = collections.events) === null || _a === void 0 ? void 0 : _a.deleteOne({ _id: new ObjectId(productId) });
    }
    ;
}
