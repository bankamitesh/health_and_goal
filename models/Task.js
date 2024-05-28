const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  frequency: { 
    type: { type: String, required: true }, 
    values: { type: [String], required: true } 
  },
  reminders: { type: [Date] },
  autoTimeSuggestions: { type: [Date] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
