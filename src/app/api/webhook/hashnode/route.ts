import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import crypto from 'crypto';

// Hashnode webhook event types
interface HashnodeWebhookEvent {
  eventType: 'POST_PUBLISHED' | 'POST_UPDATED' | 'POST_DELETED' | 'STATIC_PAGE_PUBLISHED' | 'STATIC_PAGE_UPDATED' | 'STATIC_PAGE_DELETED';
  data: {
    post?: {
      id: string;
      slug: string;
      title: string;
      url: string;
      publishedAt?: string;
      updatedAt?: string;
      tags?: Array<{ slug: string; name: string }>;
    };
    staticPage?: {
      id: string;
      slug: string;
      title: string;
    };
  };
}

// Verify webhook signature for security
function verifySignature(payload: string, signature: string): boolean {
  // In development or if no secret is configured, allow the webhook
  if (!process.env.HASHNODE_WEBHOOK_SECRET) {
    console.warn('HASHNODE_WEBHOOK_SECRET not configured, skipping signature verification');
    return true;
  }

  // If running in development mode, allow bypass
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: allowing webhook without signature verification');
    return true;
  }

  if (!signature) {
    console.error('No signature provided in webhook');
    return false;
  }

  try {
    // Remove 'sha256=' prefix if present
    const cleanSignature = signature.replace(/^sha256=/, '');
    
    // Validate hex format
    if (!/^[a-f0-9]+$/i.test(cleanSignature)) {
      console.error('Invalid signature format, not hex:', cleanSignature);
      return false;
    }
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.HASHNODE_WEBHOOK_SECRET)
      .update(payload, 'utf8')
      .digest('hex');
    
    // Ensure both signatures are the same length before comparison
    if (cleanSignature.length !== expectedSignature.length) {
      console.error('Signature length mismatch:', {
        received: cleanSignature.length,
        expected: expectedSignature.length,
        receivedSig: cleanSignature.substring(0, 20) + '...',
        expectedSig: expectedSignature.substring(0, 20) + '...'
      });
      return false;
    }
    
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(cleanSignature, 'hex')
    );
    
    console.log('Signature verification result:', isValid);
    return isValid;
    
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    // In production, fail securely
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const signature = headersList.get('x-hashnode-signature') || '';
    const payload = await request.text();

    // Log webhook details for debugging
    console.log('Webhook received:', {
      hasSignature: !!signature,
      signatureLength: signature.length,
      payloadLength: payload.length,
      hasSecret: !!process.env.HASHNODE_WEBHOOK_SECRET,
      timestamp: new Date().toISOString()
    });

    // Verify webhook signature
    if (!verifySignature(payload, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the event
    let event: HashnodeWebhookEvent;
    try {
      event = JSON.parse(payload);
    } catch (parseError) {
      console.error('Error parsing webhook payload:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    console.log('Received Hashnode webhook:', event.eventType, event.data);

    // Handle different event types
    switch (event.eventType) {
      case 'POST_PUBLISHED':
      case 'POST_UPDATED':
        await handlePostUpdate(event.data.post);
        break;
      
      case 'POST_DELETED':
        await handlePostDeletion(event.data.post);
        break;
      
      case 'STATIC_PAGE_PUBLISHED':
      case 'STATIC_PAGE_UPDATED':
      case 'STATIC_PAGE_DELETED':
        await handleStaticPageUpdate();
        break;
      
      default:
        console.log('Unhandled webhook event type:', event.eventType);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `Processed ${event.eventType} event`,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handlePostUpdate(post: any) {
  if (!post?.slug) return;

  try {
    console.log(`Revalidating post: ${post.slug}`);
    
    // Revalidate specific post page
    revalidatePath(`/blog/${post.slug}`);
    
    // Revalidate blog listing pages
    revalidatePath('/blog');
    revalidatePath('/'); // Home page if it shows recent posts
    
    // Revalidate tagged cache entries
    revalidateTag('blog-posts');
    revalidateTag('latest-posts');
    revalidateTag(`post-${post.slug}`);
    
    // Revalidate tag-specific pages if post has tags
    if (post.tags && Array.isArray(post.tags)) {
      for (const tag of post.tags) {
        revalidateTag(`tag-${tag.slug}`);
        revalidatePath(`/blog/tag/${tag.slug}`);
      }
    }
    
    // Revalidate RSS and sitemap
    revalidatePath('/rss.xml');
    revalidatePath('/sitemap.xml');
    
    console.log(`Successfully revalidated post: ${post.slug}`);
  } catch (error) {
    console.error(`Error revalidating post ${post.slug}:`, error);
  }
}

async function handlePostDeletion(post: any) {
  if (!post?.slug) return;

  try {
    console.log(`Handling deletion of post: ${post.slug}`);
    
    // Revalidate blog listing pages
    revalidatePath('/blog');
    revalidatePath('/');
    
    // Revalidate cache tags
    revalidateTag('blog-posts');
    revalidateTag('latest-posts');
    revalidateTag(`post-${post.slug}`);
    
    // Revalidate RSS and sitemap
    revalidatePath('/rss.xml');
    revalidatePath('/sitemap.xml');
    
    console.log(`Successfully handled deletion of post: ${post.slug}`);
  } catch (error) {
    console.error(`Error handling deletion of post ${post.slug}:`, error);
  }
}

async function handleStaticPageUpdate() {
  try {
    console.log('Revalidating static pages');
    
    // Revalidate sitemap for static pages
    revalidatePath('/sitemap.xml');
    revalidateTag('static-pages');
    
    console.log('Successfully revalidated static pages');
  } catch (error) {
    console.error('Error revalidating static pages:', error);
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'hashnode-webhook',
    environment: process.env.NODE_ENV || 'unknown',
    hasSecret: !!process.env.HASHNODE_WEBHOOK_SECRET
  });
}
