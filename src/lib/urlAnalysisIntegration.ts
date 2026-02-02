/**
 * URL Analysis Integration - Send URL to FastAPI backend
 * The backend handles all feature extraction and prediction
 */

/**
 * Send URL to backend for complete analysis
 * @param url - The URL to analyze
 * @returns Response from backend with risk assessment
 */
export async function sendURLAnalysisToBackend(url: string) {
  try {
    console.log('[Integration] Sending URL for analysis:', url);

    // Send to API route which forwards to FastAPI backend
    const response = await fetch('/api/analyze-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('[Integration] Analysis result:', result);

    return result;
  } catch (error) {
    console.error('[Integration] Error sending URL analysis:', error);
    throw error;
  }
}

/**
 * Response interface from the analysis API
 */
export interface AnalysisResult {
  url: string;
  is_safe: boolean;
  prediction: string;
  risk_level: string;
  is_phishing: boolean;
  confidence: number;
  features_used?: any;
  recommendation: string;
  timestamp: string;
  error?: string;
  message?: string;
}

/**
 * Batch analyze multiple URLs
 * @param urls - Array of URLs to analyze
 * @returns Array of analysis results
 */
export async function batchAnalyzeURLs(urls: string[]): Promise<AnalysisResult[]> {
  try {
    const promises = urls.map(url => sendURLAnalysisToBackend(url));
    const results = await Promise.allSettled(promises);

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          url: urls[index],
          is_safe: false,
          prediction: 'Error',
          risk_level: 'Unknown',
          is_phishing: false,
          confidence: 0,
          recommendation: 'Analysis failed',
          timestamp: new Date().toISOString(),
          error: 'Analysis failed',
          message: result.reason?.message || 'Unknown error'
        };
      }
    });
  } catch (error) {
    console.error('[Integration] Batch analysis error:', error);
    throw error;
  }
}

/**
 * Get risk level color for UI display
 */
export function getRiskLevelColor(riskLevel: string): string {
  switch (riskLevel?.toLowerCase()) {
    case 'low':
    case 'safe':
      return 'green';
    case 'medium':
    case 'moderate':
      return 'yellow';
    case 'high':
    case 'critical':
    case 'dangerous':
      return 'red';
    default:
      return 'gray';
  }
}

/**
 * Get risk level emoji for UI display
 */
export function getRiskLevelEmoji(riskLevel: string): string {
  switch (riskLevel?.toLowerCase()) {
    case 'low':
    case 'safe':
      return '✅';
    case 'medium':
    case 'moderate':
      return '⚠️';
    case 'high':
    case 'critical':
    case 'dangerous':
      return '🚨';
    default:
      return '❓';
  }
}

/**
 * Format confidence score as percentage
 */
export function formatConfidence(confidence: number): string {
  return `${(confidence * 100).toFixed(1)}%`;
}

/**
 * Example usage in a React component:
 * 
 * ```typescript
 * import { sendURLAnalysisToBackend } from '@/lib/urlAnalysisIntegration';
 * 
 * async function handleURLCheck(url: string) {
 *   try {
 *     setLoading(true);
 *     const result = await sendURLAnalysisToBackend(url);
 *     
 *     console.log('Is Safe:', result.is_safe);
 *     console.log('Risk Level:', result.risk_level);
 *     console.log('Prediction:', result.prediction);
 *     console.log('Recommendation:', result.recommendation);
 *     
 *     // Display results to user
 *     if (!result.is_safe) {
 *       alert('⚠️ Warning: ' + result.recommendation);
 *     } else {
 *       alert('✅ ' + result.recommendation);
 *     }
 *   } catch (error) {
 *     console.error('Failed to check URL:', error);
 *     alert('Error analyzing URL. Please try again.');
 *   } finally {
 *     setLoading(false);
 *   }
 * }
 * ```
 */
