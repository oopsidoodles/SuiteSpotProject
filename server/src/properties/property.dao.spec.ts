import 'jasmine';

import * as _ from 'lodash';

import { PropertyDAO } from './property.dao';
import { Property, Unit } from './property.model';

describe('Property Module', () => {

  const dao = new PropertyDAO();

  beforeEach(() => {
    dao.clearAll();
  });

  it('should insert and query properties', async () => {

    const emerald = {
      name: 'Emerald Towers',
      address: '42 Wallaby Way, Sydney',
      units: []
    };

    addUnits(emerald, 12, 20);

    const seinfeldApt = { name: 'Seinfeld', address: '129 West 81st Street', units: [] };

    addUnits(seinfeldApt, 8, 16);

    const sherlock = { name: 'Sherlock', address: '221 B Baker St.', units: [] };

    addUnits(sherlock, 1, 2);

    await dao.insert(emerald);
    await dao.insert(seinfeldApt);
    await dao.insert(sherlock);

    let props = await dao.query({ name: emerald.name, 'units[5].rent': emerald.units[5].rent }, 0, 10);

    expect(props.length).toBe(1);

    props = await dao.query({}, 0, 10);

    expect(props.length).toBe(3);

    props = await dao.query({}, 2, 1);

    expect(props.length).toBe(1);

  });

});


function addUnits(property: Property, floors: number, unitsPerFloor: number) {
  for (let floor = 1; floor <= floors; floor++) {
    for (let unitNo = 0; unitNo < unitsPerFloor; unitNo++) {
      const doorNo = unitNo <= 9 ? `${floor}0${unitNo}` : `${floor}${unitNo}`
      property.units.push({
        number: doorNo,
        floor: floor,
        rent: _.random(850, 2550, false)
      } as Unit)
    }
  }
}
