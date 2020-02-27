import {DAO} from "../dao/dao";

export class UserDAO extends DAO {
    constructor() {
        super('users');
    }
}
