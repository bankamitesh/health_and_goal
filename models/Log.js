const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  goal_id: { type: Schema.Types.ObjectId, ref: 'Goal' },
  task_id: { type: Schema.Types.ObjectId, ref: 'Task' },
  log_entry: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
