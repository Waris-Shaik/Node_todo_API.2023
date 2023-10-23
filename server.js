const server = require('./app');
const ConnectDB = require('./dataBase/data');


// connecting Database
ConnectDB();


// listening on port
server.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT} 🚀 in ${process.env.NODE_ENV} mode`);
})
