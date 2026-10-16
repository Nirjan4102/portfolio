require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const projects = [
  {
    title: 'LUXE - E-Commerce Store',
    description: 'Premium Lifestyle E-Commerce Store built with vanilla HTML, CSS, and JavaScript featuring product browsing, shopping cart, and sleek UI.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'E-Commerce'],
    liveUrl: 'https://Nirjan4102.github.io/LUXE/',
    githubUrl: 'https://github.com/Nirjan4102/LUXE',
    featured: true,
    image: '',
  },
  {
    title: 'Animated Portfolio Builder',
    description: 'An interactive web application to customize and generate dynamic, animated developer portfolios with modern design.',
    techStack: ['JavaScript', 'CSS3', 'Vercel', 'UI/UX'],
    liveUrl: 'https://animated-portfolio-builder.vercel.app',
    githubUrl: 'https://github.com/Nirjan4102/animated-portfolio-builder',
    featured: true,
    image: '',
  },
  {
    title: 'Blood Donation App',
    description: 'A community blood donation and management platform connecting donors with patients requiring urgent blood requests.',
    techStack: ['JavaScript', 'Node.js', 'Express', 'HTML5'],
    liveUrl: '',
    githubUrl: 'https://github.com/Nirjan4102/blood-app',
    featured: false,
    image: '',
  },
  {
    title: 'Personal Portfolio (GitHub Pages)',
    description: 'Personal web development portfolio and showcase built and deployed via GitHub Pages.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    liveUrl: 'https://Nirjan4102.github.io',
    githubUrl: 'https://github.com/Nirjan4102/Nirjan4102.github.io',
    featured: false,
    image: '',
  },
];

const skills = [
  { name: 'HTML5', category: 'Frontend', proficiencyLevel: 95 },
  { name: 'CSS3 / Sass', category: 'Frontend', proficiencyLevel: 90 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiencyLevel: 92 },
  { name: 'React', category: 'Frontend', proficiencyLevel: 85 },
  { name: 'Vue.js', category: 'Frontend', proficiencyLevel: 75 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiencyLevel: 88 },
  { name: 'Node.js', category: 'Backend', proficiencyLevel: 90 },
  { name: 'Express.js', category: 'Backend', proficiencyLevel: 88 },
  { name: 'MongoDB', category: 'Backend', proficiencyLevel: 85 },
  { name: 'PostgreSQL', category: 'Backend', proficiencyLevel: 78 },
  { name: 'REST APIs', category: 'Backend', proficiencyLevel: 92 },
  { name: 'Python', category: 'Backend', proficiencyLevel: 80 },
  { name: 'Git / GitHub', category: 'Tools', proficiencyLevel: 90 },
  { name: 'Docker', category: 'Tools', proficiencyLevel: 72 },
  { name: 'VS Code', category: 'Tools', proficiencyLevel: 95 },
  { name: 'Postman', category: 'Tools', proficiencyLevel: 85 },
  { name: 'Linux / CLI', category: 'Tools', proficiencyLevel: 82 },
  { name: 'Figma', category: 'Tools', proficiencyLevel: 70 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected for seeding');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('🗑️  Cleared existing projects and skills');

    // Insert seed data
    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    console.log('🌱 Seed data inserted successfully!');
    console.log(`   → ${projects.length} projects`);
    console.log(`   → ${skills.length} skills`);

    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
