# TechDebt Analyzer

<div align="center">
  <img src="src/assets/lint_light%20thlogo.png" alt="TechDebt Analyzer Logo" width="200" height="auto">
  
  **Professional AI-Powered Code Analysis Platform**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Gemini AI](https://img.shields.io/badge/Gemini%20AI-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
</div>

## 🚀 Overview

TechDebt Analyzer is a cutting-edge web application that leverages Google's Gemini 2.0 Flash AI to provide comprehensive technical debt analysis for software projects. It helps development teams identify code smells, architectural issues, security vulnerabilities, and performance bottlenecks while providing actionable recommendations for improvement.

### ✨ Key Features

- **🧠 AI-Powered Analysis**: Advanced Gemini 2.0 Flash AI analyzes code patterns, smells, and technical debt
- **📊 Comprehensive Reports**: Detailed PDF reports with debt scores, file-by-file analysis, and prioritized recommendations
- **🔒 Secure & Private**: Enterprise-grade encryption with no permanent data storage
- **🎯 Actionable Insights**: Specific, implementable recommendations to improve code quality
- **🌐 Multi-Language Support**: JavaScript, TypeScript, Python, Java, C++, and 15+ programming languages
- **👥 Team Collaboration**: Share reports, track improvements, and maintain quality standards
- **📱 Responsive Design**: Beautiful, modern interface that works on all devices
- **🌙 Dark Mode**: Full dark/light theme support with system preference detection

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe development with enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Smooth animations and micro-interactions
- **React Router** - Client-side routing and navigation
- **Lucide React** - Beautiful, customizable icons

### Backend & Services
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Google Gemini 2.0 Flash** - Advanced AI for code analysis
- **Supabase Auth** - User authentication with GitHub OAuth and email/password
- **Supabase Storage** - File storage for project uploads
- **Row Level Security (RLS)** - Database-level security policies

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS processing and optimization
- **jsPDF** - Client-side PDF generation

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Client  │    │   Supabase API   │    │   Gemini AI     │
│                 │    │                  │    │                 │
│ • Authentication│◄──►│ • PostgreSQL DB  │    │ • Code Analysis │
│ • File Upload   │    │ • File Storage   │    │ • AI Processing │
│ • Report View   │    │ • Real-time API  │◄──►│ • Recommendations│
│ • PDF Export    │    │ • RLS Security   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase Account** (free tier available)
- **Google AI Studio Account** (for Gemini API keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/techdebt-analyzer.git
   cd techdebt-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Gemini AI API Keys (Multiple keys for rate limiting)
   VITE_GEMINI_API_KEY_1=your_gemini_api_key_1
   VITE_GEMINI_API_KEY_2=your_gemini_api_key_2
   VITE_GEMINI_API_KEY_3=your_gemini_api_key_3
   VITE_GEMINI_API_KEY_4=your_gemini_api_key_4
   VITE_GEMINI_API_KEY_5=your_gemini_api_key_5
   ```

4. **Database Setup**
   
   Run the Supabase migration to set up the database schema:
   ```bash
   # The migration file is located at: supabase/migrations/20250629085224_stark_sun.sql
   # Apply it through your Supabase dashboard or CLI
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📖 Usage Guide

### 1. Authentication
- Sign up with email/password or GitHub OAuth
- Secure session management with automatic token refresh
- Protected routes for authenticated users only

### 2. Project Upload
- **Folder Upload**: Select entire project directories
- **File Upload**: Drag & drop individual code files
- **Supported Languages**: JS, TS, Python, Java, C++, C#, PHP, Ruby, Go, Rust, and more
- **File Limits**: Up to 100 files, 5MB per file

### 3. AI Analysis Process
- Automated code parsing and tokenization
- Multi-dimensional analysis including:
  - Code complexity and maintainability
  - Security vulnerabilities
  - Performance bottlenecks
  - Architecture and design patterns
  - Code smells and anti-patterns
  - Documentation quality

### 4. Report Generation
- **Overall Debt Score**: 0-100 scale (lower is better)
- **File-by-File Analysis**: Individual scores and issues
- **Prioritized Recommendations**: High/Medium/Low priority actions
- **PDF Export**: Professional reports for sharing and archiving

### 5. Dashboard Features
- Project management and history
- Real-time analysis status tracking
- Report viewing and downloading
- Team collaboration tools

## 🔧 Configuration

### Supabase Setup

1. **Create a new Supabase project**
2. **Configure authentication providers** (GitHub OAuth recommended)
3. **Set up storage buckets** for file uploads
4. **Apply database migrations** for the required schema
5. **Configure Row Level Security** policies

### Gemini AI Setup

1. **Get API keys** from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Configure multiple keys** for better rate limiting
3. **Set up proper quotas** and usage monitoring

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `VITE_GEMINI_API_KEY_1-5` | Gemini AI API keys | ✅ |

## 🏢 Project Structure

```
techdebt-analyzer/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, logos, icons
│   ├── components/        # Reusable React components
│   │   ├── Auth/          # Authentication components
│   │   ├── Dashboard/     # Dashboard-specific components
│   │   ├── Layout/        # Layout components (Navbar, etc.)
│   │   └── UI/            # Generic UI components
│   ├── contexts/          # React contexts (Auth, Theme)
│   ├── lib/               # Utility libraries
│   │   ├── gemini.ts      # AI analysis logic
│   │   ├── pdf-generator.ts # PDF report generation
│   │   └── supabase.ts    # Database client and types
│   ├── pages/             # Page components
│   └── styles/            # Global styles and Tailwind config
├── supabase/
│   └── migrations/        # Database schema migrations
└── docs/                  # Additional documentation
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **JWT Authentication**: Secure token-based authentication
- **File Upload Validation**: Type and size restrictions
- **API Rate Limiting**: Multiple API keys with intelligent rotation
- **Data Privacy**: No permanent storage of uploaded code
- **HTTPS Encryption**: All data transmission encrypted

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy** and configure custom domain

### Vercel

1. **Import project** from GitHub
2. **Configure environment variables**
3. **Deploy** with automatic CI/CD

### Self-Hosted

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Serve the `dist` folder** with any static file server
3. **Configure reverse proxy** (nginx, Apache) if needed

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)
- **Component Structure**: Functional components with hooks
- **File Organization**: Feature-based folder structure

## 📊 Performance & Scalability

- **Optimized Bundle**: Code splitting and lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Caching Strategy**: Browser and CDN caching
- **Database Optimization**: Indexed queries and efficient schemas
- **Rate Limiting**: Intelligent API key rotation
- **Error Handling**: Graceful degradation and fallbacks

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check Supabase configuration
   - Verify environment variables
   - Clear browser cache and cookies

2. **File Upload Issues**
   - Ensure file types are supported
   - Check file size limits (5MB per file)
   - Verify storage bucket permissions

3. **Analysis Failures**
   - Check Gemini API key validity
   - Monitor API quotas and limits
   - Review error logs in browser console

### Getting Help

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check our comprehensive docs
- **Community**: Join our Discord server (link in issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful code analysis capabilities
- **Supabase** for excellent backend-as-a-service platform
- **React Community** for amazing tools and libraries
- **Open Source Contributors** who make projects like this possible

## 📈 Roadmap

- [ ] **Multi-repository Analysis**: Analyze entire GitHub organizations
- [ ] **CI/CD Integration**: GitHub Actions and GitLab CI support
- [ ] **Advanced Metrics**: Code coverage, complexity trends
- [ ] **Team Analytics**: Developer productivity insights
- [ ] **Custom Rules**: User-defined analysis criteria
- [ ] **API Access**: RESTful API for programmatic access
- [ ] **Slack/Teams Integration**: Report notifications
- [ ] **Historical Tracking**: Code quality trends over time

---

<div align="center">
  <p>Built with ❤️ for Sparkathon by Walmart</p>
  <p>
    <a href="https://github.com/yourusername/techdebt-analyzer">GitHub</a> •
    <a href="https://techdebt-analyzer.netlify.app">Live Demo</a> •
    <a href="mailto:support@techdebt-analyzer.com">Support</a>
  </p>
</div>