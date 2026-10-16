const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Tools'],
    },
    proficiencyLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
