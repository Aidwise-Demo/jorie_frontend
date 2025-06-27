import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Hospital, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Search,
  Shield,
  Target,
  Award,
  BookOpen,
  Stethoscope,
  Heart,
  Brain,
  Pill,
  Thermometer,
  Eye,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart,
  XCircle,
  AlertCircle,
  Info,
  ChevronRight,
  Building2
} from 'lucide-react';
import { useState } from 'react';

const guidelineAdherenceData = [
  {
    id: 1,
    guidelineName: "Sepsis Management Protocol",
    category: "Emergency Medicine",
    totalCases: 156,
    adherentCases: 142,
    adherenceRate: 91.0,
    criticalDeviations: 3,
    minorDeviations: 11,
    riskLevel: "Medium",
    lastUpdated: "2024-06-23",
    keyMetrics: {
      timeToAntibiotics: { target: "< 1 hour", actual: "52 min", compliant: true },
      bloodCultureTaken: { target: "100%", actual: "94%", compliant: false },
      lactateOrdered: { target: "100%", actual: "98%", compliant: true }
    },
    recentIssues: [
      "Delayed antibiotic administration in 8 cases",
      "Missing blood cultures in 14 cases",
      "Incomplete sepsis screening in 6 cases"
    ],
    department: "Emergency Department",
    responsiblePhysician: "Dr. Sarah Mitchell"
  },
  {
    id: 2,
    guidelineName: "Acute MI Management",
    category: "Cardiology",
    totalCases: 89,
    adherentCases: 85,
    adherenceRate: 95.5,
    criticalDeviations: 1,
    minorDeviations: 3,
    riskLevel: "Low",
    lastUpdated: "2024-06-24",
    keyMetrics: {
      doorToBalloon: { target: "< 90 min", actual: "78 min", compliant: true },
      aspirinGiven: { target: "100%", actual: "100%", compliant: true },
      statinPrescribed: { target: "95%", actual: "92%", compliant: false }
    },
    recentIssues: [
      "Statin not prescribed at discharge in 3 cases",
      "Delayed catheter lab activation in 1 case"
    ],
    department: "Cardiology",
    responsiblePhysician: "Dr. Michael Rodriguez"
  },
  {
    id: 3,
    guidelineName: "Pneumonia Care Bundle",
    category: "Internal Medicine",
    totalCases: 203,
    adherentCases: 167,
    adherenceRate: 82.3,
    criticalDeviations: 8,
    minorDeviations: 28,
    riskLevel: "High",
    lastUpdated: "2024-06-22",
    keyMetrics: {
      antibioticTiming: { target: "< 4 hours", actual: "3.2 hours", compliant: true },
      oxygenSaturation: { target: "> 90%", actual: "94%", compliant: true },
      vaccinationStatus: { target: "100%", actual: "76%", compliant: false }
    },
    recentIssues: [
      "Vaccination status not documented in 48 cases",
      "Inappropriate antibiotic selection in 12 cases",
      "Missing chest X-ray in 15 cases"
    ],
    department: "Internal Medicine",
    responsiblePhysician: "Dr. Jennifer Kim"
  },
  {
    id: 4,
    guidelineName: "Stroke Protocol",
    category: "Neurology",
    totalCases: 67,
    adherentCases: 61,
    adherenceRate: 91.0,
    criticalDeviations: 2,
    minorDeviations: 4,
    riskLevel: "Medium",
    lastUpdated: "2024-06-24",
    keyMetrics: {
      doorToNeedle: { target: "< 60 min", actual: "45 min", compliant: true },
      ctScanTiming: { target: "< 25 min", actual: "22 min", compliant: true },
      nihssDocumented: { target: "100%", actual: "88%", compliant: false }
    },
    recentIssues: [
      "NIHSS score not documented in 8 cases",
      "Delayed tPA administration in 2 cases"
    ],
    department: "Neurology",
    responsiblePhysician: "Dr. Robert Chen"
  }
];

const overallMetrics = [
  {
    title: "Overall Adherence Rate",
    value: "89.7%",
    change: "+2.3%",
    trend: "up",
    icon: Target,
    color: "emerald",
    target: "≥ 90%"
  },
  {
    title: "Critical Deviations",
    value: "14",
    change: "-3",
    trend: "down",
    icon: AlertTriangle,
    color: "red",
    target: "< 10"
  },
  {
    title: "Guidelines Monitored",
    value: "24",
    change: "+2",
    trend: "up",
    icon: BookOpen,
    color: "blue",
    target: "25"
  },
  {
    title: "Compliance Score",
    value: "8.7/10",
    change: "+0.3",
    trend: "up",
    icon: Award,
    color: "purple",
    target: "≥ 9.0"
  }
];

const departmentPerformance = [
  { dept: "Emergency", guidelines: 6, adherence: 88.5, criticalIssues: 8, trend: "stable" },
  { dept: "Cardiology", guidelines: 4, adherence: 94.2, criticalIssues: 2, trend: "up" },
  { dept: "Internal Medicine", guidelines: 7, adherence: 84.1, criticalIssues: 12, trend: "down" },
  { dept: "Neurology", guidelines: 3, adherence: 91.8, criticalIssues: 3, trend: "up" },
  { dept: "Surgery", guidelines: 4, adherence: 92.3, criticalIssues: 1, trend: "stable" }
];

const GuidelineAdherenceEvaluator = () => {
  const [selectedView, setSelectedView] = useState('guidelines');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedGuideline, setSelectedGuideline] = useState(null);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'Low':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getAdherenceColor = (rate) => {
    if (rate >= 95) return 'text-emerald-400';
    if (rate >= 85) return 'text-amber-400';
    return 'text-red-400';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Emergency Medicine':
        return AlertTriangle;
      case 'Cardiology':
        return Heart;
      case 'Internal Medicine':
        return Stethoscope;
      case 'Neurology':
        return Brain;
      default:
        return FileText;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Guideline Adherence Evaluator</h1>
              <p className="text-slate-400 text-lg">Monitor clinical guideline compliance and protocol adherence</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last 30 Days
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallMetrics.map((metric, index) => (
  <div
    key={index}
    className="group relative flex items-center justify-center"
  >
    <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center w-72">
      {/* Trend Arrow at Top Right */}
      {metric.trend === 'up' ? (
        <TrendingUp className={`absolute top-4 right-4 w-5 h-5 ${metric.color === 'red' ? 'text-red-400' : 'text-emerald-400'}`} />
      ) : (
        <TrendingDown className={`absolute top-4 right-4 w-5 h-5 ${metric.color === 'red' ? 'text-emerald-400' : 'text-red-400'}`} />
      )}
      <div className="flex flex-col items-center justify-center mb-4">
        <div className={`p-3 rounded-xl bg-${metric.color}-500/20 mb-2`}>
          <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-white">{metric.value}</h3>
        <p className="text-slate-300 text-sm font-medium">{metric.title}</p>
        <div className="flex flex-col items-center space-y-1">
          <p className={`text-xs ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {metric.change} this month
          </p>
          <p className="text-xs text-slate-500">Target: {metric.target}</p>
        </div>
      </div>
    </div>
  </div>
))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setSelectedView('guidelines')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedView === 'guidelines'
                ? 'bg-blue-600 text-white'
                : 'backdrop-blur-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Guidelines Overview
          </button>
          <button
            onClick={() => setSelectedView('departments')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedView === 'departments'
                ? 'bg-blue-600 text-white'
                : 'backdrop-blur-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-2" />
            Department Performance
          </button>
          <button
            onClick={() => setSelectedView('analytics')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedView === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'backdrop-blur-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
        </div>

        {selectedView === 'guidelines' && (
          <>
            {/* Filters */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search guidelines, conditions, or departments..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none">
                    <option value="all">All Categories</option>
                    <option value="emergency">Emergency Medicine</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="internal">Internal Medicine</option>
                    <option value="neurology">Neurology</option>
                  </select>
                  <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none">
                    <option value="all">All Risk Levels</option>
                    <option value="high">High Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="low">Low Risk</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Guidelines List */}
            <div className="space-y-6">
              {guidelineAdherenceData.map((guideline) => {
                const CategoryIcon = getCategoryIcon(guideline.category);
                return (
                  <div 
                    key={guideline.id} 
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedGuideline(selectedGuideline === guideline.id ? null : guideline.id)}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Guideline Info */}
                      <div className="lg:col-span-5">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-blue-500/20">
                            <CategoryIcon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-1">{guideline.guidelineName}</h3>
                            <p className="text-slate-400 text-sm mb-2">{guideline.category}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                              <div className="flex items-center gap-1">
                                <Hospital className="w-4 h-4" />
                                <span>{guideline.department}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Stethoscope className="w-4 h-4" />
                                <span>{guideline.responsiblePhysician}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Adherence Metrics */}
                      <div className="lg:col-span-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Adherence Rate</span>
                            <span className={`text-2xl font-bold ${getAdherenceColor(guideline.adherenceRate)}`}>
                              {guideline.adherenceRate}%
                            </span>
                          </div>
                          
                          <div className="bg-slate-700/50 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                guideline.adherenceRate >= 95 ? 'bg-emerald-500' :
                                guideline.adherenceRate >= 85 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${guideline.adherenceRate}%` }}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Total Cases</p>
                              <p className="text-white font-semibold">{guideline.totalCases}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Adherent</p>
                              <p className="text-emerald-400 font-semibold">{guideline.adherentCases}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Risk & Issues */}
                      <div className="lg:col-span-3">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getRiskColor(guideline.riskLevel)}`}>
                              {guideline.riskLevel} Risk
                            </span>
                            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${selectedGuideline === guideline.id ? 'rotate-90' : ''}`} />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-red-500/20 rounded-lg p-2">
                              <p className="text-red-400 font-semibold">{guideline.criticalDeviations}</p>
                              <p className="text-slate-400 text-xs">Critical</p>
                            </div>
                            <div className="bg-amber-500/20 rounded-lg p-2">
                              <p className="text-amber-400 font-semibold">{guideline.minorDeviations}</p>
                              <p className="text-slate-400 text-xs">Minor</p>
                            </div>
                          </div>
                          
                          <p className="text-slate-500 text-xs">Updated: {guideline.lastUpdated}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedGuideline === guideline.id && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          
                          {/* Key Metrics */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Key Performance Metrics</h4>
                            <div className="space-y-3">
                              {Object.entries(guideline.keyMetrics).map(([key, metric]) => (
                                <div key={key} className="bg-slate-800/50 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-300 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                    {metric.compliant ? (
                                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-red-400" />
                                    )}
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Target: {metric.target}</span>
                                    <span className={`font-semibold ${metric.compliant ? 'text-emerald-400' : 'text-red-400'}`}>
                                      Actual: {metric.actual}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recent Issues */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Recent Issues & Opportunities</h4>
                            <div className="space-y-3">
                              {guideline.recentIssues.map((issue, index) => (
                                <div key={index} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-3">
                                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-300 text-sm">{issue}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {selectedView === 'departments' && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Department Performance Overview</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Department</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Guidelines Monitored</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Adherence Rate</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Critical Issues</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentPerformance.map((dept, index) => {
                    const TrendIcon = getTrendIcon(dept.trend);
                    return (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Hospital className="w-5 h-5 text-blue-400" />
                            <span className="text-white font-medium">{dept.dept}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white">{dept.guidelines}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-700/50 rounded-full h-2 w-20">
                              <div
                                className={`h-2 rounded-full ${
                                  dept.adherence >= 90 ? 'bg-emerald-500' :
                                  dept.adherence >= 80 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${dept.adherence}%` }}
                              />
                            </div>
                            <span className={`font-medium ${getAdherenceColor(dept.adherence)}`}>
                              {dept.adherence}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            dept.criticalIssues === 0 ? 'bg-emerald-500/20 text-emerald-400' :
                            dept.criticalIssues <= 5 ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {dept.criticalIssues}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <TrendIcon className={`w-4 h-4 ${
                            dept.trend === 'up' ? 'text-emerald-400' :
                            dept.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                          }`} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedView === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Adherence Trends</h3>
              <div className="h-64 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Adherence trend visualization would be displayed here</p>
                  <p className="text-sm mt-2">Integration with charting library needed</p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Risk Distribution</h3>
              <div className="h-64 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Risk level distribution chart would be displayed here</p>
                  <p className="text-sm mt-2">Integration with charting library needed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidelineAdherenceEvaluator;