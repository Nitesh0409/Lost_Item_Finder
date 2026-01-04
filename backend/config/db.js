const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.DB_URI) {
        console.error('DB_URI is missing. Please set it in your environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
