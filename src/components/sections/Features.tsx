'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiZap, FiAlertTriangle, FiLock, FiFeather, FiRefreshCw } from 'react-icons/fi';

export default function Features() {
  const features = [
    {
      icon: FiCpu,
      title: 'AI-Powered Detection',
      description: 'Machine learning trained on millions of URLs detects even zero-day phishing attacks',
    },
    {
      icon: FiZap,
      title: 'Real-Time Protection',
      description: 'Instant analysis with <100ms latency. No browsing slowdown',
    },
    {
      icon: FiAlertTriangle,
      title: 'Smart Warnings',
      description: 'Color-coded risk levels: Safe, Suspicious, Dangerous with detailed explanations',
    },
    {
      icon: FiLock,
      title: 'Privacy First',
      description: 'No browsing history stored. Your data stays private',
    },
    {
      icon: FiFeather,
      title: 'Lightweight & Fast',
      description: 'Minimal memory usage. Won\'t slow down your browser',
    },
    {
      icon: FiRefreshCw,
      title: 'Always Updated',
      description: 'Continuous learning from latest threat intelligence',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center section bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Protection.{' '}
            <span className="text-gradient">Effortless Experience.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Six powerful features working together to keep you safe.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card">
                <div>
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
