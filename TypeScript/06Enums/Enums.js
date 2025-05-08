"use strict";
// const user: (string | number)[] = [1, "3"]
Object.defineProperty(exports, "__esModule", { value: true });
// write in only define type order value
var user = ["1", 3, false];
// const user: [string, number, boolean] = ["1", 3, "Mitesh"] // given error
var rgb = [255, 3, 55];
var newUser = [122, "mi@.com"];
newUser[0] = 3223;
newUser[1] = "cdd@.com";
// newUser.push(true)
// Enums
var SeatChoice;
(function (SeatChoice) {
    // AISLE = 1,
    // MIDDLE, // 2 by defualt
    // WINDOW = 20,
    // FOURTH // 21 by defualt
    SeatChoice["AISLE"] = "aisle";
    SeatChoice[SeatChoice["MIDDLE"] = 3] = "MIDDLE";
    SeatChoice["WINDOW"] = " window";
    SeatChoice["FOURTH"] = "";
    SeatChoice[SeatChoice["FIVE"] = 4] = "FIVE";
})(SeatChoice || (SeatChoice = {}));
var hcSeat = SeatChoice.AISLE;
