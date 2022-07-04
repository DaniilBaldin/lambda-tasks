'use strict'
function* charGenerator(count, char) {
    while (true) {
        for (let i = 0; i < count; i++) yield char
        for (let i = 0; i < count; i++) yield char + '.'
    }
}

function* dryRun(char) {
    while (true) {
        yield char
    }
}

const generators = (str) => {
    const result = []

    const gens = str.split('').map((char, index, arr) => {
        if (arr.length - 1 === index) return dryRun(char);
        return charGenerator(2 ** index, char)
    })

    const num = 2 ** (str.length - 1)

    for (let i = 0; i < num; i++) {
        result.push(gens.map((it) => it.next().value).join(""));
    }
    return result
}

console.log(generators('abc'))


function* genHard(str) {
    const gens = str.split("").map((char, index, arr) => {
        return charGenerator(2 ** index, char)
    })

    const num = 2 ** (str.length - 1)
    for (let i = 0; i < num; i++) {
        yield gens.map((it) => it.next().value).join("")
    }
}

const result = genHard('abcd')

for (let item of result) {
    console.log(item)
}
