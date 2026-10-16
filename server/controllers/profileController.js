exports.getProfile = async (req, res, next) => {
  try {
    const profile = {
      name: 'Nirjan Mondal',
      title: 'Full-Stack Developer',
      tagline: 'I craft modern, performant web applications with clean code and thoughtful user experiences.',
      about: [
        "I'm a passionate Full-Stack Developer with a love for creating elegant, efficient, and user-friendly web applications. With expertise spanning front-end frameworks to back-end architectures, I enjoy turning complex problems into simple, beautiful solutions.",
        "My journey in web development started with curiosity and has grown into a professional pursuit of excellence. I'm constantly learning new technologies and best practices to deliver high-quality software that makes a difference.",
      ],
      stats: {
        experience: '3+',
        projectsCompleted: '20+',
        technologies: '10+',
      },
      socials: {
        github: 'https://github.com/Nirjan4102',
        linkedin: 'https://www.linkedin.com/in/nirjan-mondal-863235294/',
      },
    };

    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};
