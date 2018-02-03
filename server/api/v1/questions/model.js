const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  text: {
    type: String,
    required: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
},{
    timestamps: true
});
    
module.exports = mongoose.model('question', schema);
