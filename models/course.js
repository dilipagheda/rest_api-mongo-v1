const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const courseSchema = new Schema({
    user:ObjectId,
    title: String,
    description: String,
    estimatedTime: String,
    materialsNeeded:String
});

module.exports = mongoose.model('Course',courseSchema);

