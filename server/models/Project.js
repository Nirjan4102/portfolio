const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
