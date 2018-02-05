const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  text: {
    type: String,
    required: true
  },
    author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
    question: {
    type: Schema.Types.ObjectId,
    ref: 'question'
  }
  
  
},{
    timestamps: true
});
    
module.exports = mongoose.model('answer', schema);
