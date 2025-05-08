"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createUsers(user) {
    return { name: "", email: "", isActive: true };
}
createUsers({ name: "", email: "", isActive: true });
var myUser = {
    _id: "32432432",
    name: "h",
    email: "h@h.com",
    isActive: false
};
// myUser._id = "49937473"; this are given error not change value this are only readonly
myUser.name = "Mitesh"; // this are change beacuse this are not readonly
var book = { title: "TS Handbook", author: "Anders" };
var Dog = /** @class */ (function () {
    function Dog() {
        this.name = "Doggo";
    }
    return Dog;
}());
var Tree = /** @class */ (function () {
    function Tree() {
        this.name = "Maple";
    }
    return Tree;
}());
