const mongoose = require('mongoose');

function ConnectDB(){
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backendAPI"
    }).then((c)=>{
        console.log(`DateBase Connected with ${c.connection.host} 🔥`);
    }).catch((e)=>{
        console.log('Error Connecting DataBase', e);
    })
}


module.exports = ConnectDB;