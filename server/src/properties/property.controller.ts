import * as express from 'express';

import { UnitController } from '../units/unit.controller';

import { PropertyService } from './property.service';

const propertyService = new PropertyService();

const controller = express.Router();

controller.use('/:propertyId/units', UnitController);

controller.get('/', async (req, res) => {
  const query = req.body || {};
  const offset = parseInt(req.query.offset || 0, 10);
  const limit = parseInt(req.query.limit || 1000, 10); //get everything
  const properties = await propertyService.getProperties(query, offset, limit);
  res.send(properties);
});

export { controller as PropertyController };
