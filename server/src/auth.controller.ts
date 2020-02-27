import * as express from 'express';

import {UserService} from "./users/user.service";

const controller = express.Router();

const userService = new UserService();

controller.post('/', async (req, res) => {
    let result = await userService.verifyUser(req.body.username, req.body.password);
    res.send({result: result});
});

export {controller as AuthController};
