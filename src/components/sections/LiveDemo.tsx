'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiAlertTriangle, FiX } from 'react-icons/fi';
import { sendURLAnalysisToBackend } from '@/lib/urlAnalysisIntegration';

interface AnalysisResult {
  status: string;
  risk: string;
  color: string;
  safeConfidence: number;
  phishingConfidence: number;
}

export default function LiveDemo() {
  const [demoUrl, setDemoUrl] = useState('');
  const [result, setResult] = useState<null | AnalysisResult>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exampleUrls = [
    { url: 'https://google.com', status: 'Safe', risk: 'No threats detected', color: 'green' },
    { url: 'https://paypa1-verify.com', status: 'Dangerous', risk: 'Phishing attempt detected', color: 'red' },
    { url: 'https://unusual-bank-login.co', status: 'Suspicious', risk: 'Potential phishing', color: 'yellow' },
  ];

  const handleAnalyze = async () => {
    if (!demoUrl.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await sendURLAnalysisToBackend(demoUrl);
      console.log('[LiveDemo] Full response:', response);

      // Read real confidence from backend (percentages 0-100)
      const safeConfidence: number =
        typeof response.safe_confidence === 'number'
          ? response.safe_confidence
          : response.is_safe ? 90 : 10;
      const phishingConfidence: number =
        typeof response.phishing_confidence === 'number'
          ? response.phishing_confidence
          : response.is_safe ? 10 : 90;

      let status = 'Safe';
      let risk = 'No threats detected';
      let color = 'green';

      if (!response.is_safe || response.risk_level?.toLowerCase() === 'high') {
        status = 'Dangerous';
        risk = response.recommendation || 'Phishing attempt detected';
        color = 'red';
      } else if (response.risk_level?.toLowerCase() === 'medium') {
        status = 'Suspicious';
        risk = response.recommendation || 'Potential phishing or malicious content';
        color = 'yellow';
      } else {
        status = 'Safe';
        risk = response.recommendation || 'No threats detected';
        color = 'green';
      }

      setResult({ status, risk, color, safeConfidence, phishingConfidence });
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze URL.');

      const isPhishing = demoUrl.includes('paypa1') || demoUrl.includes('verify');
      const isSuspicious = demoUrl.includes('unusual') || demoUrl.includes('login');
      const color = isPhishing ? 'red' : isSuspicious ? 'yellow' : 'green';
      setResult({
        status: isPhishing ? 'Dangerous' : isSuspicious ? 'Suspicious' : 'Safe',
        risk: isPhishing ? 'Phishing detected (offline)' : isSuspicious ? 'Suspicious (offline)' : 'No threats (offline)',
        color,
        safeConfidence: isPhishing ? 8 : isSuspicious ? 45 : 92,
        phishingConfidence: isPhishing ? 92 : isSuspicious ? 55 : 8,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const colorConfig = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      badge: 'bg-green-500',
      text: 'text-green-700',
      badgeText: 'bg-green-100 text-green-800',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      badge: 'bg-red-500',
      text: 'text-red-700',
      badgeText: 'bg-red-100 text-red-800',
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      badge: 'bg-yellow-500',
      text: 'text-yellow-700',
      badgeText: 'bg-yellow-100 text-yellow-800',
    },
  };

  const c = result ? colorConfig[result.color as keyof typeof colorConfig] : colorConfig.green;

  return (
    <section id="live-demo" className="min-h-screen flex flex-col justify-center py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Try It <span className="text-gradient">Yourself</span>
          </h2>
          <p className="text-xl text-gray-600">Paste any URL and see our AI detect threats instantly</p>
          <p className="mt-3 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 inline-block">
            ⚠️ <strong>Note:</strong> The backend may take a moment to wake up on first use — if the result seems off, please try again for accurate results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-blue-100"
        >
          {/* Input row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter any URL... (e.g., https://example.com)"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="flex-1 px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button
              onClick={handleAnalyze}
              disabled={!demoUrl.trim() || isAnalyzing}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              {isAnalyzing ? '🔍 Scanning...' : 'Scan Now'}
            </button>
          </div>

          {/* Connection error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-orange-50 border border-orange-300 flex items-start gap-2">
              <FiAlertTriangle className="text-orange-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-orange-700">{error} — showing offline estimate.</p>
            </div>
          )}

          {/* Result card */}
          {result && (
            <motion.div
              key={result.status + result.safeConfidence}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`rounded-xl border-2 p-5 ${c.bg} ${c.border}`}
            >
              {/* Status header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${c.badge}`}>
                  {result.color === 'green' && <FiCheck className="w-6 h-6 text-white" />}
                  {result.color === 'red' && <FiX className="w-6 h-6 text-white" />}
                  {result.color === 'yellow' && <FiAlertTriangle className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{result.status}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{result.risk}</p>
                </div>
              </div>

              {/* ── Confidence bars ── */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  🤖 ML Model Confidence
                </p>

                {/* Safe bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-green-700">✅ Safe</span>
                    <span className="text-sm font-bold text-green-700">{result.safeConfidence.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                      style={{
                        width: `${result.safeConfidence}%`,
                        transition: 'width 1s ease-out',
                      }}
                    />
                  </div>
                </div>

                {/* Phishing bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-red-700">🚨 Phishing / Malicious</span>
                    <span className="text-sm font-bold text-red-700">{result.phishingConfidence.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-red-400 to-rose-500"
                      style={{
                        width: `${result.phishingConfidence}%`,
                        transition: 'width 1s ease-out',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer badge */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${c.badgeText}`}>
                  Powered by Random Forest ML · {Math.max(result.safeConfidence, result.phishingConfidence).toFixed(1)}% confidence
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Example URL cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 font-semibold text-lg mb-6 text-center">Or try these examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exampleUrls.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setDemoUrl(example.url)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 shadow-md hover:shadow-xl transition-all text-left ${
                  example.color === 'green'
                    ? 'bg-white border-green-300 hover:border-green-500'
                    : example.color === 'red'
                    ? 'bg-white border-red-300 hover:border-red-500'
                    : 'bg-white border-yellow-300 hover:border-yellow-500'
                }`}
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                  example.color === 'green'
                    ? 'bg-green-100 text-green-700'
                    : example.color === 'red'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {example.status}
                </div>
                <p className="text-xs text-gray-600 mb-2 font-mono break-all">{example.url}</p>
                <p className="text-xs text-gray-500">{example.risk}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
