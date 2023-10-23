const mongoose = require('mongoose');

function ConnectDB(){
    mongoose.connect('mongodb://127.0.0.1:27017', {
        dbName: "backendAPI"
    }).then(()=>{
        console.log(`DataBase Connected Successfully.. 🔥`);
    }).catch((e)=>{
        console.log('Error Connecting DataBase', e);
    })
}


module.exports = ConnectDB;