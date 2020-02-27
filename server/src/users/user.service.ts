import {User} from "./user.model";
import {UserDAO} from "./user.dao";

export class UserService {
    constructor(
        private dao = new UserDAO()
    ) { }

    public async verifyUser(username: string, password: string): Promise<boolean> {
        let users = await this.dao.query({username: username}, 0, 1);
        if (users.length === 0) {
            return Promise.resolve(false); //questionable practice resolving on fail but makes life easy
        }
        let user = users[0] as User;
        // Normally pass stored would be salted and hashed, so would have to add salt to pass and hash, then compare
        if (user.password === password) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}
