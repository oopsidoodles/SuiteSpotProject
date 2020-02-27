import 'jasmine';

import * as _ from 'lodash';

import { PropertyDAO } from './property.dao';

// TODO this should not be in property dao tests
// Really this entire test file exists to populate the backend with fake data
// It does not do testing of any sort really
import {UnitDAO}       from "../units/unit.dao";
import {Unit}          from "../units/unit.model";
import {UserDAO}       from "../users/user.dao";
import {User}          from "../users/user.model";

describe('Property Module', () => {

  const propertyDAO = new PropertyDAO();
  const unitDAO = new UnitDAO();
  const userDAO = new UserDAO();

  beforeEach(() => {
    propertyDAO.clearAll();
    unitDAO.clearAll();
    userDAO.clearAll();
  });

  it('should insert and query properties', async () => {

    const emerald = {
      name: 'Emerald Towers',
      address: '42 Wallaby Way, Sydney'
    };
    let emerald_id = await propertyDAO.insert(emerald);
    addUnits(unitDAO, emerald_id, 12, 20);

    const seinfeldApt = {
      name: 'Seinfeld',
      address: '129 West 81st Street'
    };
    let seinfeldApt_id = await propertyDAO.insert(seinfeldApt);
    addUnits(unitDAO, seinfeldApt_id, 8, 16);

    const sherlock = {
      name: 'Sherlock',
      address: '221 B Baker St.'
    };
    let sherlock_id = await propertyDAO.insert(sherlock);
    addUnits(unitDAO, sherlock_id, 1, 2);

    // Adds lots of properties to populate property-list
    for (let i = 1; i <= 10; i++) {
      const property = {
        name: `Placeholder ${i}`,
        address: `${i} Sugarcane Road`
      };
      await propertyDAO.insert(property);
    }

    //Adds a user
    const user = {
      username: "admin",
      password: "123"
    };
    await userDAO.insert(user);

    // NOTE commented out since don't really care about the tests, just want to generate data
    /*let props = await propertyDAO.query({ name: emerald.name, 'units[5].rent': emerald.units[5].rent }, 0, 10);

    expect(props.length).toBe(1);

    props = await propertyDAO.query({}, 0, 10);

    expect(props.length).toBe(3);

    props = await propertyDAO.query({}, 2, 1);

    expect(props.length).toBe(1);*/

  });

});


async function addUnits(unitDAO: UnitDAO, propertyId: string, floors: number, unitsPerFloor: number) {
  for (let floor = 1; floor <= floors; floor++) {
    for (let unitNo = 0; unitNo < unitsPerFloor; unitNo++) {
      const doorNo = unitNo <= 9 ? `${floor}0${unitNo}` : `${floor}${unitNo}`;
      let id = await unitDAO.insert({
        propertyId: propertyId,
        number: doorNo,
        floor: floor,
        rent: _.random(850, 2550, false)
      } as Unit);
    }
  }
}
