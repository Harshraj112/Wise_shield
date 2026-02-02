import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    console.log('[API] Analyzing URL:', url);

    // Get backend URL from environment variable
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

    if (!backendUrl) {
      console.error('[API] Backend URL not configured');
      return NextResponse.json(
        { error: 'Backend service not configured' },
        { status: 500 }
      );
    }

    // Send URL to FastAPI backend
    console.log('[API] Forwarding to backend:', `${backendUrl}/analyze-url`);
    
    const backendResponse = await fetch(`${backendUrl}/analyze-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('[API] Backend error:', errorText);
      throw new Error(`Backend responded with status: ${backendResponse.status}`);
    }

    const result = await backendResponse.json();
    console.log('[API] Backend response:', result);

    // Return the response from FastAPI backend
    // The backend already returns: url, is_safe, prediction, risk_level, features_extracted, recommendation
    return NextResponse.json({
      url: result.url,
      is_safe: result.is_safe,
      prediction: result.prediction,
      risk_level: result.risk_level,
      is_phishing: !result.is_safe, // Convert is_safe to is_phishing for frontend compatibility
      confidence: result.is_safe ? 0.95 : 0.85, // Approximate confidence
      features_used: result.features_extracted,
      recommendation: result.recommendation,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[API] Error in analyze-url route:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze URL',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
