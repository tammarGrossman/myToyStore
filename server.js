const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({path:'./config.env'});
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8001;
// connect to database
const connectToDB = () => {
    mongoose.connect(MONGODB_URL)
        .then((con) => console.log(`connected to database: ${MONGODB_URL}`))
        .catch((error) => {
            console.error("Error to connect to database");
            console.error(error);
        });
};
connectToDB();

app.listen(PORT, () => {
    console.log(`the server is running on port: ${PORT}`);
});
