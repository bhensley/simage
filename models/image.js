const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  file_name: {
    type: String,
    required: true,
    unique: true,
    tags: { index: true }
  },
  image_type: {
    type: String,
    enum: ['image/png', 'image/jpeg', 'image/gif'],
    required: true
  },
  visits: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('image', ImageSchema);