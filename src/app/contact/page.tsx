'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Instagram, MessageCircle, Send, Clock, Globe, Heart, Star, Zap, Copy, CheckCircle } from 'lucide-react';

const contactMethods = [
  {
    name: 'Email',
    value: 'nischalneupanee@gmail.com',
    href: 'mailto:nischalneupanee@gmail.com',
    icon: Mail,
    color: 'text-terminal-green',
    description: 'Best way to reach me for professional inquiries'
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/nischalneupanee',
    href: 'https://www.linkedin.com/in/nischalneupanee/',
    icon: Linkedin,
    color: 'text-terminal-blue',
    description: 'Connect with me professionally'
  },
  {
    name: 'GitHub',
    value: 'github.com/nischalneupanee',
    href: 'https://github.com/nischalneupanee',
    icon: Github,
    color: 'text-terminal-purple',
    description: 'Check out my code and projects'
  },
  {
    name: 'Instagram',
    value: 'instagram.com/nischalneupanee',
    href: 'https://www.instagram.com/nischalneupanee',
    icon: Instagram,
    color: 'text-terminal-orange',
    description: 'Follow my personal journey'
  }
];

const collaborationAreas = [
  'AI/ML Projects',
  'Data Science Research',
  'Open Source Contributions',
  'Web Development',
  'Tech Community Events',
  'Study Groups & Learning'
];

const responseTime = {
  email: '24-48 hours',
  social: '1-2 days',
  urgent: 'Same day (if marked urgent)'
};

const quickFacts = [
  { icon: Clock, label: 'Response Time', value: '< 48 hours', color: 'text-terminal-green' },
  { icon: Globe, label: 'Timezone', value: 'NPT (UTC+5:45)', color: 'text-terminal-blue' },
  { icon: Heart, label: 'Collaboration', value: 'Always Open', color: 'text-terminal-purple' },
  { icon: Star, label: 'Availability', value: 'Remote Friendly', color: 'text-terminal-orange' }
];

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nischalneupanee@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:nischalneupanee@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl mx-auto"
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
            <span className="text-terminal-green terminal-glow">$ ping /contact</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Let&apos;s connect! I&apos;m always excited to discuss AI/ML, collaborate on projects, 
            or just chat about technology and learning.
          </motion.p>
        </motion.div>

        {/* Quick Facts */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickFacts.map((fact, index) => (
              <motion.div
                key={fact.label}
                className="glass rounded-xl p-4 text-center hover-glow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <fact.icon className={`w-6 h-6 mx-auto mb-2 ${fact.color}`} />
                <h3 className={`text-sm font-semibold ${fact.color} mb-1`}>{fact.label}</h3>
                <p className="text-xs text-text-muted">{fact.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Quick Contact */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="glass rounded-xl p-8 text-center mb-8 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-terminal-green/10 via-transparent to-terminal-green/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <h2 className="text-2xl font-bold text-terminal-blue mb-4 terminal-glow relative z-10">
              Quick Connect
            </h2>
            <p className="text-text-secondary mb-6 relative z-10">
              For immediate contact, email is the fastest way to reach me.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <motion.a
                href="mailto:nischalneupanee@gmail.com"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-terminal-green to-terminal-green/80 text-bg-dark font-semibold rounded-xl hover:from-terminal-green/90 hover:to-terminal-green/70 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-terminal-green/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
                <span>Send Email</span>
              </motion.a>
              <motion.button
                onClick={copyEmail}
                className="inline-flex items-center space-x-2 px-8 py-3 border-2 border-terminal-blue text-terminal-blue font-semibold rounded-xl hover:bg-terminal-blue/10 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copiedEmail ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        {/* Enhanced Contact Methods */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-purple mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Get In Touch
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : '_self'}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-xl p-6 hover-glow group transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: method.color.replace('text-', '') }}
                />
                <div className="flex items-start space-x-4 relative z-10">
                  <motion.div 
                    className={`p-3 rounded-full border-2 border-current ${method.color}`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <method.icon className="w-6 h-6" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${method.color} mb-1`}>
                      {method.name}
                    </h3>
                    <p className="text-text-primary text-sm mb-2 font-mono break-all">
                      {method.value}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {method.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-blue mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Send a Message
          </motion.h2>
          <motion.div 
            className="glass rounded-xl p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-text-primary mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-light border border-terminal-green/30 rounded-lg focus:border-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green/20 text-text-primary transition-all duration-300"
                    placeholder="Your name"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-light border border-terminal-green/30 rounded-lg focus:border-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green/20 text-text-primary transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label className="block text-sm font-medium text-text-primary mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-bg-light border border-terminal-green/30 rounded-lg focus:border-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green/20 text-text-primary transition-all duration-300"
                  placeholder="What's this about?"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <label className="block text-sm font-medium text-text-primary mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-bg-light border border-terminal-green/30 rounded-lg focus:border-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green/20 text-text-primary transition-all duration-300 resize-vertical"
                  placeholder="Tell me about your project, idea, or just say hello!"
                />
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-terminal-blue to-terminal-purple text-white font-semibold rounded-xl hover:from-terminal-blue/80 hover:to-terminal-purple/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-terminal-blue/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
                <p className="text-xs text-text-muted mt-2">
                  This will open your email client with the message pre-filled
                </p>
              </motion.div>
            </form>
          </motion.div>
        </motion.section>

        {/* Enhanced Location & Availability */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location */}
            <motion.div 
              className="glass rounded-xl p-6 hover-glow"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-6 h-6 text-terminal-green mr-3" />
                </motion.div>
                <h3 className="text-xl font-semibold text-terminal-green">Location & Time</h3>
              </div>
              <div className="space-y-3">
                <motion.p 
                  className="text-text-secondary flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-2xl">🇳🇵</span>
                  <span><strong className="text-text-primary">Based in:</strong> Kathmandu, Nepal</span>
                </motion.p>
                <motion.p 
                  className="text-text-secondary flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Clock className="w-4 h-4 text-terminal-blue" />
                  <span><strong className="text-text-primary">Timezone:</strong> NPT (UTC+5:45)</span>
                </motion.p>
                <motion.p 
                  className="text-text-secondary flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Globe className="w-4 h-4 text-terminal-green" />
                  <span><strong className="text-text-primary">Availability:</strong> Remote collaboration worldwide</span>
                </motion.p>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div 
              className="glass rounded-xl p-6 hover-glow"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle className="w-6 h-6 text-terminal-blue mr-3" />
                </motion.div>
                <h3 className="text-xl font-semibold text-terminal-blue">Response Time</h3>
              </div>
              <div className="space-y-3">
                <motion.p 
                  className="text-text-secondary flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span><strong className="text-text-primary">Email:</strong></span>
                  <span className="text-terminal-green font-semibold">{responseTime.email}</span>
                </motion.p>
                <motion.p 
                  className="text-text-secondary flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span><strong className="text-text-primary">Social Media:</strong></span>
                  <span className="text-terminal-blue font-semibold">{responseTime.social}</span>
                </motion.p>
                <motion.p 
                  className="text-text-secondary flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span><strong className="text-text-primary">Urgent:</strong></span>
                  <span className="text-terminal-orange font-semibold">{responseTime.urgent}</span>
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Collaboration Areas */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-orange mb-12 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Let&apos;s Collaborate On
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborationAreas.map((area, index) => (
              <motion.div 
                key={index} 
                className="glass rounded-xl p-6 text-center hover-glow group relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-terminal-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.p 
                  className="text-text-primary font-medium relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  {area}
                </motion.p>
                <motion.div
                  className="absolute inset-0 border-2 border-terminal-orange rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Current Status */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="glass rounded-xl p-8 text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-terminal-blue/5 via-terminal-green/5 to-terminal-purple/5"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.h2 
              className="text-2xl font-bold text-terminal-blue mb-8 terminal-glow relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              Current Status
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-semibold text-terminal-green mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">🎓</span> Studying
                </h3>
                <p className="text-text-secondary text-sm">BSc. CSIT at Vedas College (2023-2027)</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-semibold text-terminal-blue mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">🔬</span> Learning
                </h3>
                <p className="text-text-secondary text-sm">Deep Learning, Neural Networks, Advanced AI/ML</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-semibold text-terminal-purple mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">💼</span> Available
                </h3>
                <p className="text-text-secondary text-sm">Open for internships and entry-level positions</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Enhanced Contact Guidelines */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-terminal-green mb-8 text-center terminal-glow"
            whileHover={{ scale: 1.05 }}
          >
            Contact Guidelines
          </motion.h2>
          <motion.div 
            className="glass rounded-xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 via-transparent to-terminal-orange/5"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-terminal-green mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  ✅ Perfect for:
                </h3>
                <ul className="space-y-3 text-text-secondary text-sm">
                  {[
                    'Project collaboration opportunities',
                    'Technical discussions and learning',
                    'Internship and job opportunities',
                    'Open source contributions',
                    'Study groups and tech events',
                    'Mentorship and guidance'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-terminal-green/10 transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <Zap className="w-3 h-3 text-terminal-green flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-terminal-orange mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  ℹ️ Please note:
                </h3>
                <ul className="space-y-3 text-text-secondary text-sm">
                  {[
                    "I'm currently a student, so responses may take 1-2 days",
                    'For urgent matters, please mark your subject as [URGENT]',
                    'I love discussing AI/ML and always happy to help fellow learners',
                    'Open to remote collaboration across different timezones',
                    'Professional inquiries are welcome and encouraged'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-terminal-orange/10 transition-colors duration-300"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: -5 }}
                    >
                      <Heart className="w-3 h-3 text-terminal-orange flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Terminal Quote */}
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
              nischal@contact:~$ echo &quot;connection_philosophy&quot;
            </motion.div>
            <motion.blockquote 
              className="text-xl text-text-primary font-semibold relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              &quot;The best ideas emerge from collaboration. Let&apos;s build something amazing together!&quot;
            </motion.blockquote>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}
