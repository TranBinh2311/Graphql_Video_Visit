const app = require('./lib/app')
const {DBconnect} = require('./lib/db/index')
require('dotenv/config')


const PORT = process.env.PORT || 8080

DBconnect();



app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
})