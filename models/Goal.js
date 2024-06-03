const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  min_timeline: Number,
  max_timeline: Number,
  user_timeline: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', goalSchema);
