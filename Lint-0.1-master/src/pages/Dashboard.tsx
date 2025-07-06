import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Code2, TrendingUp, FileText, BarChart3, Zap, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Project, AnalysisReport } from '../lib/supabase';
import { analyzeCodebase } from '../lib/gemini';
import { generateAnalysisReport } from '../lib/pdf-generator';
import { Navbar } from '../components/Layout/Navbar';
import { ProjectCard } from '../components/Dashboard/ProjectCard';
import { UploadModal } from '../components/Dashboard/UploadModal';
import { ReportModal } from '../components/Dashboard/ReportModal';
import { BackgroundEffects } from '../components/UI/BackgroundEffects';
import { GlassCard } from '../components/UI/GlassCard';
import { AnimatedButton } from '../components/UI/AnimatedButton';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [reports, setReports] = useState<Record<string, AnalysisReport>>({});
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<AnalysisReport | null>(null);
  const [selectedProjectName, setSelectedProjectName] = useState('');

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const { data: reportsData, error: reportsError } = await supabase
        .from('analysis_reports')
        .select('*');

      if (reportsError) throw reportsError;

      setProjects(projectsData || []);
      
      const reportsMap: Record<string, AnalysisReport> = {};
      reportsData?.forEach(report => {
        reportsMap[report.project_id] = report;
      });
      setReports(reportsMap);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files: File[], projectName: string) => {
    if (!user) return;

    try {
      // Create project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          project_name: projectName,
          analysis_status: 'analyzing'
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Upload files to storage and create file records
      const fileRecords = [];
      for (const file of files) {
        const filePath = `${user.id}/${project.id}/${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('project-uploads')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: fileRecord, error: fileError } = await supabase
          .from('project_files')
          .insert({
            project_id: project.id,
            file_path: file.name,
            file_url: filePath,
            file_size: file.size
          })
          .select()
          .single();

        if (fileError) throw fileError;
        fileRecords.push({ ...fileRecord, content: await file.text() });
      }

      // Analyze codebase
      try {
        const analysis = await analyzeCodebase(
          fileRecords.map(f => ({ path: f.file_path, content: f.content }))
        );

        // Save analysis report
        const { error: reportError } = await supabase
          .from('analysis_reports')
          .insert({
            project_id: project.id,
            debt_score: analysis.overall_debt_score,
            summary: analysis.summary,
            recommendations: analysis.recommendations,
            file_analysis: analysis.file_analyses.reduce((acc, file) => {
              acc[file.file_path] = file;
              return acc;
            }, {} as Record<string, any>)
          });

        if (reportError) throw reportError;

        // Update project status
        await supabase
          .from('projects')
          .update({ analysis_status: 'completed' })
          .eq('id', project.id);

      } catch (analysisError) {
        console.error('Analysis error:', analysisError);
        await supabase
          .from('projects')
          .update({ analysis_status: 'failed' })
          .eq('id', project.id);
      }

      await loadProjects();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleViewReport = (project: Project) => {
    const report = reports[project.id];
    if (report) {
      setSelectedReport(report);
      setSelectedProjectName(project.project_name);
      setReportModalOpen(true);
    }
  };

  const handleDownloadReport = (project: Project) => {
    const report = reports[project.id];
    if (report && user) {
      const pdf = generateAnalysisReport(project.project_name, {
        overall_debt_score: report.debt_score,
        summary: report.summary || '',
        file_analyses: Object.values(report.file_analysis || {}),
        recommendations: report.recommendations || []
      }, user.email || '');
      
      pdf.save(`${project.project_name}-analysis-report.pdf`);
    }
  };

  const handleDeleteProject = async (project: Project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await supabase.from('projects').delete().eq('id', project.id);
        await loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const stats = {
    totalProjects: projects.length,
    completedAnalyses: projects.filter(p => p.analysis_status === 'completed').length,
    averageDebtScore: Math.round(
      Object.values(reports).reduce((sum, report) => sum + report.debt_score, 0) / 
      Math.max(Object.values(reports).length, 1)
    ),
    analyzingProjects: projects.filter(p => p.analysis_status === 'analyzing').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-500 relative">
        <BackgroundEffects />
        <Navbar />
        <div className="flex items-center justify-center h-96 relative z-10">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-500 relative">
      <BackgroundEffects />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-20 sm:pt-24 relative z-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-4">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Analyze your codebase for technical debt and get actionable insights to improve code quality.
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {[
            {
              icon: Code2,
              label: 'Total Projects',
              value: stats.totalProjects,
              color: 'from-blue-500 to-cyan-500',
              delay: 0.1
            },
            {
              icon: FileText,
              label: 'Completed Analyses',
              value: stats.completedAnalyses,
              color: 'from-green-500 to-emerald-500',
              delay: 0.2
            },
            {
              icon: TrendingUp,
              label: 'Avg. Debt Score',
              value: `${stats.averageDebtScore}/100`,
              color: 'from-orange-500 to-red-500',
              delay: 0.3
            },
            {
              icon: Zap,
              label: 'Analyzing',
              value: stats.analyzingProjects,
              color: 'from-purple-500 to-pink-500',
              delay: 0.4
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay, duration: 0.5 }}
            >
              <GlassCard className="p-3 sm:p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-2 lg:gap-3">
                  <div className="text-center lg:text-left flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`bg-gradient-to-r ${stat.color} p-2 sm:p-2.5 lg:p-3 rounded-xl flex-shrink-0`}>
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and analyze your code projects
            </p>
          </div>
          <AnimatedButton
            onClick={() => setUploadModalOpen(true)}
            icon={Plus}
            size="lg"
            className="w-full sm:w-auto"
          >
            New Analysis
          </AnimatedButton>
        </div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto px-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-block mb-6">
                  <Code2 className="h-10 sm:h-12 w-10 sm:w-12 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No projects yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                  Upload your first project to start analyzing technical debt and get actionable insights to improve your code quality.
                </p>
                <AnimatedButton
                  onClick={() => setUploadModalOpen(true)}
                  icon={Plus}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Upload Your First Project
                </AnimatedButton>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProjectCard
                  project={project}
                  report={reports[project.id]}
                  onViewReport={handleViewReport}
                  onDownloadReport={handleDownloadReport}
                  onDeleteProject={handleDeleteProject}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
      />

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        report={selectedReport}
        projectName={selectedProjectName}
        onDownload={() => selectedReport && handleDownloadReport(
          projects.find(p => p.id === selectedReport.project_id)!
        )}
      />
    </div>
  );
};