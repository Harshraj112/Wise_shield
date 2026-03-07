'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiDownload, FiShield, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Download the Extension',
    description:
      'Click the "Download Extension" button at the bottom of this page. A file called Wise_shield_Extension.zip will be saved to your Downloads folder.',
    image: '/step0_download.png',
    color: 'from-blue-500 to-blue-700',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    tip: '💡 Tip: Remember where you saved the zip file!',
  },
  {
    number: '02',
    title: 'Extract the ZIP File',
    description:
      'Find the downloaded ZIP file and extract it. On Mac: double-click the zip. On Windows: right-click → "Extract All". You should now have an "extension" folder.',
    image: '/step2_select_folder.png',
    color: 'from-purple-500 to-purple-700',
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    tip: '💡 Tip: Keep the extracted folder somewhere permanent — do NOT delete it after installing!',
  },
  {
    number: '03',
    title: 'Open Chrome Extensions & Enable Developer Mode',
    description:
      'Open Google Chrome. In the address bar, type chrome://extensions and press Enter. In the top-right corner, toggle ON "Developer mode".',
    image: '/step1_load_unpacked.png',
    color: 'from-teal-500 to-teal-700',
    border: 'border-teal-200',
    bg: 'bg-teal-50',
    tip: '💡 Tip: You must enable Developer Mode to load unpacked extensions.',
  },
  {
    number: '04',
    title: 'Load the Extension Folder',
    description:
      'Click "Load unpacked" (top-left). A file picker opens — navigate to the extracted folder and select the "extension" folder inside it. Click "Select Folder" / "Open".',
    image: '/step2_select_folder.png',
    color: 'from-green-500 to-green-700',
    border: 'border-green-200',
    bg: 'bg-green-50',
    tip: '💡 Tip: Make sure to select the "extension" folder, not the outer zip folder.',
  },
  {
    number: '05',
    title: 'Pin WiseShield to Your Toolbar',
    description:
      'Click the puzzle-piece 🧩 icon in your Chrome toolbar, find "WiseShield - Phishing Protection" in the list, and click the pin icon to keep it visible in your toolbar.',
    image: '/step3_pin_extension.png',
    color: 'from-orange-500 to-orange-700',
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    tip: '🎉 You\'re all set! WiseShield will now protect you in real-time.',
  },
];

export default function DownloadPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors"
          >
            <FiArrowLeft /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <FiShield className="w-4 h-4" />
              Manual Installation · Chrome & Chromium-based Browsers
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Install{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                WiseShield
              </span>{' '}
              Extension
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to install WiseShield and protect yourself from phishing attacks in real-time.
            </p>
          </motion.div>

          {/* Browser Support Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-6 mb-12"
          >
            {['Chrome', 'Brave', 'Edge', 'Opera'].map((browser) => (
              <span
                key={browser}
                className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
              >
                ✅ {browser}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <div className="space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl border-2 ${step.border} ${step.bg} overflow-hidden shadow-lg`}
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-0`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative aspect-[4/3]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Step number overlay */}
                  <div
                    className={`absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 p-8">
                  <div
                    className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white mb-4`}
                  >
                    Step {step.number}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                  <div className="p-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-500">
                    {step.tip}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: '🌐', label: 'Chrome 88+', sub: 'or any Chromium-based browser' },
            { icon: '💾', label: '~5MB Storage', sub: 'Lightweight extension' },
            { icon: '🔒', label: 'No Account Needed', sub: 'Works right after install' },
          ].map((req, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md text-center">
              <div className="text-4xl mb-3">{req.icon}</div>
              <p className="font-bold text-gray-900">{req.label}</p>
              <p className="text-sm text-gray-500 mt-1">{req.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Download Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 text-white shadow-2xl">
            <FiShield className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-2">Ready to Stay Safe?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto">
              Download WiseShield now and get real-time phishing protection on every website you visit.
            </p>

            <a
              href="/Wise_shield_Extension.zip"
              download="Wise_shield_Extension.zip"
              onClick={handleDownload}
              className={`inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl ${
                downloading
                  ? 'bg-green-400 text-white scale-95'
                  : 'bg-white text-blue-700 hover:bg-blue-50 hover:scale-105'
              }`}
            >
              {downloading ? (
                <>
                  <FiCheckCircle className="w-7 h-7 animate-bounce" />
                  Downloading...
                </>
              ) : (
                <>
                  <FiDownload className="w-7 h-7" />
                  Download WiseShield Extension
                </>
              )}
            </a>

            <p className="mt-4 text-blue-200 text-sm">
              Free · No account required · ~5MB ZIP file
            </p>
          </div>
        </motion.div>

        {/* After install note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-center"
        >
          <p className="text-amber-800 text-sm">
            ⚠️ <strong>Note:</strong> Since this is a manually loaded extension (not from the Chrome Web Store),
            Chrome may show a warning. This is normal — click <strong>"Keep"</strong> to proceed with the download.
          </p>
        </motion.div>
      </div>

      <div className="pb-16" />
    </div>
  );
}
