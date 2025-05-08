// function detectType
function detectType(val: string | number) {
    if (typeof val === 'string') {
        return val.toLowerCase()
    }
    return val + 3
}

function provideId(id: string | null) {
    if (!id) {
        console.log("Pleace provide ID")
        return
    }
    id.toLowerCase()
}

function printAll(star: string | string[] | null) {
    if (star) {
        if (typeof star === 'object') {
            for (const s of star) {
                console.log(s);
            }
        } else if (typeof star === 'string') {
            console.log(star);
        }
    }
}