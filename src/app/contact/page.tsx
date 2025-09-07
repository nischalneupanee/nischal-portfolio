import { Mail, MapPin, Github, Linkedin, Instagram, MessageCircle, Send } from 'lucide-react';

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

export default function Contact() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-terminal-green terminal-glow">$ ping /contact</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Let&apos;s connect! I&apos;m always excited to discuss AI/ML, collaborate on projects, 
            or just chat about technology and learning.
          </p>
        </div>

        {/* Quick Contact */}
        <section className="mb-16">
          <div className="glass rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold text-terminal-blue mb-4 terminal-glow">
              Quick Connect
            </h2>
            <p className="text-text-secondary mb-6">
              For immediate contact, email is the fastest way to reach me.
            </p>
            <a
              href="mailto:nischalneupanee@gmail.com"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-terminal-green text-bg-dark font-semibold rounded-lg hover:bg-terminal-green/80 transition-colors shadow-lg hover:shadow-terminal-green/50"
            >
              <Send className="w-5 h-5" />
              <span>Send Email</span>
            </a>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-terminal-purple mb-12 text-center terminal-glow">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : '_self'}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-lg p-6 hover-glow group transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full border-2 border-current ${method.color} group-hover:scale-110 transition-transform`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${method.color} mb-1`}>
                      {method.name}
                    </h3>
                    <p className="text-text-primary text-sm mb-2 font-mono">
                      {method.value}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Location & Availability */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location */}
            <div className="glass rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-terminal-green mr-3" />
                <h3 className="text-xl font-semibold text-terminal-green">Location</h3>
              </div>
              <p className="text-text-secondary mb-2">
                <strong className="text-text-primary">Based in:</strong> Kathmandu, Nepal
              </p>
              <p className="text-text-secondary mb-2">
                <strong className="text-text-primary">Timezone:</strong> NPT (UTC+5:45)
              </p>
              <p className="text-text-secondary">
                <strong className="text-text-primary">Availability:</strong> Open to remote collaboration worldwide
              </p>
            </div>

            {/* Response Time */}
            <div className="glass rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-terminal-blue mr-3" />
                <h3 className="text-xl font-semibold text-terminal-blue">Response Time</h3>
              </div>
              <div className="space-y-2">
                <p className="text-text-secondary">
                  <strong className="text-text-primary">Email:</strong> {responseTime.email}
                </p>
                <p className="text-text-secondary">
                  <strong className="text-text-primary">Social Media:</strong> {responseTime.social}
                </p>
                <p className="text-text-secondary">
                  <strong className="text-text-primary">Urgent Matters:</strong> {responseTime.urgent}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-terminal-orange mb-12 text-center terminal-glow">
            Let&apos;s Collaborate On
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborationAreas.map((area, index) => (
              <div key={index} className="glass rounded-lg p-4 text-center hover-glow">
                <p className="text-text-primary font-medium">{area}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Status */}
        <section className="mb-16">
          <div className="glass rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-terminal-blue mb-4 terminal-glow">
              Current Status
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-terminal-green mb-2">🎓 Studying</h3>
                <p className="text-text-secondary text-sm">BSc. CSIT at Vedas College (2023-2027)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-terminal-blue mb-2">🔬 Learning</h3>
                <p className="text-text-secondary text-sm">Deep Learning, Neural Networks, Advanced AI/ML</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-terminal-purple mb-2">💼 Available</h3>
                <p className="text-text-secondary text-sm">Open for internships and entry-level positions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-terminal-green mb-8 text-center terminal-glow">
            Contact Guidelines
          </h2>
          <div className="glass rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-terminal-green mb-4">✅ Perfect for:</h3>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li>• Project collaboration opportunities</li>
                  <li>• Technical discussions and learning</li>
                  <li>• Internship and job opportunities</li>
                  <li>• Open source contributions</li>
                  <li>• Study groups and tech events</li>
                  <li>• Mentorship and guidance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-terminal-orange mb-4">ℹ️ Please note:</h3>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li>• I&apos;m currently a student, so responses may take 1-2 days</li>
                  <li>• For urgent matters, please mark your subject as [URGENT]</li>
                  <li>• I love discussing AI/ML and always happy to help fellow learners</li>
                  <li>• Open to remote collaboration across different timezones</li>
                  <li>• Professional inquiries are welcome and encouraged</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Quote */}
        <section className="text-center">
          <div className="glass rounded-lg p-8 font-mono">
            <div className="text-terminal-green mb-4">nischal@contact:~$ echo &quot;connection_philosophy&quot;</div>
            <blockquote className="text-xl text-text-primary font-semibold">
              &quot;The best ideas emerge from collaboration. Let&apos;s build something amazing together!&quot;
            </blockquote>
          </div>
        </section>
      </div>
    </div>
  );
}
