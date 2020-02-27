import { Collection, Database, Datastore } from '../datastore/datastore';
import {Unit}                              from "../units/unit.model";

export abstract class DAO {
    _collectionName: string;

    constructor(
        collectionName,
        private db: Database = Datastore.getDB()
    ) {
        this._collectionName = collectionName;
    }

    public async insert(item: any): Promise<string> {
        const result = await this.itemCollection().insert(item);
        return result._id;
    }

    public async query(query: any, offset: number, limit: number): Promise<any[]> {
        const items = await this.itemCollection().find(query);
        return items.slice(offset, offset + limit);
    }

    public getItem(id: string): Promise<Unit> {
        return this.itemCollection().findById(id)
    }

    public clearAll() {
        return this.itemCollection().destroy();
    }

    private itemCollection(): Collection<Unit> {
        return this.db.collection(this._collectionName);
    }
}
