import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url, features, timestamp } = await request.json();

    console.log('[API] Received URL analysis request:', { url, timestamp });

    // Get backend URL from environment variable
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

    if (!backendUrl) {
      console.error('[API] Backend URL not configured');
      return NextResponse.json(
        { error: 'Backend service not configured' },
        { status: 500 }
      );
    }

    // Send features to the ML backend service
    console.log('[API] Forwarding to backend:', backendUrl);
    
    const backendResponse = await fetch(`${backendUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.BACKEND_API_KEY && {
          'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`
        })
      },
      body: JSON.stringify(features),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend responded with status: ${backendResponse.status}`);
    }

    const prediction = await backendResponse.json();
    console.log('[API] Backend prediction:', prediction);

    // Return formatted response
    return NextResponse.json({
      url: url,
      risk_level: prediction.risk_level || prediction.riskLevel || 'unknown',
      confidence: prediction.confidence || 0,
      is_phishing: prediction.is_phishing || prediction.isPhishing || false,
      features_used: features,
      timestamp: timestamp,
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
