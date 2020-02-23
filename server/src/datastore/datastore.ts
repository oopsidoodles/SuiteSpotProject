import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import * as shortid from 'shortid';

const datadir = path.join(__dirname, path.sep, '..', path.sep, '..', path.sep, 'data');

export interface Identified {
  _id: string;
}

export class Collection<T> {

  private contents: T[];

  constructor(
    private collection: string,
    private collectionFile: string = path.join(datadir, `${collection}.json`)
  ) { }

  private filestore(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        if (!fs.existsSync(this.collectionFile)) {
          fs.writeFileSync(this.collectionFile, '[]');
        }
        resolve(this.collectionFile);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  private async readFilestore(): Promise<T[]> {
    if (!!this.contents) {
      return this.contents;
    }
    const file = await this.filestore();
    const data = fs.readFileSync(file);
    const contents = JSON.parse(data.toString());
    this.contents = contents;
    return this.contents;
  }

  private async writeFilestore(): Promise<any> {
    const file = await this.filestore();
    fs.writeFileSync(file, JSON.stringify(this.contents));
    this.contents = null;
  }

  public async find(query?: any): Promise<T[]> {
    const data = await this.readFilestore();
    if (!query) {
      console.log(`NO Q: ${query}`);
      return data;
    }
    return data.filter((e: any) => {
      const keys = _.keys(query);

      return keys.reduce((acc, key) => {
        const value = _.get(e, key, null);
        const queryObj = _.get(query, key, null);

        if (typeof queryObj === 'object') {
          return this.executeConditions(value, queryObj);
        }
        console.log(`vale: ${value} valq: ${queryObj}`);
        return acc && value === queryObj;
      }, true);
    });
  }

  private executeConditions(value: any, queryObj: any): boolean {
    const queryKeys = _.keys(queryObj);
    return queryKeys.reduce((acc, key) => {
      const queryValue = _.get(queryObj, key, null);
      if (key === '$eq') {
        return acc && value === queryValue;
      } else if (key === '$ne') {
        return acc && value !== queryValue;
      } else if (key === '$gt') {
        return acc && value > queryValue;
      } else if (key === '$gte') {
        return acc && value >= queryValue;
      } else if (key === '$lt') {
        return acc && value < queryValue;
      } else if (key === '$lte') {
        return acc && value <= queryValue;
      } else if (key === '$regex') {
        if (typeof queryValue !== 'string') {
          throw new Error(`$regex operator must provide a valid regular expression: invalid '${queryValue}'`)
        }
        const parts = queryValue.split('/');
        const regexp = parts.length === 2 ? new RegExp(parts[0], parts[1]) : new RegExp(parts[0]);
        return acc && regexp.test(value);
      } else if (key === '$in') {
        if (!Array.isArray(queryValue)) {
          throw new Error(`$in operator must be used with an array value`);
        }
        return acc && queryValue.indexOf(value) >= 0;
      } else if (key === '$nin') {
        if (!Array.isArray(queryValue)) {
          throw new Error(`$nin operator must be used with an array value`);
        }
        return acc && queryValue.indexOf(value) < 0;
      }
      throw new Error(`Unknown operator ${key}`);
    }, true);
  }

  public async findById(id: string): Promise<T> {
    return this.first(e => (e as any)._id === id);
  }

  public async first(predicate: (elem: T) => boolean): Promise<T> {
    const data = await this.readFilestore();
    const one = data.filter(predicate);
    return one.length === 0 ? null : one[0];
  }

  public async insert(elem: T): Promise<T> {
    (elem as any)._id = shortid.generate();
    const data = await this.readFilestore();
    data.push(elem);
    await this.writeFilestore();
    return elem;
  }

  public async update(elem: T): Promise<T> {
    if (!(elem as any)._id) {
      throw new Error('Updating elements must have a valid _id');
    }
    this.contents = this.contents.map(e => {
      if ((e as any)._id === (elem as any)._id) {
        return elem;
      }
      return e;
    });
    await this.writeFilestore();
    return elem;
  }

  public async remove(elem: T) {
    this.contents.filter(e => {
      return (e as any)._id !== (elem as any)._id;
    });
    await this.writeFilestore();
  }

  public async destroy() {
    this.contents = [];
    await this.writeFilestore();
  }
}

export interface Database {
  collection<T>(name: string): Collection<T>;
}

class datastore implements Database {

  private db: Database = this;

  constructor() {
    console.log(`Connecting to DB ${datadir}`);
    this.setupdb();
  }

  private setupdb() {
    if (!fs.existsSync(datadir)) {
      fs.mkdirSync(datadir);
    }
  }

  public getDB(): Database {
    return this.db;
  }

  collection<T>(name: string): Collection<T> {
    return new Collection<T>(name);
  }

}

const ds = new datastore();
export { ds as Datastore }
