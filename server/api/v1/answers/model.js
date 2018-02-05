const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  text: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  author: {
=======
    user: {
>>>>>>> e18e9024219bbb149249323400a8fed4d4f0b364
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
<<<<<<< HEAD
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question',
    required: true
  }
=======
    question: [{
    type: Schema.Types.ObjectId,
    ref: 'question',
    required: true
  }]
>>>>>>> e18e9024219bbb149249323400a8fed4d4f0b364
},{
    timestamps: true
});
    
module.exports = mongoose.model('answer', schema);
