class User {
    constructor(login, password,age,) {
        this.login = login
        this.password = password
        this.id = `${this.login}${this.password}`;
    }
}

module.exports = User