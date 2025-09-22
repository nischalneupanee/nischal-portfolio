import { NextRequest, NextResponse } from 'next/server';

interface SubscriptionRequest {
  email: string;
  source?: string;
  timestamp?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionRequest = await request.json();
    const { email, source = 'unknown', timestamp } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Log subscription (in production, this would integrate with a service)
    console.log('Newsletter subscription:', {
      email,
      source,
      timestamp: timestamp || new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    // Here you would integrate with your newsletter service:
    // - ConvertKit: https://developers.convertkit.com/
    // - Mailchimp: https://mailchimp.com/developer/
    // - EmailJS: https://www.emailjs.com/
    // - Or Hashnode's subscription API if available

    // For now, we'll simulate success
    // In production, replace this with actual service integration:
    /*
    const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: email,
        tags: [source],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter');
    }
    */

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      email: email
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to subscribe. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}