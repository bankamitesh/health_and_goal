const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  goal_id: { type: Schema.Types.ObjectId, ref: 'Goal' },
  title: String,
  description: String,
  quantity: Number,
  frequency: String,
  days_of_week: [String],
  reminder_time: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
