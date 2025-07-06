import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { AnalysisReport } from '../../lib/supabase';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AnalysisReport | null;
  projectName: string;
  onDownload: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  report,
  projectName,
  onDownload
}) => {
  if (!isOpen || !report) return null;

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    if (score >= 40) return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
    return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative z-50"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6 border-b border-gray-200/20 dark:border-gray-700/20">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Analysis Report</h2>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDownload}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex-1 sm:flex-none justify-center"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </motion.button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{projectName}</h3>
              <p className="text-gray-600 dark:text-gray-400">Generated on {new Date(report.created_at).toLocaleDateString()}</p>
            </div>

            {/* Overall Score */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Overall Tech Debt Score
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Lower scores indicate better code quality
                  </p>
                </div>
                <div className={`text-3xl sm:text-4xl font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl ${getScoreColor(report.debt_score)}`}>
                  {report.debt_score}/100
                </div>
              </div>
            </div>

            {/* Summary */}
            {report.summary && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Executive Summary</h3>
                <div className="p-4 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{report.summary}</p>
                </div>
              </div>
            )}

            {/* File Analysis */}
            {report.file_analysis && Object.keys(report.file_analysis).length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">File Analysis</h3>
                <div className="space-y-4">
                  {Object.entries(report.file_analysis).slice(0, 10).map(([filePath, analysis]: [string, any]) => (
                    <div key={filePath} className="border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white break-all">{filePath}</h4>
                        <span className={`text-sm font-medium px-2 py-1 rounded whitespace-nowrap ${getScoreColor(analysis.debt_score || 0)}`}>
                          {analysis.debt_score || 0}/100
                        </span>
                      </div>
                      {analysis.issues && analysis.issues.length > 0 && (
                        <div className="space-y-2">
                          {analysis.issues.slice(0, 3).map((issue: any, index: number) => (
                            <div key={index} className="flex items-start space-x-3 p-2 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded">
                              {getSeverityIcon(issue.severity)}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{issue.type}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 break-words">{issue.description}</p>
                                {issue.suggestion && (
                                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 break-words">💡 {issue.suggestion}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {report.recommendations && report.recommendations.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
                <div className="space-y-4">
                  {report.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        {getSeverityIcon(rec.priority)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {rec.category} ({rec.priority} priority)
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 mb-2 break-words">{rec.description}</p>
                          {rec.impact && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                              <strong>Impact:</strong> {rec.impact}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};