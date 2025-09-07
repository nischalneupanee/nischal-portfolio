import Image from 'next/image';
import { Code2, Database, Brain, Globe, Github, ExternalLink } from 'lucide-react';

const skills = [
  {
    category: 'Programming Languages',
    icon: Code2,
    color: 'text-terminal-green',
    items: ['Python', 'C++', 'JavaScript', 'HTML', 'CSS']
  },
  {
    category: 'AI/ML & Data Science',
    icon: Brain,
    color: 'text-terminal-blue',
    items: ['PyTorch', 'TensorFlow', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn']
  },
  {
    category: 'Web Development',
    icon: Globe,
    color: 'text-terminal-purple',
    items: ['Django', 'Bootstrap', 'Next.js', 'TailwindCSS', 'React']
  },
  {
    category: 'Database & Tools',
    icon: Database,
    color: 'text-terminal-orange',
    items: ['MS SQL', 'Git', 'GitHub', 'VS Code', 'Linux']
  }
];

const projects = [
  {
    title: 'AI Project 1',
    description: 'A machine learning project focused on data analysis and prediction using advanced algorithms.',
    image: '/project1.jpeg',
    tech: ['Python', 'TensorFlow', 'Pandas'],
    github: 'https://github.com/nischalneupanee',
    demo: null,
    type: 'AI/ML'
  },
  {
    title: 'Data Science Project',
    description: 'Comprehensive data analysis and visualization project showcasing statistical insights.',
    image: '/project2.jpeg',
    tech: ['Python', 'Matplotlib', 'Seaborn', 'NumPy'],
    github: 'https://github.com/nischalneupanee',
    demo: null,
    type: 'Data Science'
  },
  {
    title: 'Web Application',
    description: 'Full-stack web application built with modern technologies and responsive design.',
    image: '/project3.jpeg',
    tech: ['JavaScript', 'Django', 'Bootstrap'],
    github: 'https://github.com/nischalneupanee',
    demo: null,
    type: 'Web Development'
  }
];

export default function SkillsProjects() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-terminal-green terminal-glow">$ ls -la /skills_projects</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Explore my technical skills and projects showcasing my journey in AI/ML, Data Science, and Web Development.
          </p>
        </div>

        {/* Skills Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-terminal-blue mb-12 text-center terminal-glow">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillCategory, index) => (
              <div key={index} className="glass rounded-lg p-6 hover-glow">
                <div className="flex items-center mb-4">
                  <skillCategory.icon className={`w-8 h-8 ${skillCategory.color} mr-3`} />
                  <h3 className={`text-xl font-semibold ${skillCategory.color}`}>
                    {skillCategory.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-bg-darker text-text-primary rounded-full text-sm border border-terminal-green/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-3xl font-bold text-terminal-purple mb-12 text-center terminal-glow">
            Featured Projects
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="glass rounded-lg overflow-hidden hover-glow group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-terminal-green text-bg-dark text-xs font-bold rounded">
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-terminal-blue/20 text-terminal-blue rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-text-muted hover:text-terminal-green transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-text-muted hover:text-terminal-blue transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Journey */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-terminal-orange mb-12 text-center terminal-glow">
            Current Learning Path
          </h2>
          <div className="glass rounded-lg p-8 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-terminal-green mb-2">Exploring</h3>
                <p className="text-text-secondary text-sm">Deep Learning, Neural Networks, Computer Vision</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-terminal-blue mb-2">Building</h3>
                <p className="text-text-secondary text-sm">AI/ML Projects, Data Analysis Tools, Web Applications</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-terminal-purple mb-2">Contributing</h3>
                <p className="text-text-secondary text-sm">Open Source Projects, Community Learning, Knowledge Sharing</p>
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Quote */}
        <section className="mt-20 text-center">
          <div className="glass rounded-lg p-8 font-mono">
            <div className="text-terminal-green mb-4">nischal@skills:~$ echo "philosophy"</div>
            <blockquote className="text-xl text-text-primary font-semibold">
              "Code is poetry written in logic, and every bug is a step closer to perfection."
            </blockquote>
          </div>
        </section>
      </div>
    </div>
  );
}
