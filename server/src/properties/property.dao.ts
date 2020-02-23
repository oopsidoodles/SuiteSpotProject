import { Collection, Database, Datastore } from '../datastore/datastore';
import { Property } from './property.model';

export class PropertyDAO {

  constructor(
    private db: Database = Datastore.getDB()
  ) { }

  public async insert(property: Property): Promise<string> {
    const result = await this.propertyCollection().insert(property);
    return result._id;
  }

  public async query(query: any, offset: number, limit: number): Promise<Property[]> {
    const properties = await this.propertyCollection().find(query)
    return properties.slice(offset, offset + limit);
  }

  public getProperty(id: string): Promise<Property> {
    return this.propertyCollection().findById(id)
  }

  public clearAll() {
    return this.propertyCollection().destroy();
  }

  private propertyCollection(): Collection<Property> {
    return this.db.collection('properties');
  }

}
