class User {
    name: string;
    age!: number;

    constructor(name: string) {
        this.name = name;
    }
}

const user = new User('John');
console.log(user);