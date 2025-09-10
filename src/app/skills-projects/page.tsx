'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Code2, Database, Brain, Globe, Github, ExternalLink, Filter, Search, Star, Award, Target, Zap, ChevronDown, Play } from 'lucide-react';

const skills = [
  {
    category: 'Programming Languages',
    icon: Code2,
    color: 'text-terminal-green',
    items: [
      { name: 'Python', level: 90 },
      { name: 'C++', level: 75 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML/CSS', level: 85 },
    ]
  },
  {
    category: 'AI/ML & Data Science',
    icon: Brain,
    color: 'text-terminal-blue',
    items: [
      { name: 'PyTorch', level: 80 },
      { name: 'TensorFlow', level: 75 },
      { name: 'NumPy', level: 90 },
      { name: 'Pandas', level: 85 },
      { name: 'Matplotlib', level: 80 },
      { name: 'Seaborn', level: 75 }
    ]
  },
  {
    category: 'Web Development',
    icon: Globe,
    color: 'text-terminal-purple',
    items: [
      { name: 'Django', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'React', level: 75 },
      { name: 'TailwindCSS', level: 90 },
      { name: 'Bootstrap', level: 85 }
    ]
  },
  {
    category: 'Database & Tools',
    icon: Database,
    color: 'text-terminal-orange',
    items: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 80 },
      { name: 'MS SQL', level: 70 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux', level: 75 }
    ]
  }
];

const projects = [
  {
    title: 'Smart Data Analytics Platform',
    description: 'A comprehensive machine learning platform for data analysis and prediction using advanced algorithms with interactive visualization.',
    image: '/project1.jpeg',
    tech: ['Python', 'TensorFlow', 'Pandas', 'Flask'],
    github: 'https://github.com/nischalneupanee',
    demo: null,
    type: 'AI/ML',
    status: 'Completed',
    featured: true
  },
  {
    title: 'Predictive Analytics Dashboard',
    description: 'Real-time data visualization and analysis dashboard with statistical insights and machine learning predictions.',
    image: '/project2.jpeg',
    tech: ['Python', 'Matplotlib', 'Seaborn', 'NumPy', 'Streamlit'],
    github: 'https://github.com/nischalneupanee',
    demo: null,
    type: 'Data Science',
    status: 'Completed',
    featured: true
  },
  {
    title: 'Modern Portfolio Website',
    description: 'Full-stack portfolio website built with Next.js, featuring blog integration, responsive design, and modern animations.',
    image: '/project3.jpeg',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    github: 'https://github.com/nischalneupanee',
    demo: 'https://nischalneupane.com.np',
    type: 'Web Development',
    status: 'Live',
    featured: true
  },
  {
    title: 'E-Commerce API',
    description: 'RESTful API for e-commerce platform with user authentication, product management, and order processing.',
    image: '/project1.jpeg',
    tech: ['Django', 'PostgreSQL', 'JWT', 'REST'],
    github: 'https://github.com/nischalneupanee',
    demo: null,
    type: 'Web Development',
    status: 'In Progress',
    featured: false
  },
  {
    title: 'Neural Network Classifier',
    description: 'Custom neural network implementation for image classification with various optimization algorithms.',
    image: '/project2.jpeg',
    tech: ['Python', 'PyTorch', 'OpenCV', 'NumPy'],
    github: 'https://github.com/nischalneupanee',
    demo: null,
    type: 'AI/ML',
    status: 'In Progress',
    featured: false
  }
];

const achievements = [
  { title: 'Academic Excellence', description: 'Consistent high performance in CSIT coursework', icon: Award },
  { title: 'Project Portfolio', description: '15+ completed projects across various domains', icon: Target },
  { title: 'Open Source', description: 'Active contributor to GitHub community', icon: Github },
  { title: 'Continuous Learning', description: 'Always exploring new technologies', icon: Star }
];

export default function SkillsProjects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.type === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !showFeaturedOnly || project.featured;
    return matchesCategory && matchesSearch && matchesFeatured;
  });

  const projectCategories = ['All', ...Array.from(new Set(projects.map(p => p.type)))];
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-terminal-green terminal-glow">$ ls -la /skills_projects</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-text-secondary max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Explore my technical skills and projects showcasing my journey in AI/ML, Data Science, and Web Development.
          </motion.p>
        </motion.div>

        {/* Achievements Overview */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-gold mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Achievements & Milestones
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="glass rounded-xl p-6 text-center hover-glow"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <achievement.icon className="w-8 h-8 text-terminal-gold mx-auto mb-3" />
                </motion.div>
                <h3 className="text-lg font-semibold text-terminal-gold mb-2">{achievement.title}</h3>
                <p className="text-text-muted text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Skills Section */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-blue mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Technical Skills
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillCategory, index) => (
              <motion.div 
                key={index} 
                className="glass rounded-xl p-8 hover-glow"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <skillCategory.icon className={`w-8 h-8 ${skillCategory.color} mr-3`} />
                  </motion.div>
                  <h3 className={`text-xl font-semibold ${skillCategory.color}`}>
                    {skillCategory.category}
                  </h3>
                </div>
                <div className="space-y-4">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-text-primary font-medium">{skill.name}</span>
                        <span className={`text-sm font-semibold ${skillCategory.color}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-bg-light rounded-full h-2">
                        <motion.div 
                          className={`h-2 rounded-full bg-gradient-to-r ${
                            skillCategory.color.includes('green') ? 'from-terminal-green to-terminal-green/70' :
                            skillCategory.color.includes('blue') ? 'from-terminal-blue to-terminal-blue/70' :
                            skillCategory.color.includes('purple') ? 'from-terminal-purple to-terminal-purple/70' :
                            'from-terminal-orange to-terminal-orange/70'
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: (index * 0.1) + (skillIndex * 0.05) + 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Projects Section with Filters */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-purple mb-8 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Featured Projects
          </motion.h2>

          {/* Project Filters */}
          <motion.div 
            className="mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Search and Featured Toggle */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-bg-light border border-terminal-green/30 rounded-lg focus:border-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green/20 text-text-primary w-64"
                />
              </div>
              <motion.button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  showFeaturedOnly 
                    ? 'bg-terminal-gold text-bg-dark' 
                    : 'border border-terminal-gold text-terminal-gold hover:bg-terminal-gold/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-4 h-4 inline mr-2" />
                Featured Only
              </motion.button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {projectCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-terminal-purple text-white'
                      : 'border border-terminal-purple text-terminal-purple hover:bg-terminal-purple/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.title} 
                className="glass rounded-xl overflow-hidden hover-glow group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                layout
              >
                {project.featured && (
                  <motion.div
                    className="absolute top-4 left-4 z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-terminal-gold fill-current" />
                  </motion.div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      project.status === 'Live' ? 'bg-terminal-green text-bg-dark' :
                      project.status === 'Completed' ? 'bg-terminal-blue text-bg-dark' :
                      'bg-terminal-orange text-bg-dark'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-terminal-purple/80 text-white text-xs font-bold rounded">
                      {project.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-terminal-green transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-2 py-1 bg-terminal-blue/20 text-terminal-blue rounded text-xs font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--terminal-blue-rgb), 0.3)' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-text-muted hover:text-terminal-green transition-colors duration-300"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </motion.a>
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-text-muted hover:text-terminal-blue transition-colors duration-300"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-text-muted">No projects found matching your criteria.</p>
            </motion.div>
          )}
        </motion.section>

        {/* Enhanced Learning Journey */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-orange mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Current Learning Path
          </motion.h2>
          <motion.div 
            className="glass rounded-xl p-8 text-center relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-terminal-orange/5 via-terminal-green/5 to-terminal-blue/5"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Brain className="w-12 h-12 text-terminal-green mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold text-terminal-green mb-2">Exploring</h3>
                <p className="text-text-secondary text-sm">Deep Learning, Neural Networks, Computer Vision</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Code2 className="w-12 h-12 text-terminal-blue mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold text-terminal-blue mb-2">Building</h3>
                <p className="text-text-secondary text-sm">AI/ML Projects, Data Analysis Tools, Web Applications</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Github className="w-12 h-12 text-terminal-purple mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold text-terminal-purple mb-2">Contributing</h3>
                <p className="text-text-secondary text-sm">Open Source Projects, Community Learning, Knowledge Sharing</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Enhanced Terminal Quote */}
        <motion.section 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="glass rounded-xl p-8 font-mono relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-terminal-green/5 via-terminal-blue/5 to-terminal-purple/5"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="text-terminal-green mb-4 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              nischal@skills:~$ echo &quot;philosophy&quot;
            </motion.div>
            <motion.blockquote 
              className="text-xl md:text-2xl text-text-primary font-semibold relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              &quot;Code is poetry written in logic, and every bug is a step closer to perfection.&quot;
            </motion.blockquote>
            <motion.div 
              className="text-terminal-blue mt-4 relative z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              - Nischal Neupane
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}
