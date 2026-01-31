'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiAlertTriangle, FiX } from 'react-icons/fi';
import { sendURLAnalysisToBackend } from '@/lib/urlAnalysisIntegration';

export default function LiveDemo() {
  const [demoUrl, setDemoUrl] = useState('');
  const [result, setResult] = useState<null | { status: string; risk: string; color: string }>(null);
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
      // Send URL to backend for analysis
      const response = await sendURLAnalysisToBackend(demoUrl);
      
      // Map backend response to UI format
      let status = 'Safe';
      let risk = 'No threats detected';
      let color = 'green';

      const riskLevel = response.risk_level?.toLowerCase();
      
      if (riskLevel === 'high' || response.is_phishing) {
        status = 'Dangerous';
        risk = 'Phishing attempt detected';
        color = 'red';
      } else if (riskLevel === 'medium') {
        status = 'Suspicious';
        risk = 'Potential phishing or malicious content';
        color = 'yellow';
      } else if (riskLevel === 'low') {
        status = 'Safe';
        risk = 'No threats detected';
        color = 'green';
      }

      setResult({ status, risk, color });
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze URL. Please check if the backend is running.');
      
      // Fallback to simple heuristic check if backend fails
      const isPhishing = demoUrl.includes('paypa1') || demoUrl.includes('verify') || demoUrl.length > 50;
      const isSuspicious = demoUrl.includes('unusual') || demoUrl.includes('click') || demoUrl.includes('verify-now');

      let status = 'Safe';
      let risk = 'No threats detected (offline mode)';
      let color = 'green';

      if (isPhishing) {
        status = 'Dangerous';
        risk = 'Phishing attempt detected (offline mode)';
        color = 'red';
      } else if (isSuspicious) {
        status = 'Suspicious';
        risk = 'Potential phishing (offline mode)';
        color = 'yellow';
      }

      setResult({ status, risk, color });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExampleClick = (url: string) => {
    setDemoUrl(url);
  };

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
          <p className="text-xl text-gray-600">
            Paste any URL and see our AI detect threats instantly
          </p>
        </motion.div>

        {/* Demo Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-blue-100"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-orange-50 border-2 border-orange-300"
            >
              <div className="flex items-start space-x-3">
                <FiAlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Connection Error</p>
                  <p className="text-sm text-orange-700">{error}</p>
                  <p className="text-xs text-orange-600 mt-2">Using fallback detection mode. For full ML-powered analysis, please configure your backend.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-xl border-2 ${
                result.color === 'green'
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400'
                  : result.color === 'red'
                  ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-400'
                  : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-400'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  result.color === 'green' ? 'bg-green-500' :
                  result.color === 'red' ? 'bg-red-500' : 'bg-yellow-500'
                }`}>
                  {result.color === 'green' && <FiCheck className="w-6 h-6 text-white" />}
                  {result.color === 'red' && <FiX className="w-6 h-6 text-white" />}
                  {result.color === 'yellow' && <FiAlertTriangle className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{result.status}</p>
                  <p className="text-lg text-gray-700">{result.risk}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Example URLs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 font-semibold text-lg mb-6 text-center">
            Or try these examples:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exampleUrls.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => handleExampleClick(example.url)}
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
