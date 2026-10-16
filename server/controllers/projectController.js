const Project = require('../models/Project');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Nirjan4102';

// Metadata enhancements for known GitHub repos
const REPO_METADATA = {
  'LUXE': {
    title: 'LUXE - E-Commerce Store',
    description: 'Premium Lifestyle E-Commerce Store built with vanilla HTML, CSS, and JavaScript featuring product browsing, shopping cart, and sleek UI.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'E-Commerce'],
    featured: true,
  },
  'animated-portfolio-builder': {
    title: 'Animated Portfolio Builder',
    description: 'An interactive web application to customize and generate dynamic, animated developer portfolios with modern design.',
    techStack: ['JavaScript', 'CSS3', 'Vercel', 'UI/UX'],
    featured: true,
  },
  'blood-app': {
    title: 'Blood Donation App',
    description: 'A community blood donation and management platform connecting donors with patients requiring urgent blood requests.',
    techStack: ['JavaScript', 'Node.js', 'Express', 'HTML5'],
    featured: false,
  },
  'Nirjan4102.github.io': {
    title: 'Personal Portfolio (GitHub Pages)',
    description: 'Personal web development portfolio and showcase built and deployed via GitHub Pages.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    featured: false,
  },
};

exports.getAllProjects = async (req, res, next) => {
  try {
    let projects = [];

    // Attempt to fetch fresh repositories from GitHub API
    try {
      const ghResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
        {
          headers: {
            'User-Agent': 'Portfolio-App',
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (ghResponse.ok) {
        const repos = await ghResponse.json();

        projects = repos.map((repo) => {
          const meta = REPO_METADATA[repo.name] || {};

          // Auto-generate title from repo name if no custom metadata
          const formattedTitle =
            meta.title ||
            repo.name
              .replace(/[-_]/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase());

          const description =
            meta.description ||
            repo.description ||
            `Open-source project built with ${repo.language || 'modern web technologies'}.`;

          const techStack =
            meta.techStack ||
            [repo.language, ...(repo.topics || [])].filter(Boolean);

          const liveUrl = repo.homepage || '';
          const githubUrl = repo.html_url;
          const featured = meta.featured !== undefined ? meta.featured : Boolean(repo.homepage);

          return {
            title: formattedTitle,
            description,
            techStack: techStack.length ? techStack : ['JavaScript'],
            liveUrl,
            githubUrl,
            featured,
            image: '',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          };
        });

        // Sync with MongoDB in the background
        Project.deleteMany({}).then(() => Project.insertMany(projects)).catch(() => {});

        return res.json({ success: true, count: projects.length, data: projects });
      }
    } catch (ghErr) {
      console.warn('⚠️ GitHub API fetch failed, falling back to database:', ghErr.message);
    }

    // Fallback: Retrieve stored projects from MongoDB
    projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};
