'use strict'

// const dotsSimple = (str) => {
//     let result = [str[0]];

//     for (let i = 1; i < str.length; i++) {
//         const slice = result.slice()
//         console.log(slice)
//         const copy = result.slice().map((value) => value + ".");
//         result = [...result, ...copy].map((value) => value + str[i]);
//     }

//     return result
// }

// const dotsSimpleRec = (str, offset = 1, result = [str[0]]) => {
//     if (offset === str.length) {
//         return result
//         console.log(result)
//     }

//     const letter = str[offset]
//     const copy = result.slice().map((it) => it + '.')
//     console.log(copy)
//     result.push(...copy)
//     result = result.map((it) => it + letter)
//     console.log(result)
//     return dotsSimpleRec(str, offset + 1, result)
// }

// const dotsRecursion = (str, tmp = [str[0]]) => {
//     if (str.length === 1) {
//         return tmp
//     }

//     console.log(tmp)
//     const letter = str[1]

//     str = str.slice(1)
//     console.log(str)
//     const nextWithoutDots = tmp.slice().map((it) => it + letter)
//     const nextWithDots = tmp.map((it) => it + '.' + letter)

//     console.log(nextWithoutDots)
//     console.log(nextWithDots)

//     const withoutDots = dotsRecursion(str, nextWithoutDots)
//     const withDots = dotsRecursion(str, nextWithDots)

//     return [...withoutDots, ...withDots]

// }

const dotsRecurs = (str, flag, tmp = [str[0]]) => {
    const letter = str[1]
    str = str.slice(1)
    tmp = tmp.slice().map((it) => it + (flag ? '.' : '') + letter)

    if (str.length === 1) {
        return tmp
    }

    const withoutDots = dotsRecurs(str, false, tmp)
    const withDots = dotsRecurs(str, true, tmp)

    return [...withoutDots, ...withDots]

}


// console.log(dotsSimple('abcd'));
// console.log(dotsSimpleRec('abcd')); 
// console.log(dotsRecursion('abc'));
console.log([...dotsRecurs('abcd', false), ...dotsRecurs('abcd', true)]);
