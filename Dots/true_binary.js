'use strict'
// const recursion = (str, offset = 0, tmp = "", result = []) => {
//     if (offset === str.length - 1) {
//         tmp += str[offset]
//         result.push(tmp)
//         return result
//     }


//     const char = str[offset]
//     recursion(str, offset + 1, tmp + char, result)
//     recursion(str, offset + 1, tmp + char + ".", result)

//     return result
// }

// console.log(recursion('abc'))

const result = []
const recHard = (str, index = 1) => {
    if (str.length === index) {
        result.push(str)
        return
    }

    recHard(str.slice(0, index) + "." + str.slice(index), index + 2)
    recHard(str, index + 1)
}

recHard('abc')
console.log(result)
