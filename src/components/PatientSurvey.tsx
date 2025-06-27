import { Plus, MessageSquare, Users, TrendingUp, Star, Eye, Edit, Trash2, BarChart3, Play, Pause, Filter, Search, Calendar, Award, Heart, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const surveys = [
  {
    id: 1,
    name: "Post-Visit Satisfaction Survey",
    status: "Active",
    type: "General Care",
    department: "Primary Care",
    patients: 342,
    responses: 156,
    lastSent: "2 hours ago",
    responseRate: 52,
    avgRating: 4.3,
    completion: 78,
    trending: "up",
    priority: "high",
    sentiment: "positive"
  },
  {
    id: 2,
    name: "Emergency Department Experience",
    status: "Active",
    type: "Emergency Care",
    department: "Emergency",
    patients: 189,
    responses: 89,
    lastSent: "6 hours ago",
    responseRate: 61,
    avgRating: 3.9,
    completion: 65,
    trending: "down",
    priority: "critical",
    sentiment: "neutral"
  },
  {
    id: 3,
    name: "Telemedicine Follow-up Survey",
    status: "Completed",
    type: "Telehealth",
    department: "Digital Health",
    patients: 456,
    responses: 234,
    lastSent: "1 week ago",
    responseRate: 51,
    avgRating: 4.5,
    completion: 92,
    trending: "up",
    priority: "medium",
    sentiment: "positive"
  },
  {
    id: 4,
    name: "Specialist Referral Feedback",
    status: "Draft",
    type: "Specialty Care",
    department: "Cardiology",
    patients: 0,
    responses: 0,
    lastSent: "Never",
    responseRate: 0,
    avgRating: 0,
    completion: 0,
    trending: "neutral",
    priority: "low",
    sentiment: "neutral"
  },
  {
    id: 5,
    name: "Chronic Care Management Survey",
    status: "Paused",
    type: "Chronic Care",
    department: "Internal Medicine",
    patients: 234,
    responses: 98,
    lastSent: "2 weeks ago",
    responseRate: 55,
    avgRating: 4.1,
    completion: 42,
    trending: "up",
    priority: "medium",
    sentiment: "positive"
  }
];

const PatientSurvey = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Completed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Paused':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Draft':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <Heart className="w-3 h-3 text-green-400" />;
      case 'neutral':
        return <AlertCircle className="w-3 h-3 text-yellow-400" />;
      case 'negative':
        return <AlertCircle className="w-3 h-3 text-red-400" />;
      default:
        return <AlertCircle className="w-3 h-3 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Glassmorphism Header */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white mb-1">
                Patient Experience
              </h1>
              <p className="text-slate-400 text-lg">Transform feedback into exceptional care</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last 30 Days
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/25">
                <Plus className="w-5 h-5" />
                Create Survey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Active Surveys",
              value: "12",
              change: "+3 this week",
              icon: MessageSquare,
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-500/10 to-cyan-500/10"
            },
            {
              title: "Response Rate",
              value: "84%",
              change: "+12% vs last month",
              icon: Users,
              gradient: "from-emerald-500 to-teal-500",
              bgGradient: "from-emerald-500/10 to-teal-500/10"
            },
            {
              title: "Satisfaction Score",
              value: "4.2",
              change: "+0.3 improvement",
              icon: Star,
              gradient: "from-amber-500 to-orange-500",
              bgGradient: "from-amber-500/10 to-orange-500/10"
            },
            {
              title: "Patient Happiness",
              value: "92%",
              change: "+8% this quarter",
              icon: Award,
              gradient: "from-purple-500 to-pink-500",
              bgGradient: "from-purple-500/10 to-pink-500/10"
            }
].map((stat, index) => (
  <div key={index} className="group relative flex items-center justify-center">
    <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center text-center w-72">
      {/* Trend Arrow at Top Right */}
      <TrendingUp className="absolute top-4 right-4 w-5 h-5 text-emerald-400" />
      <div className="flex flex-col items-center justify-center mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg mb-2`}>
          <stat.icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
        <p className="text-slate-300 text-sm font-medium">{stat.title}</p>
        <p className="text-emerald-400 text-xs">{stat.change}</p>
      </div>
    </div>
  </div>
))}
</div>

        {/* Search and Filter Bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search surveys..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-all duration-300">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <select 
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="primary">Primary Care</option>
                <option value="emergency">Emergency</option>
                <option value="specialty">Specialty Care</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Survey Cards */}
        <div className="space-y-4">
          {surveys.map((survey) => (
            <div key={survey.id} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Survey Info */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-12 rounded-full ${getPriorityColor(survey.priority)}`}></div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">{survey.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <span className="px-2 py-1 bg-slate-700/50 rounded-lg">{survey.department}</span>
                          <span>•</span>
                          <span>{survey.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(survey.status)}`}>
                        {survey.status}
                      </span>
                      {getSentimentIcon(survey.sentiment)}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{survey.patients}</div>
                      <div className="text-xs text-slate-400">Patients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">{survey.responses}</div>
                      <div className="text-xs text-slate-400">Responses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{survey.responseRate}%</div>
                      <div className="text-xs text-slate-400">Response Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-xl font-bold text-white">
                          {survey.avgRating > 0 ? survey.avgRating : 'N/A'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">Rating</div>
                    </div>
                  </div>

                  {/* Progress & Actions */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white font-medium">{survey.completion}%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${survey.completion}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{survey.lastSent}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 text-slate-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 text-slate-400 hover:text-white">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 text-slate-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                      {survey.status === 'Active' ? (
                        <button className="p-2 hover:bg-amber-500/20 rounded-lg transition-colors duration-200 text-amber-400 hover:text-amber-300">
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : survey.status === 'Paused' ? (
                        <button className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors duration-200 text-emerald-400 hover:text-emerald-300">
                          <Play className="w-4 h-4" />
                        </button>
                      ) : null}
                      <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-200 text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientSurvey;