import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Shield, BarChart3, FileText, Users, ArrowRight, CheckCircle, Sparkles, Brain, Target, TrendingUp, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Layout/Navbar';
import { BackgroundEffects } from '../components/UI/BackgroundEffects';
import { GlassCard } from '../components/UI/GlassCard';
import { AnimatedButton } from '../components/UI/AnimatedButton';

export const Landing: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced Gemini 2.0 Flash AI analyzes your code for patterns, smells, and technical debt with unprecedented accuracy.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Reports',
      description: 'Get detailed PDF reports with debt scores, file-by-file analysis, and prioritized recommendations.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your code is processed securely with enterprise-grade encryption. No data is stored permanently.',
      color: 'from-green-500 to-emerald-500',
      delay: 0.3
    },
    {
      icon: Target,
      title: 'Actionable Insights',
      description: 'Receive specific, actionable recommendations to improve code quality and reduce maintenance costs.',
      color: 'from-orange-500 to-red-500',
      delay: 0.4
    },
    {
      icon: Code2,
      title: 'Multi-Language Support',
      description: 'Supports JavaScript, TypeScript, Python, Java, C++, and many other popular programming languages.',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.5
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share reports with your team, track improvements over time, and maintain code quality standards.',
      color: 'from-teal-500 to-blue-500',
      delay: 0.6
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload Your Code',
      description: 'Drag and drop your project files or select them from your computer. We support all major programming languages.',
      icon: Code2,
      color: 'from-blue-600 to-purple-600'
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your codebase for technical debt, code smells, security issues, and performance problems.',
      icon: Zap,
      color: 'from-purple-600 to-pink-600'
    },
    {
      step: '03',
      title: 'Get Your Report',
      description: 'Receive a comprehensive PDF report with debt scores, detailed findings, and actionable recommendations.',
      icon: FileText,
      color: 'from-pink-600 to-red-600'
    }
  ];

  const stats = [
    { label: 'Code Files Analyzed', value: '500+', icon: FileText },
    { label: 'Issues Detected', value: '200+', icon: Target },
    { label: 'Happy Developers', value: '50+', icon: Users },
    { label: 'Languages Supported', value: '15+', icon: Code2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-500 relative">
      <BackgroundEffects />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Hero Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-800/20 rounded-full mb-6 sm:mb-8"
            >
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Powered by Walmart Innovation
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tech Debt Analysis
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
            >
              Identify technical debt, code smells, and architectural issues in your codebase. 
              Get actionable insights powered by advanced AI analysis and comprehensive reports.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 px-4"
            >
              <Link to="/dashboard" className="w-full sm:w-auto">
                <AnimatedButton size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                  Start Free Analysis
                </AnimatedButton>
              </Link>
              
              <AnimatedButton variant="secondary" size="lg" icon={Play} className="w-full sm:w-auto">
                Watch Demo
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Comprehensive Code Analysis
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Our AI-powered platform analyzes your codebase thoroughly to identify technical debt, 
              performance issues, and architectural problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.6 }}
              >
                <GlassCard className="p-6 sm:p-8 h-full">
                  <div className={`bg-gradient-to-r ${feature.color} p-3 sm:p-4 rounded-2xl inline-block mb-4 sm:mb-6`}>
                    <feature.icon className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Get professional code analysis in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center relative"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 transform -translate-x-1/2 z-0" />
                )}
                
                <GlassCard className="p-6 sm:p-8 relative z-10">
                  <div className="relative mb-4 sm:mb-6">
                    <div className={`bg-gradient-to-r ${step.color} text-white text-lg sm:text-xl font-bold w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      {step.step}
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 p-2 sm:p-3 rounded-xl inline-block">
                      <step.icon className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Ready to Improve Your Code Quality?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Join thousands of developers who trust our platform to identify and fix technical debt. 
              Start your free analysis today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 px-4">
              <Link to="/dashboard" className="w-full sm:w-auto">
                <AnimatedButton size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                  Start Free Analysis
                </AnimatedButton>
              </Link>
              
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm sm:text-base">Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm sm:text-base">Secure & private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm sm:text-base">No credit card</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 sm:py-16 border-t border-gray-200/20 dark:border-gray-700/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8"
          >
            {/* Developer Credits */}
            <div className="text-center lg:text-left">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Developed for{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">Sparkathon by Walmart</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm">
                <span className="text-gray-500 dark:text-gray-500">by</span>
                <div className="flex items-center gap-4">
                  <motion.a
                    href="https://www.linkedin.com/in/yaswanthd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 backdrop-blur-sm border border-blue-200/20 dark:border-blue-800/20 rounded-lg transition-all duration-300 group"
                  >
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      D. Yaswanth
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </motion.a>
                  
                  <span className="text-gray-400 dark:text-gray-600">&</span>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/sai-seshu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 backdrop-blur-sm border border-blue-200/20 dark:border-blue-800/20 rounded-lg transition-all duration-300 group"
                  >
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      S. Seshu
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Walmart Logo */}
            <motion.a
              href="https://www.walmart.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-gray-900/5 to-gray-800/5 dark:from-white/5 dark:to-gray-100/5 hover:from-gray-900/10 hover:to-gray-800/10 dark:hover:from-white/10 dark:hover:to-gray-100/10 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-xl transition-all duration-300 group"
            >
              <div className="relative">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-yellow-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Powered by Walmart
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  Sparkathon Innovation
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 pt-6 border-t border-gray-200/20 dark:border-gray-700/20 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} TechDebt Analyzer. Built for developers, by developers.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};