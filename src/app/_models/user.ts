export class User {

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    id: string;
    username: string;
    password: string;
}
