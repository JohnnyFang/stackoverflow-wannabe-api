const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question',
    required: true
  }
},{
    timestamps: true
});
    
module.exports = mongoose.model('answer', schema);
