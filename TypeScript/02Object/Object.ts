const User = {
    name: "Mitesh",
    email: "mitesh@gmail.com",
    isActive: true
}

// function you have to actually pass on these objects into a function

function createUser({ name: string, isPaid: boolean }) {

}

createUser({ name: "Mitesh", isPaid: true })


function createCoure(): { name: string, price: number } {
    return { name: "reactjs", price: 399 }
}


// type Alice
type Users = {
    name: string;
    email: string;
    isActive: boolean;
}
function createUsers(user: Users): Users {
    return { name: "", email: "", isActive: true }
}
createUsers({ name: "", email: "", isActive: true })

export { }
