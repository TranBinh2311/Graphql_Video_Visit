const mongoose = require('mongoose')

const DBconnect = async () =>{
    try{
        await mongoose.connect(process.env.mongooseURL,{
            //useCreateIndex : true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//useFindAndModify: false,
		});
        console.log("Mongo DB is connected");
    }
    catch(err)
    {
        console.log("Error reason is : " + err.message);
        //process.exit(1);
    }
} 
module.exports = {DBconnect}