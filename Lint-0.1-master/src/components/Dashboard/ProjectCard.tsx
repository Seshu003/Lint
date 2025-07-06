import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Eye, FileText, Trash2 } from 'lucide-react';
import { Project, AnalysisReport } from '../../lib/supabase';

interface ProjectCardProps {
  project: Project;
  report?: AnalysisReport;
  onViewReport: (project: Project) => void;
  onDownloadReport: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  report,
  onViewReport,
  onDownloadReport,
  onDeleteProject
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'analyzing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400';
    }
  };

  const getDebtScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600 dark:text-red-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 z-10"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
            {project.project_name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{new Date(project.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(project.analysis_status)}`}>
          {project.analysis_status}
        </span>
      </div>

      {report && (
        <div className="mb-4 p-3 sm:p-4 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tech Debt Score</span>
            <span className={`text-xl sm:text-2xl font-bold ${getDebtScoreColor(report.debt_score)}`}>
              {report.debt_score}/100
            </span>
          </div>
          {report.summary && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {report.summary}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        {project.analysis_status === 'completed' && report && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewReport(project)}
              className="flex-1 flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">View Report</span>
              <span className="sm:hidden">View</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDownloadReport(project)}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </motion.button>
          </>
        )}
        
        {project.analysis_status === 'analyzing' && (
          <div className="flex-1 flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <span>Analyzing...</span>
          </div>
        )}

        {project.analysis_status === 'failed' && (
          <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            <span>Analysis Failed</span>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDeleteProject(project)}
          className="flex items-center justify-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};