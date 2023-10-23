const mongoose = require('mongoose');

function ConnectDB(){
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backendAPI"
    }).then(()=>{
        console.log(`DataBase Connected Successfully.. 🔥`);
    }).catch((e)=>{
        console.log('Error Connecting DataBase', e);
    })
}


module.exports = ConnectDB;