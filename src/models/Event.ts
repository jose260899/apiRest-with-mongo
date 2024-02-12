import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";


const products: Event[] = []; //Base de datos antigua

export class Event {
    public _id?: ObjectId;

    constructor(
        public title: string,
        public date: Date,
        public description: string,
        public price: number,
        public id?: string
    ){
        if(id) this._id = new ObjectId(id);
    }
    async save(){
        if(this._id){
            const result = await collections.events?.updateOne({_id: this._id},{$set: this});
            result
                ? console.log(`Successfully updated product with id ${this._id}`)
                : console.log("Failed to create a new product.");
            return;
        }else{
            const result = await collections.events?.insertOne(this);
            result
                    ? console.log(`Successfully created a new product with id ${result.insertedId}`)
                    : console.log("Failed to create a new product.");
        }
    };

    static async fetchAll(){
        return await collections.events?.find().toArray();
    };
    static async findById(productId: string){
        console.log('FindById',productId);
        return await collections.events?.findOne({_id: new ObjectId(productId)});
    }
    static deleteById(productId: string) {
        console.log('DeleteById', productId);
        return collections.events?.deleteOne({ _id: new ObjectId(productId) });
       
    };
}