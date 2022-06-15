const mongoose = require('mongoose');

exports.connect = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('DB is connected');
        })
        .catch((error) => {
            console.error(error);
        });
};
