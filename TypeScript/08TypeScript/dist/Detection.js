function detectType(val) {
    if (typeof val === 'string') {
        return val.toLowerCase();
    }
    return val + 3;
}
function provideId(id) {
    if (!id) {
        console.log("Pleace provide ID");
        return;
    }
    id.toLowerCase();
}
function printAll(star) {
    if (star) {
        if (typeof star === 'object') {
            for (const s of star) {
                console.log(s);
            }
        }
        else if (typeof star === 'string') {
            console.log(star);
        }
    }
}
