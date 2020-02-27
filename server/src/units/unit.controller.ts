import * as express from 'express';

import { UnitService }   from './unit.service';

const controller = express.Router({mergeParams: true});

const unitService = new UnitService();

controller.get('/', async (req, res) => {
    const query = req.body || {};
    const offset = parseInt(req.query.offset || 0, 10);
    const limit = parseInt(req.query.limit || 1000, 10); //get everything
    const propertyId = req.params.propertyId;
    const units = await unitService.getUnits({propertyId: propertyId}, offset, limit);
    res.send(units);
});

controller.post('/:unitId/form', async (req, res) => {
    res.send({
        propertyId: req.params.propertyId,
        unitId: req.params.unitId,
        body: req.body.content
    });
});

export { controller as UnitController };
