const Skill = require('../models/Skill');

exports.getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, proficiencyLevel: -1 });

    // Group by category
    const categorized = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({ success: true, data: categorized });
  } catch (error) {
    next(error);
  }
};
