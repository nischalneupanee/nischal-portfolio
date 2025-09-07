'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, GraduationCap, Heart, Trophy, Target } from 'lucide-react';

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
              <h2 className="text-3xl font-bold text-terminal-blue mb-6 terminal-glow">
                About Me
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  Hello! I'm <span className="text-terminal-green font-semibold">Nischal Neupane</span>, 
                  a passionate CSIT student from the beautiful city of Kathmandu, Nepal. My journey in 
                  technology began with curiosity and has evolved into a deep passion for creating 
                  innovative solutions using artificial intelligence and machine learning.
                </p>
                <p>
                  Currently pursuing my Bachelor's degree in Computer Science and Information Technology 
                  at Vedas College, I'm constantly exploring the fascinating world of data science, 
                  machine learning algorithms, and their real-world applications.
                </p>
                <p>
                  When I'm not coding or studying, you'll find me contributing to open source projects, 
                  attending tech conferences, playing games, or listening to music. I believe in 
                  continuous learning and sharing knowledge with the community.
                </p>
              </div>
              
              {/* Personal Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-3 text-text-secondary">
                  <MapPin className="w-5 h-5 text-terminal-green" />
                  <span>Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <Calendar className="w-5 h-5 text-terminal-blue" />
                  <span>CSIT Student (2023-2027)</span>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <Target className="w-5 h-5 text-terminal-purple" />
                  <span>Aspiring AI/ML Engineer</span>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <Image
                  src="/about-photo.jpg"
                  alt="Nischal Neupane"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-2xl border-2 border-terminal-green/30"
                  priority
                />
                <div className="absolute inset-0 rounded-lg border-2 border-terminal-green animate-pulse-glow opacity-50"></div>
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

        {/* Events Attended */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-terminal-blue mb-12 text-center terminal-glow">
            Events & Conferences
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {eventsAttended.map((event, index) => (
              <motion.div
                key={index}
                className="glass rounded-lg p-6 hover-glow text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`inline-flex p-3 rounded-full border-2 border-current ${event.color} mb-4`}>
                  <event.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{event.name}</h3>
                <p className={`text-sm font-medium mb-3 ${event.color}`}>{event.type}</p>
                <p className="text-text-secondary text-sm">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interests */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-terminal-purple mb-12 text-center terminal-glow">
            Interests & Passions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="glass rounded-lg p-4 text-center hover-glow"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-2xl mb-2">{interest.icon}</div>
                <p className="text-text-primary font-medium text-sm">{interest.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Work Experience Placeholder */}
        <motion.section 
          className="mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-terminal-orange mb-12 text-center terminal-glow">
            Work Experience
          </h2>
          <div className="glass rounded-lg p-12 text-center">
            <Heart className="w-16 h-16 text-terminal-orange mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Ready for New Opportunities
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Currently focused on my studies and building strong foundations in AI/ML and Data Science. 
              I'm excited to contribute my skills and passion to meaningful projects and collaborate 
              with amazing teams in the future.
            </p>
            <div className="mt-6">
              <span className="inline-block px-4 py-2 bg-terminal-orange/20 text-terminal-orange rounded-full text-sm font-medium">
                Open to Internships & Entry-Level Positions
              </span>
            </div>
          </div>
        </motion.section>

        {/* Terminal Quote */}
        <motion.section 
          className="text-center"
          variants={itemVariants}
        >
          <div className="glass rounded-lg p-8 font-mono">
            <div className="text-terminal-green mb-4">nischal@about:~$ echo "life_motto"</div>
            <blockquote className="text-xl md:text-2xl text-text-primary font-semibold">
              "The future belongs to those who learn more skills and combine them in creative ways."
            </blockquote>
            <div className="text-terminal-blue mt-4">- Nischal Neupane</div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
