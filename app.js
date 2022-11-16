const express = require('express');
const fs = require('fs/promises');
const path = require('path');

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dataBasePath = path.join(__dirname, 'dataBase', 'users.json');

app.get('/', (req, res) => {

    res.end('hello world')
})

app.get('/users', (req, res) => {

    const readAll = async () => {
        try {
            const data = await fs.readFile(dataBasePath)
            return JSON.parse(data)
        } catch (e) {
            return e
        }

    }

    readAll().then(value => {
        res.json(value)
    }).catch(reason => {
        res.json(reason)
    })

})

app.get('/users/:id', (req, res) => {
    let {id} = req.params;

    const userByID = async () => {
        try {
            let data = await fs.readFile(dataBasePath);
            return JSON.parse(data)
        } catch (e) {
            console.log(e);
        }

    }

    if (!isNaN(+id)) {

        userByID().then(value => {
            if (value.length - 1 >= id && id >= 0) {
                res.json(value[id]);
            } else {
                res.json('user is not found');
            }
        }).catch(e => {
            console.log(e);
            // res.json(e); to show it in a row
        })

    } else {
        res.json('You must write a number id');
    }

})

app.post('/users', (req, res) => {
    const data = req.body;

    const addUser = async () => {
        try {
            let oldData = await fs.readFile(dataBasePath);
            oldData = JSON.parse(oldData);
            oldData.push(data);
            await fs.writeFile(dataBasePath, JSON.stringify(oldData))
            return oldData
        } catch (e) {
            console.log(e)
        }
    }

    if (data.name.length > 2 && data.age > 0) {
        addUser().then(value => {
            res.json(value);
        })

    } else {
        res.end('bad request')
    }
})

app.delete('/users/:id',(req, res) => {
    let {id} = req.params;

    const deleteById = async () => {
        try {
            let data = JSON.parse(await fs.readFile(dataBasePath));
            if(!isNaN(+id) && data.length > id && id >= 0) {
                data.splice(id, 1);
                await fs.writeFile(dataBasePath, JSON.stringify(data));
                return data
            }else {
                return 'bad request';
            }
        }
        catch (e){
            console.log(e);
        }

    }

    deleteById().then(value => {
        res.json(value);
    }).catch(e => {
        console.log(e);
    })

})

app.patch('/users/:id', (req, res)=>{
    let {id} = req.params;
    let object = req.body;

    const changeById = async () => {
        try {
            let data = JSON.parse(await fs.readFile(dataBasePath));
            if(!isNaN(+id) && data.length > id && id >= 0){
                data.splice(id,1, object);
                await fs.writeFile(dataBasePath,JSON.stringify(data));
                return data
            }else{
                return 'Bad request. ID is incorrect'
            }
        }catch (e) {
            console.log(e)
        }

    };

    if (object.name.length >= 2 && object.age > 0) {
        changeById().then(value => {
            res.json(value)
        }).catch(e => {
            console.log(e);
        })

    } else {
        res.end('bad request')
    }

})



app.listen(3000, () => {
    console.log('server started at port 3000');
})






