const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new Schema({
    email: String,
    comment:String
});


module.exports =  mongoose.model('comments',commentsSchema);

