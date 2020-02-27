import { UnitDAO }   from './unit.dao';
import { Unit }      from './unit.model';

export class UnitService {
    constructor(
        private dao = new UnitDAO()
    ) { }

    public getUnits(
        query: any = {},
        offset: number = 0,
        limit: number = 10
    ): Promise<Unit[]> {
        return this.dao.query(query, offset, limit);
    }
}
