import { NextResponse } from 'next/server';

// Simple in-memory rate limiter
// Note: In a serverless environment like Vercel, this state is localized to each function instance.
// For a high-traffic production app, you'd use Redis (e.g., @upstash/ratelimit).
// For a personal portfolio, this is usually sufficient to block basic rapid-fire spam from a single user.
interface RateLimitInfo {
    count: number;
    resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitInfo>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
    const now = Date.now();
    for (const [ip, info] of rateLimitMap.entries()) {
        if (now > info.resetTime) {
            rateLimitMap.delete(ip);
        }
    }
}, 5 * 60 * 1000);

export async function POST(request: Request) {
    try {
        // Get IP address for rate limiting
        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
        const now = Date.now();

        // Check rate limit
        const limitInfo = rateLimitMap.get(ip);
        if (limitInfo) {
            if (now < limitInfo.resetTime) {
                if (limitInfo.count >= MAX_REQUESTS) {
                    return NextResponse.json(
                        { error: 'Too many requests. Please try again later.' },
                        { status: 429 }
                    );
                }
                limitInfo.count++;
            } else {
                // Window expired, reset
                rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
            }
        } else {
            // First request from this IP
            rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
        }

        // Parse form data from request
        const formData = await request.formData();

        // Forward to Formspree
        const formspreeResponse = await fetch("https://formspree.io/f/mbdaeodd", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        if (!formspreeResponse.ok) {
            throw new Error(`Formspree error: ${formspreeResponse.statusText}`);
        }

        const data = await formspreeResponse.json();

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: 'Failed to send message.' },
            { status: 500 }
        );
    }
}
