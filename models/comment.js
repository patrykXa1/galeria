const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    image: { type: Schema.Types.ObjectId, ref: 'Images', required: true } 
}, { collection: 'comments' });

module.exports = mongoose.model('Comment', commentSchema);
