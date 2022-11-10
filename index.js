const fs = require('fs/promises');
const path = require('path')

const sorter = async (readFolder, writeFolder, gender) => {
    try{
        const pathFolder = path.join(__dirname, readFolder)

        const files = await fs.readdir(pathFolder)

        for (const file of files) {
            const filePath = path.join(pathFolder, file)
            const data = await fs.readFile(filePath);
            const user = JSON.parse(data);

            if (user.sex === gender) {
                await fs.rename(filePath, path.join(__dirname, writeFolder, file))
            }
        }
    } catch (e){
        console.error(e)
    }
}

sorter("boys", "girls", "female")
sorter("girls", "boys", "male")


// to get main directory use :   process.cwd()

// const foo1 = async () => {
//     const pathFolder = path.join(__dirname, "girls")
//
//     const files = await fs.readdir(pathFolder)
//
//     for (const file of files) {
//         const filePath = path.join(pathFolder, file)
//         const data = await fs.readFile(filePath);
//         const user = JSON.parse(data);
//         if (user.sex === "male") {
//             await fs.rename(filePath, path.join(__dirname, "boys", file))
//         }
//     }
// }
