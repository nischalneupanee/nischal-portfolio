'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, GraduationCap, Heart, Trophy, Target, Code, Brain, Database, Github, Linkedin, Mail, Star, Award, BookOpen, Users, Coffee, Zap } from 'lucide-react';

const timelineEvents = [
  {
    year: '2020-2022',
    title: '+2 Science',
    institution: 'Kathmandu Model College',
    description: 'Completed higher secondary education with focus on Science stream, building foundation in mathematics and physics.',
    icon: GraduationCap,
    color: 'text-terminal-blue'
  },
  {
    year: '2023-2027',
    title: 'BSc. CSIT',
    institution: 'Vedas College',
    description: 'Currently pursuing Bachelor\'s degree in Computer Science and Information Technology, specializing in AI/ML and Data Science.',
    icon: GraduationCap,
    color: 'text-terminal-green'
  }
];

const eventsAttended = [
  {
    name: 'Google DevFest 2024',
    type: 'Technology Conference',
    description: 'Attended Google\'s annual developer festival, learning about latest technologies and networking with fellow developers.',
    icon: Trophy,
    color: 'text-terminal-orange'
  },
  {
    name: 'UbuCon Asia 2025',
    type: 'Open Source Conference',
    description: 'Participated in Ubuntu community conference, exploring open source technologies and contributing to community discussions.',
    icon: Trophy,
    color: 'text-terminal-purple'
  },
  {
    name: 'MBMC IDEAX 2025',
    type: 'Hackathon',
    description: 'Competed in innovative hackathon, collaborating with teams to develop creative technology solutions.',
    icon: Trophy,
    color: 'text-terminal-blue'
  }
];

const interests = [
  { name: 'Artificial Intelligence', icon: '🤖' },
  { name: 'Machine Learning', icon: '🧠' },
  { name: 'Data Science', icon: '📊' },
  { name: 'Open Source', icon: '🌍' },
  { name: 'Gaming', icon: '🎮' },
  { name: 'Music', icon: '🎵' }
];

const skills = [
  { category: 'Programming', items: ['Python', 'C++', 'JavaScript', 'SQL'], icon: Code, color: 'text-terminal-green' },
  { category: 'AI/ML', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas'], icon: Brain, color: 'text-terminal-blue' },
  { category: 'Web Development', items: ['React', 'Next.js', 'Django', 'TailwindCSS'], icon: Database, color: 'text-terminal-purple' },
  { category: 'Tools & Others', items: ['Git', 'Docker', 'Linux', 'Jupyter'], icon: Trophy, color: 'text-terminal-orange' }
];

const achievements = [
  { title: 'Academic Excellence', description: 'Consistent high performance in CSIT coursework', icon: Award, color: 'text-terminal-green' },
  { title: 'Open Source Contributor', description: 'Active contributor to various GitHub projects', icon: Github, color: 'text-terminal-blue' },
  { title: 'Tech Community Member', description: 'Regular participant in tech events and hackathons', icon: Users, color: 'text-terminal-purple' },
  { title: 'Continuous Learner', description: 'Always exploring new technologies and frameworks', icon: BookOpen, color: 'text-terminal-orange' }
];

const funFacts = [
  { fact: '☕ Coffee is my coding fuel', icon: Coffee },
  { fact: '🌙 Night owl developer', icon: Star },
  { fact: '🎯 Goal: Make AI accessible to everyone', icon: Target },
  { fact: '⚡ Fast learner, faster debugger', icon: Zap }
];

export default function About() {
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

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-terminal-green terminal-glow">$ cd /about</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Get to know the person behind the code - my journey, experiences, and what drives my passion for technology.
          </p>
        </motion.div>

        {/* Personal Introduction */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-3xl font-bold text-terminal-blue mb-6 terminal-glow"
                whileHover={{ scale: 1.05 }}
              >
                About Me
              </motion.h2>
              <div className="space-y-4 text-text-secondary">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Hello! I&apos;m <span className="text-terminal-green font-semibold">Nischal Neupane</span>, 
                  a passionate CSIT student from the beautiful city of Kathmandu, Nepal. My journey in 
                  technology began with curiosity and has evolved into a deep passion for creating 
                  innovative solutions using artificial intelligence and machine learning.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Currently pursuing my Bachelor&apos;s degree in Computer Science and Information Technology 
                  at Vedas College, I&apos;m constantly exploring the fascinating world of data science, 
                  machine learning algorithms, and their real-world applications.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  When I&apos;m not coding or studying, you&apos;ll find me contributing to open source projects, 
                  attending tech conferences, playing games, or listening to music. I believe in 
                  continuous learning and sharing knowledge with the community.
                </motion.p>
              </div>
              
              {/* Enhanced Personal Info */}
              <motion.div 
                className="mt-8 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.div 
                  className="flex items-center space-x-3 text-text-secondary p-3 glass rounded-lg hover:border-terminal-green/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <MapPin className="w-5 h-5 text-terminal-green" />
                  <span>Kathmandu, Nepal 🇳🇵</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-text-secondary p-3 glass rounded-lg hover:border-terminal-blue/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Calendar className="w-5 h-5 text-terminal-blue" />
                  <span>CSIT Student (2023-2027)</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-text-secondary p-3 glass rounded-lg hover:border-terminal-purple/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Target className="w-5 h-5 text-terminal-purple" />
                  <span>Aspiring AI/ML Engineer</span>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="mt-8 flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <motion.a
                  href="https://github.com/nischalneupanee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:border-terminal-green/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5 text-terminal-green" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/nischalneupane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:border-terminal-blue/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 text-terminal-blue" />
                </motion.a>
                <Link
                  href="/contact"
                  className="p-3 glass rounded-lg hover:border-terminal-purple/40 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5 text-terminal-purple" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-terminal-green via-terminal-blue to-terminal-purple opacity-20 blur-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <Image
                  src="/about-photo.jpg"
                  alt="Nischal Neupane"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-2xl border-2 border-terminal-green/30 relative z-10"
                  priority
                />
                <div className="absolute inset-0 rounded-lg border-2 border-terminal-green animate-pulse-glow opacity-50"></div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-terminal-green rounded-full p-2"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-4 h-4 text-bg-dark" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-terminal-blue rounded-full p-2"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <Code className="w-4 h-4 text-bg-dark" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Education Timeline */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-terminal-green mb-12 text-center terminal-glow">
            Education Journey
          </h2>
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className="glass rounded-lg p-6 hover-glow"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full border-2 border-current ${event.color}`}>
                    <event.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-text-primary">{event.title}</h3>
                      <span className="text-text-muted text-sm">{event.year}</span>
                    </div>
                    <p className={`font-medium mb-2 ${event.color}`}>{event.institution}</p>
                    <p className="text-text-secondary">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-purple mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Technical Skills
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.category}
                className="glass rounded-xl p-6 hover-glow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-center mb-4">
                  <div className={`inline-flex p-3 rounded-full border-2 border-current ${skillCategory.color} mb-3`}>
                    <skillCategory.icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-lg font-semibold ${skillCategory.color}`}>
                    {skillCategory.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="text-sm text-text-secondary bg-bg-light/50 rounded-lg px-3 py-2 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--terminal-green-rgb), 0.1)' }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-orange mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Achievements & Recognition
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="glass rounded-xl p-6 hover-glow"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full border-2 border-current ${achievement.color}`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${achievement.color}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-text-secondary">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Fun Facts */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-blue mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Fun Facts About Me
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {funFacts.map((item, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-6 text-center hover-glow"
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <item.icon className="w-8 h-8 text-terminal-green mx-auto mb-3" />
                <p className="text-text-primary font-medium">{item.fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Events Attended */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-green mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Events & Conferences
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {eventsAttended.map((event, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-6 hover-glow text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-terminal-green/5 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <div className={`inline-flex p-3 rounded-full border-2 border-current ${event.color} mb-4 relative z-10`}>
                  <event.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2 relative z-10">{event.name}</h3>
                <p className={`text-sm font-medium mb-3 ${event.color} relative z-10`}>{event.type}</p>
                <p className="text-text-secondary text-sm relative z-10">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interests */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-purple mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Interests & Passions
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-6 text-center hover-glow relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotateY: 10 }}
              >
                <motion.div 
                  className="text-3xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {interest.icon}
                </motion.div>
                <p className="text-text-primary font-medium text-sm group-hover:text-terminal-green transition-colors duration-300">
                  {interest.name}
                </p>
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-terminal-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Work Experience Enhanced */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-orange mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Work Experience
          </motion.h2>
          <motion.div 
            className="glass rounded-xl p-12 text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-terminal-orange/10 via-transparent to-terminal-orange/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="w-16 h-16 text-terminal-orange mx-auto mb-6" />
            </motion.div>
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Ready for New Opportunities
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto mb-8">
              Currently focused on my studies and building strong foundations in AI/ML and Data Science. 
              I&apos;m excited to contribute my skills and passion to meaningful projects and collaborate 
              with amazing teams in the future.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.span 
                className="inline-block px-4 py-2 bg-terminal-orange/20 text-terminal-orange rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--terminal-orange-rgb), 0.3)' }}
              >
                Open to Internships
              </motion.span>
              <motion.span 
                className="inline-block px-4 py-2 bg-terminal-green/20 text-terminal-green rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--terminal-green-rgb), 0.3)' }}
              >
                Entry-Level Positions
              </motion.span>
              <motion.span 
                className="inline-block px-4 py-2 bg-terminal-blue/20 text-terminal-blue rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--terminal-blue-rgb), 0.3)' }}
              >
                Remote Opportunities
              </motion.span>
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
              nischal@about:~$ echo &quot;life_motto&quot;
            </motion.div>
            <motion.blockquote 
              className="text-xl md:text-2xl text-text-primary font-semibold mb-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              &quot;The future belongs to those who learn more skills and combine them in creative ways.&quot;
            </motion.blockquote>
            <motion.div 
              className="text-terminal-blue relative z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              - Nischal Neupane
            </motion.div>
            
            {/* Call to Action */}
            <motion.div 
              className="mt-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-terminal-green to-terminal-blue text-bg-dark font-semibold rounded-lg hover:from-terminal-green/80 hover:to-terminal-blue/80 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Let&apos;s Connect!
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}
