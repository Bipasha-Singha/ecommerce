const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const db = process.env.DATABASE;

mongoose.connect(db,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log(e);
})