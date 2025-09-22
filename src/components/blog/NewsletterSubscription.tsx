'use client';

import { useState } from 'react';
import { Mail, Send, Check, AlertCircle, Sparkles } from 'lucide-react';

interface NewsletterSubscriptionProps {
  title?: string;
  description?: string;
  placeholder?: string;
  className?: string;
}

export default function NewsletterSubscription({
  title = "Stay Updated",
  description = "Subscribe to get the latest posts and tutorials directly in your inbox",
  placeholder = "Enter your email address",
  className = ""
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // For now, we'll use a simple API endpoint
      // This can be later connected to ConvertKit, Mailchimp, or Hashnode's subscription API
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'blog',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('🎉 Thanks for subscribing! Check your email for confirmation.');
        setEmail('');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <div className={`glass rounded-xl p-6 border border-terminal-green/20 ${className}`}>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="relative">
            <Mail className="w-8 h-8 text-terminal-green" />
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-text-secondary text-sm">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading'}
            className={`
              w-full px-4 py-3 bg-background/50 border rounded-lg text-text-primary
              placeholder-text-muted focus:outline-none focus:ring-2 transition-colors
              ${status === 'error' 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-terminal-green/30 focus:ring-terminal-green/50'
              }
              ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            required
          />
          
          {status === 'loading' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-terminal-green border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={`
            w-full px-6 py-3 rounded-lg font-medium transition-all duration-200
            flex items-center justify-center gap-2
            ${status === 'success'
              ? 'bg-green-600 text-white'
              : status === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-terminal-green text-white hover:bg-terminal-green/90'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            transform hover:scale-[1.02] active:scale-[0.98]
          `}
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Subscribing...
            </>
          ) : status === 'success' ? (
            <>
              <Check className="w-4 h-4" />
              Subscribed!
            </>
          ) : status === 'error' ? (
            <>
              <AlertCircle className="w-4 h-4" />
              Try Again
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Subscribe
            </>
          )}
        </button>

        {message && (
          <div className={`
            p-3 rounded-lg text-sm text-center
            ${status === 'success' 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }
          `}>
            {message}
          </div>
        )}
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-text-muted">
          📧 No spam, unsubscribe at any time
        </p>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-text-muted">
          <span>✨ Latest tutorials</span>
          <span>🔥 Tech insights</span>
          <span>💡 Tips & tricks</span>
        </div>
      </div>
    </div>
  );
}