const mongoose = require('mongoose');
require('dotenv').config();

const connectDBRecords = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_URI );
        console.log("MongoDB connected . . .");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
//'mongodb+srv://askarsahib11:movie@movies.dqeyh.mongodb.net/crud?retryWrites=true&w=majority&appName=movies'


module.exports = connectDBRecords;
 

