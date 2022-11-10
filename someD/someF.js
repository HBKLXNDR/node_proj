console.log("I am builder");

function studentBuilder(name, age) {
    return {
        name,
        age,
        sleep: () => {
            console.log("No sleep");
        }
    }
}

// 1st way
module.exports = {
    studentBuilder
}


//2 way
// module.exports.fName = studentBuilder();
//


// module.exports = {
//     creator: (name, age) => {
//         return {
//             name,
//             age,
//             sleep: () => {
//                 console.log("No sleep");
//             }
//         }
//     },
//     lesson: 1
// }