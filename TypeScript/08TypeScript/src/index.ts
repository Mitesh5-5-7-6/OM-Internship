class User {
    email: string
    name: string // private name: string === #name: string both are same
    private readonly city: string = "Anand"
    constructor(email: string, name: string) {
        this.email = email;
        this.name = name
    }
}

const mitesh = new User("m@.com", "Mitesh")
// mitesh.city city are not allowed in outside User class

// this are best practice
class User1 {
    private _courseCount: number = 1 // not access outside of class
    protected _courseCounts: number = 1; // same not access outside of class but use in extendes class in
    readonly city: string = "Anand"
    constructor(
        public email: string,
        public name: string,
        // private userId: string
    ) {
    }
    private deleteToken() {
        console.log("Token deleted");
    }

    get getAppleEmail(): string {
        return `apple${this.email}`
    }

    get courseCount(): number {
        return this._courseCount
    }
    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("Coursecount should be more than 1")
        }
        this._courseCount = courseNum
    }
}


class SubUser extends User1 {
    // you access User all property but not access private property

    isFamilt: boolean = true
    changeCoureCount() {
        // this._courseCount = 4 // this are private
        this._courseCounts = 4 // this are protected
    }
}

const mitesh1 = new User1("m@.com", "Mitesh")
// mitesh.city city are not allowed in outside User class

export { }